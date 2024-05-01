package com.SanJuanPunchMan.SystemInteg.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import org.apache.el.stream.Optional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.beans.OTPCreateResponse;
import com.SanJuanPunchMan.SystemInteg.entity.OTPEntity;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class OTPService {

    @Autowired
    OTPCreateResponse otpCreateResponse;
    
    @Autowired
    private JavaMailSender javaMailSender;

    public OTPCreateResponse createOTP(OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Check if document with the same email exists
        DocumentReference existingDoc = firestore.collection("OTPEntity").document(otp.getEmail());
        ApiFuture<DocumentSnapshot> existingDocFuture = existingDoc.get();
        DocumentSnapshot existingDocSnapshot = existingDocFuture.get();

        if (existingDocSnapshot.exists()) {
            System.out.println("Document with email " + otp.getEmail() + " already exists");

            // Document with the same email already exists
            // Update the existing document instead of creating a new one
            String otpgenString = OTPGenerator.generateOTP();
            otp.setOtp(otpgenString);
            otp.setExpirationDate(getDate5MinutesAfterCreation());
            otp.setId(otpgenString);
            otp.setIsUsed(false);
            existingDoc.set(otp); // Update the existing document with the new OTP entity

            // Send email to the entered email
            sendEmail(otp.getEmail(), otp.getOtp());

            // Populate OTPCreateResponse
            OTPCreateResponse otpCreateResponse = new OTPCreateResponse();
            otpCreateResponse.setId(otp.getOtp());
            otpCreateResponse.setUpdatedTime(new Date()); // Use the current time as the updated time

            return otpCreateResponse;
        } else {
            System.out.println("Document with email " + otp.getEmail() + " does not exist");

            // Generate OTP
            String otpgenString = OTPGenerator.generateOTP();

            // Set the generated OTP string
            otp.setId(otpgenString);
            otp.setOtp(otpgenString);
            otp.setIsUsed(false);

            // Set the expiration date before inserting the document
            otp.setExpirationDate(getDate5MinutesAfterCreation());

            // Create a new document with the OTP as the document ID
            DocumentReference newDocRef = firestore.collection("OTPEntity").document(otp.getEmail());
            ApiFuture<WriteResult> apiFuture = newDocRef.set(otp);

            // Send email to the entered email
            sendEmail(otp.getEmail(), otp.getOtp());

            // Populate OTPCreateResponse
            OTPCreateResponse otpCreateResponse = new OTPCreateResponse();
            otpCreateResponse.setId(otp.getOtp());
            otpCreateResponse.setUpdatedTime(apiFuture.get().getUpdateTime().toDate());

            return otpCreateResponse;
        }
    }


  //Verify OTP
    public String verifyOTP(OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
        Firestore firestore = FirestoreClient.getFirestore();
        
     // Validate email format
        if (!isValidEmail(otp.getEmail())) {
            throw new IllegalArgumentException("Invalid email format: " + otp.getEmail());
        }
        
        // Get the document with the given OTP
        DocumentReference docRef = firestore.collection("OTPEntity").document(otp.getEmail());
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        
        if (document.exists()) {
            // Document with the given OTP exists
            OTPEntity storedOTP = document.toObject(OTPEntity.class);

            if (storedOTP != null && storedOTP.getOtp().equals(otp.getOtp())) {
                // OTPs match
                if (storedOTP.getExpirationDate().after(new Date())) {
                	if(storedOTP.getIsUsed()==false) {
                		String username = otp.getEmail();
                        String password = generatePassword();

                        // Mark the OTP as used
                        storedOTP.setIsUsed(true);
                        ApiFuture<WriteResult> updateOTPFuture = docRef.set(storedOTP);

                        // Create a new user in Firebase
                        Firestore dbFirestore = FirestoreClient.getFirestore();
                        DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
                        UserEntity newUser = new UserEntity();
                        newUser.setUsername(username);
                        newUser.setPassword(hash(password));
                        ApiFuture<WriteResult> newUserFuture = userRef.set(newUser);

                        // Send email
                        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
                        mimeMessageHelper.setTo(otp.getEmail());
                        mimeMessageHelper.setSubject("Confirmation Email of Verification");
                        // Edit the text as needed
                        mimeMessageHelper.setText("Email is Verified and here are your login credentials: \n"
                                + "Username: " + username + "\n"
                                + "Password: " + password + "");

                        javaMailSender.send(mimeMessage);

                        return "Matched";
                	}
                	else {
                		return "OTP Already Used";
                	}
                } else {
                    return "OTP Expired";
                }
            }
            return "OTP Mismatch";
        }
        return "OTP Does not Exist";
    }

	// OTP generator
    public static class OTPGenerator {

        private static final String CHARACTERS = "0123456789";
        private static final SecureRandom RANDOM = new SecureRandom();

        public static String generateOTP() {
            StringBuilder otp = new StringBuilder();
            for (int i = 0; i < 8; i++) {
                otp.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
            }
            return otp.toString();
        }
    }

    //    get time 5 mins from now
    public Date getDate5MinutesAfterCreation() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 5);
        return calendar.getTime();
    }
    
    private void sendEmail(String email, String otp) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Email Verification OTP");
        mimeMessageHelper.setText("Your Verification Code is " + otp);
        javaMailSender.send(mimeMessage);
    }
	
	// Character Password Generator
		private static String generatePassword() {
		    String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    SecureRandom random = new SecureRandom();
		    StringBuilder sb = new StringBuilder(8);
		    for (int i = 0; i < 8; i++) {
		        int randomIndex = random.nextInt(CHARACTERS.length());
		        char randomChar = CHARACTERS.charAt(randomIndex);
		        sb.append(randomChar);
		    }
		    return sb.toString();
		}
		
		private String hash(String plainText){
			return BCrypt.hashpw(plainText, BCrypt.gensalt());
		}
		
		//check if email is valid
		private boolean isValidEmail(String email) {
		    // Regular expression for basic email validation
		    String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		    return email.matches(emailRegex);
		}
		
}


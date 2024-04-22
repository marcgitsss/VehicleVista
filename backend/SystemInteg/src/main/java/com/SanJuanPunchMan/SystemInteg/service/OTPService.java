package com.SanJuanPunchMan.SystemInteg.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ExecutionException;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.beans.OTPCreateResponse;
import com.SanJuanPunchMan.SystemInteg.entity.OTPEntity;
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
        } else {
            System.out.println("Document with email " + otp.getEmail() + " does not exist");
        }
        
        if (existingDocSnapshot.exists()) {
            // Document with the same email already exists
            // Update the existing document instead of creating a new one
            String otpgenString = OTPGenerator.generateOTP();
            otp.setOtp(otpgenString);
            otp.setExpirationDate(getDate5MinutesAfterCreation());
            otp.setId(otp.getEmail());
            existingDoc.set(otp); // Update the existing document with the new OTP entity
            
            
            //SENDS EMAIL To Entered Email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
    		mimeMessageHelper.setTo(otp.getEmail());
    		mimeMessageHelper.setSubject("Email Verification OTP");
    		
    		//@TODO We can Edit the Text Later On 
    		mimeMessageHelper.setText("Your Verification Code is "+ otp.getOtp()+"");
    		javaMailSender.send(mimeMessage);
            
            // Populate OTPCreateResponse
            otpCreateResponse.setId(otp.getId());
            otpCreateResponse.setUpdatedTime(new Date()); // Use the current time as the updated time

            return otpCreateResponse;
        } else {
            // Generate OTP
            String otpgenString = OTPGenerator.generateOTP();

            // Set the generated OTP string
            otp.setId(otp.getEmail());
            otp.setOtp(otpgenString);

            // Set the expiration date before inserting the document
            otp.setExpirationDate(getDate5MinutesAfterCreation());

            // Insert the OTP into the table
            ApiFuture<WriteResult> apiFuture = existingDoc.set(otp);

            // Populate OTPCreateResponse
            otpCreateResponse.setId(otp.getId());
            otpCreateResponse.setUpdatedTime(apiFuture.get().getUpdateTime().toDate());

            return otpCreateResponse;
        }

    }
    
    
  //Verify OTP
    public String verifyOTP(OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
        Firestore firestore = FirestoreClient.getFirestore();

        // Get the document with the given email
        DocumentReference docRef = firestore.collection("OTPEntity").document(otp.getEmail());
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            // Document with the given email exists
            OTPEntity storedOTP = document.toObject(OTPEntity.class);

            if (storedOTP != null && storedOTP.getOtp().equals(otp.getOtp())) {
                // OTPs match
            	if(storedOTP.getExpirationDate().after(new Date())) {
            		String username = modifyEmail(otp.getEmail());
                    String password = generatePassword();
                    otp.setUsername(username);
                    otp.setPassword(password);
                    otp.setExpirationDate(storedOTP.getExpirationDate());
                    otp.setId(storedOTP.getEmail());
                    // Update the document with the new username and password
                    ApiFuture<WriteResult> updateFuture = docRef.set(otp);
                    
                    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    				MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
    				mimeMessageHelper.setTo(otp.getEmail());
    				mimeMessageHelper.setSubject("Confirmation Email of Verification");
    				//We can Edit the Text Later On
    				mimeMessageHelper.setText("Email is Verified and here are your login credentials: \n"
    						+ "Username: "+otp.getUsername()+"\n"
    						+ "Password: "+password+"");
    				
    				javaMailSender.send(mimeMessage);

                    return "Matched";
            	}
            	else {
            		return "OTP Expired";
            	}
                
            }
        }
        return "Mismatch";
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
    
    //	method used to remove the address in the email for username purposes
	private String modifyEmail(String email) {
	    int atIndex = email.indexOf('@');
	    if (atIndex != -1) {
	        return email.substring(0, atIndex);
	    }
	    return email; // Return the original email if no @ symbol is found
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
}


package com.SanJuanPunchMan.SystemInteg.service;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.core.ApiFuture;
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.StatusCode;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.FileList;
import com.google.auth.oauth2.GoogleCredentials;
import com.SanJuanPunchMan.SystemInteg.entity.ExpirationEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import com.SanJuanPunchMan.SystemInteg.entity.VehicleRegistered;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import com.SanJuanPunchMan.SystemInteg.entity.ExpirationEntity;
import com.SanJuanPunchMan.SystemInteg.entity.ApplicantEntity;
import com.SanJuanPunchMan.SystemInteg.entity.PhotoResponse;
import com.SanJuanPunchMan.SystemInteg.entity.Response;

//new imports
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;

@Service
public class ApplicantService {
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private RegisteredVehicleService regViService;
	
    private final Firestore db;
    
    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
//    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();
    private static final String SERVICE_ACCOUNT_KEY_PATH = "C:\\Users\\jessr\\OneDrive\\Documents\\GitHub\\VehicleVista\\backend\\SystemInteg\\cred.json";

    private static String getPathToGoogleCredentials() {
        String currentDirectory = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDirectory, "cred.json");
        return filePath.toString();
    }
    
    public String uploadImageToDrive(File file, String name) {
        String setUrl;
        try {
            String folderId = "1EJTAWTorsFqdnUKTcsTQYWbQCPit3GbC";
            Drive drive = createDriveService();

            // Check if a file with the same name already exists
            String query = "name='" + name + "' and '" + folderId + "' in parents and trashed=false";
            FileList fileList = drive.files().list().setQ(query).execute();
            if (fileList.getFiles().size() > 0) {
                // Delete the existing file
                com.google.api.services.drive.model.File existingFile = fileList.getFiles().get(0);
                drive.files().delete(existingFile.getId()).execute();

                // Upload a new file
                com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
                fileMetaData.setName(name);
                fileMetaData.setParents(Collections.singletonList(folderId));
                FileContent mediaContent = new FileContent("image/jpeg", file);
                com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent).setFields("id").execute();
                String imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
                System.out.println("IMAGE ID: " + uploadFile.getId());
                setUrl = imgUrl;
            } else {
                // Upload a new file
                com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
                fileMetaData.setName(name);
                fileMetaData.setParents(Collections.singletonList(folderId));
                FileContent mediaContent = new FileContent("image/jpeg", file);
                com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent).setFields("id").execute();
                String imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
                System.out.println("IMAGE ID: " + uploadFile.getId());
                setUrl = imgUrl;
            }

            file.delete(); // Delete the file only after successful upload or update

        } catch (Exception e) {
            // Log the exception instead of printing it directly
            System.err.println("Error uploading image to Google Drive: " + e.getMessage());
            setUrl = "Error";
        }
        return setUrl;
    }

    
    //for uploading proof of payment
    public String uploadPaymentImageToDrive(File file, String email) {
    	String res = "";
    	String name = email+":"+"proof_of_payment";
    	
    	//ADD USER HERE
	    
    	try {
	        String folderId = "1EJTAWTorsFqdnUKTcsTQYWbQCPit3GbC";
	        Drive drive = createDriveService();
	
	        // Check if a file with the same name already exists
	        String query = "name='" + name + "' and '" + folderId + "' in parents and trashed=false";
	        FileList fileList = drive.files().list().setQ(query).execute();
	        if (fileList.getFiles().size() > 0) {
	            // Update the existing file
	            com.google.api.services.drive.model.File existingFile = fileList.getFiles().get(0);
	            com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
	            fileMetadata.setName(name);
	            FileContent mediaContent = new FileContent("image/jpeg", file);
	            drive.files().update(existingFile.getId(), fileMetadata, mediaContent).execute();
	            String imgUrl = "https://drive.google.com/uc?export=view&id=" + existingFile.getId();
	            System.out.println("IMAGE ID: " + existingFile.getId());
	            res = imgUrl;
	            
	            //SAVE URL TO user.setProofOfPayment
	            //then update User
	            DocumentReference applicantRef = db.collection("applicants").document(email);
	            applicantRef.update("proofofpayment", res).get();
	        } else {
	            // Upload a new file
	            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
	            fileMetaData.setName(name);
	            fileMetaData.setParents(Collections.singletonList(folderId));
	            FileContent mediaContent = new FileContent("image/jpeg", file);
	            com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent).setFields("id").execute();
	            String imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
	            System.out.println("IMAGE ID: " + uploadFile.getId());
	            res = imgUrl; 
	            
	          //SAVE URL TO user.setProofOfPayment
	           //then update User
	            DocumentReference applicantRef = db.collection("applicants").document(email);
	            applicantRef.update("proofofpayment", res).get();
	        }
	
	        if (!file.delete()) {
	            System.err.println("Failed to delete the file after upload");
	        }
	
	    } catch (Exception e) {
	        // Log the exception instead of printing it directly
	        System.err.println("Error uploading image to Google Drive: " + e.getMessage());
	        res = e.getMessage();
	    }
	    return res;
	}
    
    public ApplicantService() {
        // Initialize Firestore instance
        db = FirestoreClient.getFirestore();
    }
    
    
    
    @PostConstruct
    public void createApplicantsCollectionIfNotExists() {
        CollectionReference applicantsCollection = db.collection("applicants");
        try {
            // Check if collection exists
            applicantsCollection.get().get();
        } catch (ApiException exception) {
            // If collection doesn't exist, create it
            if (exception.getStatusCode().getCode() == StatusCode.Code.NOT_FOUND) {
                db.collection("applicants");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    //for personal data
    public String registerApplicant(ApplicantEntity applicant) {
        try {
            // Generate unique applicantId
            String applicantId = applicant.getEmail();
            // Get current date and time
            java.util.Date currentDate = new Date();
            // Set applicantId and dateSubmitted
            SimpleDateFormat sdf = new SimpleDateFormat("EEEE");
            
            DocumentReference userRef = db.collection("tbluser").document(applicant.getEmail());
            DocumentReference expRef = db.collection("tblexpiration").document("document");
            DocumentReference veRef = db.collection("tblexpiration").document(applicant.getEmail());
            String semyear ="";
    		
    		ApiFuture<DocumentSnapshot> expSnapshot = expRef.get();
    		ExpirationEntity expiration = expSnapshot.get().toObject(ExpirationEntity.class);
    		if(expiration == null) {
    			throw new Exception("NO expiration entity");
    		}
      		
    		if(expRef!=null) {
    			semyear = expiration.getCurrentSemester() +" "+ expiration.getCurrentSchoolYear();
   			 
   		 	}
    		
    		 Date expirationDate = new Date();
             
             
             
             if(applicant.getIsStaff()==true) {
             	expirationDate = expiration.getStaffExpirationDate();
             } else {
             	expirationDate = expiration.getStudentExpirationDate();
             }
    		
            String dayOfWeek = sdf.format(currentDate);
            applicant.setApplicantid(applicantId);
            applicant.setDatesubmitted(currentDate);
            applicant.setDateDay(dayOfWeek);
            applicant.setDatesubmitted(new Date());
            applicant.setEmail(applicant.getEmail());
            userRef.update("fname",applicant.getFirstName()).get();
            userRef.update("mname",applicant.getMiddleInitial()).get();
            userRef.update("lname",applicant.getLastName()).get();
            userRef.update("address",applicant.getAddress()).get();
            userRef.update("contactNumber",applicant.getContactNumber()).get();
            userRef.update("email",applicant.getEmail());
            userRef.update("id",applicant.getIdNumber()).get();
            userRef.update("fname",applicant.getFirstName()).get();
            userRef.update("schoolId",applicant.getIdNumber()).get();
            userRef.update("schoolIdOwner",applicant.getStudentName()).get();
            userRef.update("isStaff", applicant.getIsStaff()).get();
            userRef.update("dateApplied", applicant.getDatesubmitted()).get();
            userRef.update("isEnabled", false).get();
            userRef.update("expirationDate",expirationDate);
            
            VehicleRegistered newVehicleRegistered = new VehicleRegistered();
            newVehicleRegistered.setColor(applicant.getColor());
            newVehicleRegistered.setisFourWheel(applicant.getIsFourWheel());
            newVehicleRegistered.setIsParking(applicant.getIsParking());
            newVehicleRegistered.setPlateNo(applicant.getPlateNo());
            newVehicleRegistered.setRegisteredDate(null);
            newVehicleRegistered.setSemYear(semyear);
            newVehicleRegistered.setUsername(applicant.getEmail());
            newVehicleRegistered.setVehicleMake(applicant.getVehicleMake());
            
            regViService.insertVehicle(newVehicleRegistered);
            
            db.collection("vehicles").document(applicantId).set(newVehicleRegistered);
            db.collection("applicants").document(applicantId).set(applicant);
            return "Applicant registered successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to register applicant";
        }
    }
    
    //for uploading vehicle data document
    public String uploadRequirements(String email, File orcrimg, File licenseimg) {
        try {
        	String orname = email + ":orcr";
        	String liname = email + ":license";
            String or = uploadImageToDrive(orcrimg, orname);
            String li = uploadImageToDrive(licenseimg, liname);
            DocumentReference applicantRef = db.collection("applicants").document(email);
            applicantRef.update("orcrimg", or).get();
            applicantRef.update("licenseimg", or).get();
            return "Images Submitted successfully!" + "ORCR: " + or + "\nLICENSE: " + li;
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to submit images";
        }
    }
    
    public List<ApplicantEntity> getAllApplicants() {
        List<ApplicantEntity> applicants = new ArrayList<>();
        try {
            CollectionReference applicantsCollection = db.collection("applicants");
            applicantsCollection.get().get().forEach(document -> {
                applicants.add(document.toObject(ApplicantEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return applicants;
    }
    // get all applicants with pending ORCR and License approval
    public List<ApplicantEntity> getUnverifiedApplicants() {
        List<ApplicantEntity> unverifiedApplicants = new ArrayList<>();
        try {
            CollectionReference applicantsCollection = db.collection("applicants");
            // Constructing a query to filter applicants where the verified field is false
            Query query = applicantsCollection.whereEqualTo("verified", false);
            // Executing the query
            query.get().get().forEach(document -> {
                unverifiedApplicants.add(document.toObject(ApplicantEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return unverifiedApplicants;
    }
    
 // get all applicants with pending proof of payment approval
    public List<ApplicantEntity> getPendingProofPayment() {
        List<ApplicantEntity> unverifiedApplicants = new ArrayList<>();
        try {
            CollectionReference applicantsCollection = db.collection("applicants");
            // Constructing a query to filter applicants where the verified field is false
            Query query = applicantsCollection.whereEqualTo("paid", false);
            // Executing the query
            query.get().get().forEach(document -> {
                unverifiedApplicants.add(document.toObject(ApplicantEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return unverifiedApplicants;
    }
    
 // get all applicants with pending proof of payment approval
    public List<ApplicantEntity> getPendingApproval() {
        List<ApplicantEntity> unverifiedApplicants = new ArrayList<>();
        try {
            CollectionReference applicantsCollection = db.collection("applicants");
            // Constructing a query to filter applicants where the verified field is false
            Query query = applicantsCollection.whereEqualTo("approved", false);
            // Executing the query
            query.get().get().forEach(document -> {
                unverifiedApplicants.add(document.toObject(ApplicantEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return unverifiedApplicants;
    }
    
    public ApplicantEntity getApplicantById(String email) {
        ApplicantEntity applicant = null;
        try {
            DocumentSnapshot document = db.collection("applicants").document(email).get().get();
            if (document.exists()) {
                applicant = document.toObject(ApplicantEntity.class);
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return applicant;
    }
    
    //for verifying application license and orcr image
    public String updateApplicant(String email) {
        try {
            DocumentReference applicantRef = db.collection("applicants").document(email);
            DocumentReference userRef = db.collection("tbluser").document(email);
            // Update the preApproved field to true
            applicantRef.update("verified", true).get();
            userRef.update("isVerified", true).get();
            // Insert sending of email to the user here.
            ApiFuture<DocumentSnapshot> future = userRef.get();
            DocumentSnapshot document = future.get();
            String fname = (String) document.get("fname");
            String message = "Your ORCR and license have been approved. You may now proceed with the payment.";
            String subject = "VehicleVista: ORCR and LICENSE Verified";
            sendEmail(email, fname, message, subject);
            return "Applicant orcr and license validated!";
            
        } catch (ApiException | InterruptedException | ExecutionException |MessagingException e) {
            e.printStackTrace();
            return "Failed to update applicant verified status: " + e.getMessage();
        }
    }
    
    private void sendEmail(String email, String fname, String message, String subject) throws MessagingException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        // Set recipient
        mimeMessageHelper.setTo(email);
        // Set email subject
        mimeMessageHelper.setSubject(subject);
        // Set email content
        String messageContent = "<html><body><h2>Good day, " + fname + "</h2>" +
                                "<h4>" + message + "</h4>" +
                                "<br>" +
                                "<h4>Best regards,</h4>" +
                                "<h4><i>VehicleVista</i></h4></body></html>";
        mimeMessageHelper.setText(messageContent, true); // Enable HTML
        // Send email
        javaMailSender.send(mimeMessage);
    }


    
    //for approving payment of applicant 
    public String updatePaidApplicant(String email) {
    	try {
    		DocumentReference applicantRef = db.collection("applicants").document(email);
    		DocumentReference userRef = db.collection("tbluser").document(email);
            // Update the preApproved field to true
            applicantRef.update("paid", true).get();
            userRef.update("isPaid", true).get();
            userRef.update("datePaid", new Date()).get();
            return "Applicant payment status validated!";
            
    	}catch(ApiException | InterruptedException | ExecutionException e) {
    		e.printStackTrace();
            return "Failed to update applicant payment status: " + e.getMessage();
    	}
    }
    
    //for complete approving of applicant
    public String approveApplicant(String email) throws Exception {
    	try {
    		DocumentReference applicantRef = db.collection("applicants").document(email);
    		DocumentReference userRef = db.collection("tbluser").document(email);
    		DocumentReference expRef = db.collection("tblexpiration").document("document");
    		
    		ApiFuture<DocumentSnapshot> expSnapshot = expRef.get();
    		ExpirationEntity expiration = expSnapshot.get().toObject(ExpirationEntity.class);
    		
    		if(expiration == null) {
    			throw new Exception("NO expiration entity");
    		}
    		
    		// Retrieve applicant data from Firestore and map it to ApplicantEntity
            ApiFuture<DocumentSnapshot> applicantSnapshot = applicantRef.get();
            ApplicantEntity applicant = applicantSnapshot.get().toObject(ApplicantEntity.class);
    		
            Date expirationDate = new Date();
            
            
            
            if(applicant.getIsStaff()==true) {
            	expirationDate = expiration.getStaffExpirationDate();
            } else {
            	expirationDate = expiration.getStudentExpirationDate();
            }
            
            
            // Update the preApproved field to true
            applicantRef.update("approved", true).get();
            
            userRef.update("isApproved", true).get();
            userRef.update("fname",applicant.getFirstName()).get();
            userRef.update("mname",applicant.getMiddleInitial()).get();
            userRef.update("lname",applicant.getLastName()).get();
            userRef.update("address",applicant.getAddress()).get();
            userRef.update("contactNumber",applicant.getContactNumber()).get();
            userRef.update("email",applicant.getEmail());
            userRef.update("id",applicant.getIdNumber()).get();
            userRef.update("fname",applicant.getFirstName()).get();
            userRef.update("schoolId",applicant.getIdNumber()).get();
            userRef.update("schoolIdOwner",applicant.getStudentName()).get();
            userRef.update("isStaff", applicant.getIsStaff()).get();
            userRef.update("dateApplied", applicant.getDatesubmitted()).get();
            userRef.update("isEnabled", true).get();
            userRef.update("expirationDate",expirationDate);
            
            return "Application approved successfully!";
    	}catch(ApiException | InterruptedException | ExecutionException e) {
    		e.printStackTrace();
            return "Failed to approve application status: " + e.getMessage();
    	}
    } 
    
    public Response rejectApplication(String email, String message) throws MessagingException {
        Response res = new Response();
        ApplicantEntity applicantRef = getApplicantById(email);
        if (applicantRef != null) {
            // Delete the document from the database
            try {
                DocumentReference docRef = db.collection("applicants").document(email);
                DocumentReference userRef = db.collection("tbluser").document(email);

                ApiFuture<DocumentSnapshot> future = userRef.get();
                DocumentSnapshot document = future.get();
                String fname = (String) document.get("fname");
                ApiFuture<WriteResult> deleteResult = docRef.delete();
                deleteResult.get(); // Wait for the delete operation to complete
                res.setMessage("Application rejected successfully");
                res.setStatus("success");
                
                String subject = "VehicleVista: Application Rejected";
                sendEmail(email, fname, message, subject);
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
                res.setMessage("Failed to reject application");
                res.setStatus("error");
            }
        } else {
            res.setMessage("Applicant not found");
            res.setStatus("error");
        }
        return res;
    }

    
    private Drive createDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential)
                .build();
    }
}

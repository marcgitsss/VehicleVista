package com.SanJuanPunchMan.SystemInteg.service;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.StatusCode;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.FileList;
import com.google.auth.oauth2.GoogleCredentials;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import jakarta.annotation.PostConstruct;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Service;



import com.SanJuanPunchMan.SystemInteg.entity.ApplicantEntity;

//new imports
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;

@Service
public class ApplicantService {

    private final Firestore db;
    
    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
//    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();
    private static final String SERVICE_ACCOUNT_KEY_PATH = "D:/setups/REACT APPS/2024/sys integ/backend/VehicleVista-JessreyBranch/backend/SystemInteg/cred.json";

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
                // Update the existing file
                com.google.api.services.drive.model.File existingFile = fileList.getFiles().get(0);
                FileContent mediaContent = new FileContent("image/jpeg", file);
                drive.files().update(existingFile.getId(), existingFile, mediaContent).execute();
                String imgUrl = "https://drive.google.com/uc?export=view&id=" + existingFile.getId();
                System.out.println("IMAGE ID: " + existingFile.getId());
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
            String dayOfWeek = sdf.format(currentDate);
            applicant.setApplicantid(applicantId);
            applicant.setDatesubmitted(currentDate);
            applicant.setDateDay(dayOfWeek);
            db.collection("applicants").document(applicantId).set(applicant);
            return "Applicant registered successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to register applicant";
        }
    }
    
    //for vehicle data
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
    
    public ApplicantEntity getApplicantById(String applicantid) {
        ApplicantEntity applicant = null;
        try {
            DocumentSnapshot document = db.collection("applicants").document(applicantid).get().get();
            if (document.exists()) {
                applicant = document.toObject(ApplicantEntity.class);
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return applicant;
    }
    
    public String updateApplicant(String applicantid) {
        try {
            DocumentReference applicantRef = db.collection("applicants").document(applicantid);
            // Update the preApproved field to true
            applicantRef.update("verified", true).get();
            return "Applicant verified status updated successfully!";
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return "Failed to update applicant verified status: " + e.getMessage();
        }
    }
    
    public String updatePaidApplicant(String applicantid) {
    	try {
    		DocumentReference applicantRef = db.collection("applicants").document(applicantid);
            // Update the preApproved field to true
            applicantRef.update("paid", true).get();
            return "Applicant payment status updated successfully!";
    	}catch(ApiException | InterruptedException | ExecutionException e) {
    		e.printStackTrace();
            return "Failed to update applicant payment status: " + e.getMessage();
    	}
    }
    
    public String approveApplicant(String applicantid) {
    	try {
    		DocumentReference applicantRef = db.collection("applicants").document(applicantid);
            // Update the preApproved field to true
            applicantRef.update("approved", true).get();
            return "Application approved successfully!";
    	}catch(ApiException | InterruptedException | ExecutionException e) {
    		e.printStackTrace();
            return "Failed to approve application status: " + e.getMessage();
    	}
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

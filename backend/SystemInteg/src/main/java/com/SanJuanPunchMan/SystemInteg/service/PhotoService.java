package com.SanJuanPunchMan.SystemInteg.service;

import com.SanJuanPunchMan.SystemInteg.entity.PhotoResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.FileList;
import com.google.api.services.drive.model.Permission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class PhotoService {
	

    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    private static String getPathToGoogleCredentials() {
        String currentDirectory = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDirectory, "cred.json");
        return filePath.toString();
    }

   public PhotoResponse uploadImageToDrive(File file, String name) {
    PhotoResponse res = new PhotoResponse();

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
            res.setStatus(200);
            res.setMessage("Image Successfully Updated on Drive");
            res.setUrl(imgUrl);
        } else {
            // Upload a new file
            com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();
            fileMetaData.setName(name);
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent = new FileContent("image/jpeg", file);
            com.google.api.services.drive.model.File uploadFile = drive.files().create(fileMetaData, mediaContent).setFields("id").execute();
            String imgUrl = "https://drive.google.com/uc?export=view&id=" + uploadFile.getId();
            System.out.println("IMAGE ID: " + uploadFile.getId());
            res.setStatus(200);
            res.setMessage("Image Successfully Uploaded To Drive");
            res.setUrl(imgUrl);
        }

        file.delete(); // Delete the file only after successful upload or update

    } catch (Exception e) {
        // Log the exception instead of printing it directly
        System.err.println("Error uploading image to Google Drive: " + e.getMessage());
        res.setStatus(500);
        res.setMessage("Error uploading image to Google Drive");
    }
    return res;
}
   
   public String getViewOnlyLink(String fileName) {
       try {
           String folderId = "1EJTAWTorsFqdnUKTcsTQYWbQCPit3GbC";
           Drive drive = createDriveService();

           // Check if a file with the given name exists in the specified folder
           String query = "name='" + fileName + "' and '" + folderId + "' in parents and trashed=false";
           FileList fileList = drive.files().list().setQ(query).execute();
           if (fileList.getFiles().size() > 0) {
               // Get the ID of the first file found
               String fileId = fileList.getFiles().get(0).getId();
               // Create a permission for the file that allows anyone with the link to view it
               Permission permission = new Permission()
                       .setType("anyone")
                       .setRole("reader");
               drive.permissions().create(fileId, permission).execute();
               // Construct and return the view-only link for the file
               return "https://drive.google.com/file/d/" + fileId + "/view";
           } else {
               // Return null if the file is not found
               return null;
           }
       } catch (Exception e) {
           // Log the exception instead of printing it directly
           System.err.println("Error getting view-only link for image from Google Drive: " + e.getMessage());
           return null;
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


    
    
//    public String getViewOnlyLink(String fileName) throws IOException {
//        // Get the file ID of the file with the given name
//        String fileId = getFileIdByName(fileName);
//        if (fileId != null) {
//            // Create a permission for the file that allows anyone with the link to view it
//            drive.permissions().create(fileId, new Permission().setType("anyone").setRole("reader")).execute();
//            // Construct and return the view-only link for the file
//            return "https://drive.google.com/file/d/" + fileId + "/view";
//        } else {
//            // Return null if the file is not found
//            return null;
//        }
//    }
//    
    
    
    
    
    
//    Support Funtions
//    private String getFileIdByName(String fileName) throws IOException {
//        String fileId = null;
//        // Create a query to search for files with the given name
//        String query = "name='" + fileName + "'";
//        // Execute the query and get the list of files
//        FileList result = drive.files().list().setQ(query).execute();
//        List<com.google.api.services.drive.model.File> files = result.getFiles();
//        // If the list is not empty, get the ID of the first file
//        if (files != null && !files.isEmpty()) {
//            fileId = files.get(0).toString();
//        }
//        return fileId;
//    }
//    
    

    
}

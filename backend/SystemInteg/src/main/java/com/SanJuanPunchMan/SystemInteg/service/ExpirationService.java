package com.SanJuanPunchMan.SystemInteg.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.entity.ExpirationEntity;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class ExpirationService {
	
	private final Firestore db = FirestoreClient.getFirestore();
	
	public ExpirationEntity getExpiration() throws InterruptedException, ExecutionException {
		CollectionReference expirationCollection = db.collection("tblexpiration");
		ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
		List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();
		
		DocumentSnapshot document = expirationDocuments.get(0);
		ExpirationEntity expirationEntity = document.toObject(ExpirationEntity.class);
		
		return expirationEntity;
	}
	
	public String updateStudentExpiration(Date expirationDate) throws InterruptedException, ExecutionException {
	    CollectionReference userCollection = db.collection("tbluser");
	    CollectionReference expirationCollection = db.collection("tblexpiration");

	    // Retrieve the single document in the tblexpiration collection
	    ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
	    List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();

	    ExpirationEntity expirationEntity;

	    if (expirationDocuments.isEmpty()) {
	        // No document found, create a new one
	        expirationEntity = new ExpirationEntity();
	        expirationEntity.setCurrentSemester("First Semester");
	        expirationEntity.setCurrentSchoolYear("2024-2025");

	        Map<String, Object> data = new HashMap<>();
	        data.put("id", expirationEntity.getId());
	        data.put("studentExpirationDate", expirationEntity.getStudentExpirationDate());
	        data.put("staffExpirationDate", expirationEntity.getStaffExpirationDate());
	        data.put("currentSemester", expirationEntity.getCurrentSemester());
	        data.put("currentSchoolYear", expirationEntity.getCurrentSchoolYear());

	        ApiFuture<WriteResult> result = expirationCollection.document("document").set(data);
	        result.get(); // Wait for the operation to complete
	    } else if (expirationDocuments.size() > 1) {
	        return "There are more than 1 expiration documents";
	    } else {
	        // Exactly one document found, update it
	        DocumentSnapshot document = expirationDocuments.get(0);
	        expirationEntity = document.toObject(ExpirationEntity.class);
	    }

	    // Update the expiration document
	    expirationEntity.setStudentExpirationDate(expirationDate);
	    expirationCollection.document("document").set(expirationEntity);
	    // Update expiration date for all users
	    Query query = userCollection.whereEqualTo("isStaff", false);
	    ApiFuture<QuerySnapshot> querySnapshot = query.get();
	    List<QueryDocumentSnapshot> userDocuments = querySnapshot.get().getDocuments();
	    
	    if(userDocuments.isEmpty()) {
	    	return "No Student Entities";
	    }

	    for (DocumentSnapshot userSnapshot : userDocuments) {
	        UserEntity userEntity = userSnapshot.toObject(UserEntity.class);
	        userEntity.setExpirationDate(expirationDate);

	        DocumentReference userRef = db.collection("tbluser").document(userEntity.getUsername());
	        userRef.set(userEntity);
	    }



	    return "Student Expiration Update Successful";
	}

	public String updateStaffExpiration(Date expirationDate) throws InterruptedException, ExecutionException {
	    CollectionReference userCollection = db.collection("tbluser");
	    CollectionReference expirationCollection = db.collection("tblexpiration");

	    // Retrieve the single document in the tblexpiration collection
	    ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
	    List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();

	    ExpirationEntity expirationEntity;

	    if (expirationDocuments.isEmpty()) {
	        // No document found, create a new one
	        expirationEntity = new ExpirationEntity();
	        expirationEntity.setCurrentSemester("First Semester");
	        expirationEntity.setCurrentSchoolYear("2024-2025");

	        Map<String, Object> data = new HashMap<>();
	        data.put("id", expirationEntity.getId());
	        data.put("studentExpirationDate", expirationEntity.getStudentExpirationDate());
	        data.put("staffExpirationDate", expirationEntity.getStaffExpirationDate());
	        data.put("currentSemester", expirationEntity.getCurrentSemester());
	        data.put("currentSchoolYear", expirationEntity.getCurrentSchoolYear());

	        ApiFuture<WriteResult> result = expirationCollection.document("document").set(data);
	        result.get(); // Wait for the operation to complete
	    } else if (expirationDocuments.size() > 1) {
	        return "There are more than 1 expiration documents";
	    } else {
	        // Exactly one document found, update it
	        DocumentSnapshot document = expirationDocuments.get(0);
	        expirationEntity = document.toObject(ExpirationEntity.class);
	    }

	    // Update the expiration document
	    expirationEntity.setStaffExpirationDate(expirationDate);
	    expirationCollection.document("document").set(expirationEntity);

	 // Update expiration date for all users
	    Query query = userCollection.whereEqualTo("isStaff", true);
	    ApiFuture<QuerySnapshot> querySnapshot = query.get();
	    List<QueryDocumentSnapshot> userDocuments = querySnapshot.get().getDocuments();
	    
	    if(userDocuments.isEmpty()) {
	    	return "No Staff Entities";
	    }

	    for (DocumentSnapshot userSnapshot : userDocuments) {
	        UserEntity userEntity = userSnapshot.toObject(UserEntity.class);
	        userEntity.setExpirationDate(expirationDate);

	        DocumentReference userRef = db.collection("tbluser").document(userEntity.getUsername());
	        userRef.set(userEntity);
	    }

	    
	    return "Staff Expiration Update Successful";
	}

	
	public String updateSchoolYear (String schoolYear) throws InterruptedException, ExecutionException {
		CollectionReference expirationCollection = db.collection("tblexpiration");

	    // Retrieve the single document in the tblexpiration collection
	    ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
	    List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();

	    ExpirationEntity expirationEntity;

	    if (expirationDocuments.isEmpty()) {
	        // No document found, create a new one
	        expirationEntity = new ExpirationEntity();
	        expirationEntity.setCurrentSemester("First Semester");
	        expirationEntity.setCurrentSchoolYear("2024-2025");

	        Map<String, Object> data = new HashMap<>();
	        data.put("id", expirationEntity.getId());
	        data.put("studentExpirationDate", expirationEntity.getStudentExpirationDate());
	        data.put("staffExpirationDate", expirationEntity.getStaffExpirationDate());
	        data.put("currentSemester", expirationEntity.getCurrentSemester());
	        data.put("currentSchoolYear", schoolYear);

	        ApiFuture<WriteResult> result = expirationCollection.document("document").set(data);
	        result.get(); // Wait for the operation to complete
	        
	        return "Updated School Year: "+ schoolYear;
	    } else if (expirationDocuments.size() > 1) {
	        return "There are more than 1 expiration documents";
	    } else {
	        // Exactly one document found, update it
	        DocumentSnapshot document = expirationDocuments.get(0);
	        expirationEntity = document.toObject(ExpirationEntity.class);
	        
	        Map<String, Object> data = new HashMap<>();
	        data.put("id", expirationEntity.getId());
	        data.put("studentExpirationDate", expirationEntity.getStudentExpirationDate());
	        data.put("staffExpirationDate", expirationEntity.getStaffExpirationDate());
	        data.put("currentSemester", expirationEntity.getCurrentSemester());
	        data.put("currentSchoolYear", schoolYear);
	        ApiFuture<WriteResult> result = document.getReference().set(data);
	        result.get();
	        
	        return "Updated School Year: "+ schoolYear;
	    }

	}

	public String updateSemester (String semester) throws InterruptedException, ExecutionException {
		CollectionReference expirationCollection = db.collection("tblexpiration");

	    // Retrieve the single document in the tblexpiration collection
	    ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
	    List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();

	    ExpirationEntity expirationEntity;
	    
	    if (expirationDocuments.isEmpty()) {
	        // No document found, create a new one
	        expirationEntity = new ExpirationEntity();
	        expirationEntity.setCurrentSemester("First Semester");
	        expirationEntity.setCurrentSchoolYear("2024-2025");
	    } else if (expirationDocuments.size() > 1) {
	        return "There are more than 1 expiration documents";
	    } else {
	        // Exactly one document found, update it
	        DocumentSnapshot document = expirationDocuments.get(0);
	        expirationEntity = document.toObject(ExpirationEntity.class); 
	    }
	    
	    Map<String, Object> data = new HashMap<>();
        data.put("id", expirationEntity.getId());
        data.put("studentExpirationDate", expirationEntity.getStudentExpirationDate());
        data.put("staffExpirationDate", expirationEntity.getStaffExpirationDate());
        data.put("currentSemester", semester);
        data.put("currentSchoolYear", expirationEntity.getCurrentSchoolYear());

        ApiFuture<WriteResult> result = expirationCollection.document("document").set(data);
        result.get(); 
        
        return "Updated Semester: "+ semester;

	}
}

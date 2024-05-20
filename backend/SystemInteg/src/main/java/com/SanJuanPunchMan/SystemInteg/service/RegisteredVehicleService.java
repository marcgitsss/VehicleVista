package com.SanJuanPunchMan.SystemInteg.service;

import com.google.api.gax.rpc.ApiException;
import com.google.api.gax.rpc.StatusCode;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import com.google.cloud.firestore.Query;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.SanJuanPunchMan.SystemInteg.entity.ExpirationEntity;
import com.SanJuanPunchMan.SystemInteg.entity.Response;
import com.SanJuanPunchMan.SystemInteg.entity.VehicleRegistered;

import jakarta.annotation.PostConstruct;
@Service
public class RegisteredVehicleService {
	 private final Firestore db;   
	 //CONSTRUCTOR
	 public RegisteredVehicleService() {
	        // Initialize Firestore instance
	        db = FirestoreClient.getFirestore();
	 }
	 //CREATING TABLE
	 @PostConstruct
	    public void createVehicleCollectionIfNotExists() {
	        CollectionReference vehiclesCollection = db.collection("vehicles");
	        try {
	            // Check if collection exists
	        	vehiclesCollection.get().get();
	        } catch (ApiException exception) {
	            // If collection doesn't exist, create it
	            if (exception.getStatusCode().getCode() == StatusCode.Code.NOT_FOUND) {
	                db.collection("vehicles");
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	 
	// GET ALL VEHICLES
	    public List<VehicleRegistered> getAll() {
	        List<VehicleRegistered> vehicles = new ArrayList<>();
	        try {
	            CollectionReference collection = db.collection("vehicles");
	            ApiFuture<QuerySnapshot> future = collection.get();
	            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
	            for (DocumentSnapshot document : documents) {
	                VehicleRegistered vehicle = document.toObject(VehicleRegistered.class);
	                vehicles.add(vehicle);
	            }
	        } catch (InterruptedException | ExecutionException e) {
	            e.printStackTrace();
	        }
	        return vehicles;
	    }
	 
	 public VehicleRegistered getVehicleByUsername(String username) {
		 Firestore db = FirestoreClient.getFirestore();
		    CollectionReference collection = db.collection("vehicles");

		    Query query = collection.whereEqualTo("username", username).limit(1);

		    ApiFuture<QuerySnapshot> querySnapshot = query.get();

		    try {
		        QuerySnapshot snapshot = querySnapshot.get();
		        if (!snapshot.isEmpty()) {
		            DocumentSnapshot document = snapshot.getDocuments().get(0);
		            return document.toObject(VehicleRegistered.class);
		        }
		    } catch (InterruptedException | ExecutionException e) {
		        e.printStackTrace();
		    }

		    return null; // Return null if no document is found
	 } 
	 
	 public Response insertVehicle(VehicleRegistered vehicle) {
		    try {
		        Firestore db = FirestoreClient.getFirestore();
		        db.collection("vehicles").document(vehicle.getUsername()).set(vehicle);
		        return new Response("success", "Successfully inserted vehicle");
		    } catch (Exception e) {
		        e.printStackTrace();
		        return new Response("error", "Failed to insert vehicle");
		    }
		}
	 
	//INSERT FUNCTION
		 public Response registerStickerVehicle(VehicleRegistered vehicle) throws InterruptedException, ExecutionException {
			 Firestore db = FirestoreClient.getFirestore();
		     CollectionReference collection = db.collection("vehicles");
		     
		     CollectionReference expirationCollection = db.collection("tblexpiration");
		     // Retrieve the single document in the tblexpiration collection
			 ApiFuture<QuerySnapshot> expirationSnapshot = expirationCollection.get();
			 List<QueryDocumentSnapshot> expirationDocuments = expirationSnapshot.get().getDocuments();
			 QueryDocumentSnapshot firstdoc = expirationDocuments.get(0);
			 
			 
			 if(expirationDocuments.size() == 1) {
				 String semyear = firstdoc.get("currentSemester") +" "+ firstdoc.get("currentSchoolYear");
				 vehicle.setSemYear(semyear);
			 }
			 
		     VehicleRegistered lastvehicle = null;
			 try {
				 ApiFuture<QuerySnapshot> future = collection.orderBy("registeredDate").limitToLast(1).get();           
		         QuerySnapshot document = future.get();
		       //IF THERE ARE EXISTING STICKERS WE CONTINUE THE INCREMENT OF STICKERNUMBERs
		         if (document.size()>1) {
		        	 lastvehicle = document.toObjects(VehicleRegistered.class).get(0);
		        	 int newstickerid = lastvehicle.getStickerId() + 1; 
		        	 vehicle.setStickerId(newstickerid);
		        	 db.collection("vehicles").document(vehicle.getUsername()).update("stickerId", newstickerid);
		        	 return new Response("success", "Successfully registered vehicle sticker"); 
		         } else {		//IF IT IS THE FIRST STICKER we use 1
		        	 int newstickerid = 1;
		        	 vehicle.setStickerId(newstickerid);
		        	 db.collection("vehicles").document(vehicle.getUsername()).update("stickerId", newstickerid);
		        	 return new Response("success", "Successfully registered vehicle sticker"); 
		         } 
			 }catch(Exception e) {
				 e.printStackTrace();
		         return new Response("error", "Failed to register sticker for vehicle."); 
			 }
		 }
}

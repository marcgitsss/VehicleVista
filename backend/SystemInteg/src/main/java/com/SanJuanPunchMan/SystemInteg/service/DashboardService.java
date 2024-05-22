package com.SanJuanPunchMan.SystemInteg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.entity.ApplicantEntity;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.SanJuanPunchMan.SystemInteg.entity.VehicleRegistered;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class DashboardService {
	private final Firestore db;   
	 //CONSTRUCTOR
	 public DashboardService() {
	        // Initialize Firestore instance
	        db = FirestoreClient.getFirestore();
	 }  
	 public Map<String, Long> getDashboardStatistics() {
	        Map<String, Long> statistics = new HashMap<>();
	        List<ApplicantEntity> applicants = new ArrayList<>();
	        CollectionReference applicantsCollection = db.collection("applicants");
	        
	        List<VehicleRegistered> vehicles = new ArrayList<>();
	        CollectionReference vehiclesCollection = db.collection("vehicles");
	        
	        List<UserEntity> users = new ArrayList<>();
	        CollectionReference userCollection = db.collection("tbluser");
	        try {
	        	applicantsCollection.get().get().forEach(document -> {
	                applicants.add(document.toObject(ApplicantEntity.class));
	            });
	        	long applicantcount = applicants.size();
	        	
	        	vehiclesCollection.get().get().forEach(document -> {
	        		vehicles.add(document.toObject(VehicleRegistered.class));
	            });
	        	long twowheelcount = vehicles.stream()
	        	        .filter(obj -> obj.getisFourWheel().equals(false))
	        	        .count();
	        	long fourwheelercount = vehicles.stream()
	        	        .filter(obj -> obj.getisFourWheel().equals(true))
	        	        .count();
	        	
	        	userCollection.get().get().forEach(document -> {
	        		users.add(document.toObject(UserEntity.class));
	            });
	        	long usercount = users.size();
	        	long vehiclecount = twowheelcount + fourwheelercount;
	        	
	        	statistics.put("applicantCount", applicantcount);
	        	statistics.put("totalVehicles", vehiclecount);
	        	statistics.put("twowheelerCount", twowheelcount);
	        	statistics.put("fourwheelerCount", fourwheelercount);
	        	statistics.put("userCount", usercount);
	        }catch(Exception e) {
	        	e.printStackTrace();
	        }
	        return statistics;
	    } 
}

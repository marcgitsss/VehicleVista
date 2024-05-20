package com.SanJuanPunchMan.SystemInteg.service;

import com.SanJuanPunchMan.SystemInteg.entity.PricesEntity;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class PricesService {

    private final Firestore db = FirestoreClient.getFirestore();
    private final CollectionReference pricesCollection = db.collection("tblprices");

    public void savePrices(PricesEntity pricesEntity) throws ExecutionException, InterruptedException {
        ApiFuture<DocumentReference> result = pricesCollection.add(pricesEntity);
        result.get(); // Wait for the operation to complete
    }

    public PricesEntity getPrices() throws ExecutionException, InterruptedException {
        DocumentReference docRef = pricesCollection.document("prices");
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        return document.exists() ? document.toObject(PricesEntity.class) : null;
    }
    


    public void updateStudentPrices(PricesEntity updatedPrices) throws ExecutionException, InterruptedException {
        DocumentReference docRef = pricesCollection.document("prices");
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        PricesEntity updatedStudentPrices = new PricesEntity();

        if (document.exists()) {
            PricesEntity prices = document.toObject(PricesEntity.class);
            updatedStudentPrices.setId(prices.getId());
            updatedStudentPrices.setStaffTwoWheelPickup(prices.getStaffTwoWheelPickup());
            updatedStudentPrices.setStaffFourWheelPickup(prices.getStaffFourWheelPickup());
            updatedStudentPrices.setStaffTwoWheelParking(prices.getStaffTwoWheelParking());
            updatedStudentPrices.setStaffFourWheelParking(prices.getStaffFourWheelParking());
        } else {
            // Document does not exist, set default values for staff prices
            updatedStudentPrices.setStaffTwoWheelPickup(0.0);
            updatedStudentPrices.setStaffFourWheelPickup(0.0);
            updatedStudentPrices.setStaffTwoWheelParking(0.0);
            updatedStudentPrices.setStaffFourWheelParking(0.0);
        }

        // Update only the student prices
        updatedStudentPrices.setStudentTwoWheelPickup(updatedPrices.getStudentTwoWheelPickup());
        updatedStudentPrices.setStudentFourWheelPickup(updatedPrices.getStudentFourWheelPickup());
        updatedStudentPrices.setStudentTwoWheelParking(updatedPrices.getStudentTwoWheelParking());
        updatedStudentPrices.setStudentFourWheelParking(updatedPrices.getStudentFourWheelParking());

        // Save the updated student prices object back to Firestore
        ApiFuture<WriteResult> updateFuture = docRef.set(updatedStudentPrices);
        updateFuture.get(); // Wait for the operation to complete
    }


    
    public void updateStaffPrices(PricesEntity updatedPrices) throws ExecutionException, InterruptedException {
        DocumentReference docRef = pricesCollection.document("prices");
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        PricesEntity updatedStaffPrices = new PricesEntity();

        if (document.exists()) {
            PricesEntity prices = document.toObject(PricesEntity.class);
            updatedStaffPrices.setId(prices.getId());
            updatedStaffPrices.setStudentTwoWheelPickup(prices.getStudentTwoWheelPickup());
            updatedStaffPrices.setStudentFourWheelPickup(prices.getStudentFourWheelPickup());
            updatedStaffPrices.setStudentTwoWheelParking(prices.getStudentTwoWheelParking());
            updatedStaffPrices.setStudentFourWheelParking(prices.getStudentFourWheelParking());
        } else {
            // Document does not exist, set default values for student prices
            updatedStaffPrices.setStudentTwoWheelPickup(0.0);
            updatedStaffPrices.setStudentFourWheelPickup(0.0);
            updatedStaffPrices.setStudentTwoWheelParking(0.0);
            updatedStaffPrices.setStudentFourWheelParking(0.0);
        }

        // Update only the staff prices
        updatedStaffPrices.setStaffTwoWheelPickup(updatedPrices.getStaffTwoWheelPickup());
        updatedStaffPrices.setStaffFourWheelPickup(updatedPrices.getStaffFourWheelPickup());
        updatedStaffPrices.setStaffTwoWheelParking(updatedPrices.getStaffTwoWheelParking());
        updatedStaffPrices.setStaffFourWheelParking(updatedPrices.getStaffFourWheelParking());

        // Save the updated staff prices object back to Firestore
        ApiFuture<WriteResult> updateFuture = docRef.set(updatedStaffPrices);
        updateFuture.get(); // Wait for the operation to complete
    }




    public void deletePrices(String id) throws ExecutionException, InterruptedException {
        pricesCollection.document(id).delete().get(); // Wait for the operation to complete
    }
}

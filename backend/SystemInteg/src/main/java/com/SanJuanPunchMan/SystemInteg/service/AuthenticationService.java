package com.SanJuanPunchMan.SystemInteg.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.entity.AdminEntity;
import com.SanJuanPunchMan.SystemInteg.entity.AuthenticationResponse;
import com.SanJuanPunchMan.SystemInteg.entity.EmployeeEntity;
import com.SanJuanPunchMan.SystemInteg.entity.Role;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.google.api.core.ApiFuture;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class AuthenticationService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthenticationResponse register(UserEntity request) throws InterruptedException, ExecutionException {
        UserEntity user = new UserEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER); // Assuming role is already set in request

        // Saves user
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("tbluser").document(user.getUsername()).set(user);
        collectionsApiFuture.get().getUpdateTime().toString();
        
        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(UserEntity request) throws FirebaseAuthException {
        try {
            // Authenticate user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            // Get user data from Firestore
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference documentReference = dbFirestore.collection("tbluser").document(request.getUsername());
            DocumentSnapshot documentSnapshot = documentReference.get().get();
            
//          System.out.print("\n\n\n\n\n\n\n"+ documentSnapshot.exists());
            if (documentSnapshot.exists()) {
                UserEntity user = documentSnapshot.toObject(UserEntity.class);

                // Generate JWT token
                String token = jwtService.generateToken(user);

                return new AuthenticationResponse(token);
            } else {
                throw new RuntimeException("User not found");
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to authenticate user");
        }
    }
    
    
    //  FOR ADMIN
    public AuthenticationResponse adminRegister(AdminEntity request) throws InterruptedException, ExecutionException {
    	AdminEntity user = new AdminEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN); // Assuming role is already set in request

        // Saves user
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("tbladmin").document(user.getUsername()).set(user);
        collectionsApiFuture.get().getUpdateTime().toString();
        
        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
    
    public AuthenticationResponse adminAuthenticate(AdminEntity request) throws FirebaseAuthException {
        try {        	
            // Authenticate user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            // Get user data from Firestore
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference documentReference = dbFirestore.collection("tbladmin").document(request.getUsername());
            DocumentSnapshot documentSnapshot = documentReference.get().get();
            
            System.out.print("\n\n\n\n\n"+documentSnapshot.exists());
            if (documentSnapshot.exists()) {
            	AdminEntity user = documentSnapshot.toObject(AdminEntity.class);

                // Generate JWT token
                String token = jwtService.generateToken(user);

                return new AuthenticationResponse(token);
            } else {
                throw new RuntimeException("User not found");
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to authenticate user");
        }
    }
    
    
//    FOR EMPLOYEE
    public AuthenticationResponse employeeRegister(EmployeeEntity request) throws InterruptedException, ExecutionException {
    	EmployeeEntity user = new EmployeeEntity();

        // Set user details from request
        user.setUsername(request.getUsername());
        // Hash the password
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.EMPLOYEE); // Assuming role is already set in request

        // Saves user
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("tblemployee").document(user.getUsername()).set(user);
        collectionsApiFuture.get().getUpdateTime().toString();
        
        // Generate JWT token
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse employeeAuthentication(EmployeeEntity request) throws FirebaseAuthException {
        try {        	
            // Authenticate user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            System.out.print("\n\n\n\n\n"+request);
            // Get user data from Firestore
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference documentReference = dbFirestore.collection("tblemployee").document(request.getUsername());
            DocumentSnapshot documentSnapshot = documentReference.get().get();
            
//            System.out.print("\n\n\n\n\n"+documentSnapshot.exists());
            if (documentSnapshot.exists()) {
            	EmployeeEntity user = documentSnapshot.toObject(EmployeeEntity.class);

                // Generate JWT token
                String token = jwtService.generateToken(user);

                return new AuthenticationResponse(token);
            } else {
                throw new RuntimeException("User not found");
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new RuntimeException("Failed to authenticate user");
        }
    }
}
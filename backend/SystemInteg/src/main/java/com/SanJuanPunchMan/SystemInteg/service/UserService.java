package com.SanJuanPunchMan.SystemInteg.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SanJuanPunchMan.SystemInteg.entity.AdminEntity;
import com.SanJuanPunchMan.SystemInteg.entity.ApplicantEntity;
import com.SanJuanPunchMan.SystemInteg.entity.EmployeeEntity;
import com.SanJuanPunchMan.SystemInteg.entity.Response;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.google.api.core.ApiFuture;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class UserService implements UserDetailsService {

    private PasswordEncoder encoder = new BCryptPasswordEncoder();
//    private final Firestore db;
//    
//    public UserService() {
//        // Initialize Firestore instance
//        db = FirestoreClient.getFirestore();
//    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
            DocumentSnapshot userSnapshot = userRef.get().get();

            DocumentReference adminRef = dbFirestore.collection("tbladmin").document(username);
            DocumentSnapshot adminSnapshot = adminRef.get().get();

            DocumentReference employeeRef = dbFirestore.collection("tblemployee").document(username);
            DocumentSnapshot employeeSnapshot = employeeRef.get().get();

            if (userSnapshot.exists()) {
                UserEntity userEntity = userSnapshot.toObject(UserEntity.class); // Log userEntity to verify mapping
                UserDetails userDetails = buildUserDetails(userEntity);
                return userDetails;
            } else if (adminSnapshot.exists()) {
                AdminEntity userEntity = adminSnapshot.toObject(AdminEntity.class); // Log userEntity to verify mapping
                UserDetails userDetails = buildAdminDetails(userEntity);
                return userDetails;
            } else if (employeeSnapshot.exists()) {
                EmployeeEntity userEntity = employeeSnapshot.toObject(EmployeeEntity.class); // Log userEntity to verify mapping
                UserDetails userDetails = buildEmployeeDetails(userEntity);
                return userDetails;
            } else {
                throw new UsernameNotFoundException("Username not found");
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new UsernameNotFoundException("Failed to load user by username", e);
        }
    }
    
    public UserEntity getUserByUsername(String username) throws InterruptedException, ExecutionException {
    	Firestore dbFirestore = FirestoreClient.getFirestore();
    	DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
        DocumentSnapshot userSnapshot = userRef.get().get();
        
        UserEntity userEntity = userSnapshot.toObject(UserEntity.class);
    	return userEntity;
    }
    
    public AdminEntity getAdminByUsername(String username) throws InterruptedException, ExecutionException {
    	Firestore dbFirestore = FirestoreClient.getFirestore();
    	DocumentReference userRef = dbFirestore.collection("tbladmin").document(username);
        DocumentSnapshot userSnapshot = userRef.get().get();
        
        AdminEntity userEntity = userSnapshot.toObject(AdminEntity.class);
    	return userEntity;
    }
    
    public EmployeeEntity getEmployeeByUsername(String username) throws InterruptedException, ExecutionException {
    	Firestore dbFirestore = FirestoreClient.getFirestore();
    	DocumentReference userRef = dbFirestore.collection("tblemployee").document(username);
        DocumentSnapshot userSnapshot = userRef.get().get();
        
        EmployeeEntity userEntity = userSnapshot.toObject(EmployeeEntity.class);
    	return userEntity;
    }
    

    private UserDetails buildUserDetails(UserDetails userEntity) {
        Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("USER"));
        return new User(userEntity.getUsername(), userEntity.getPassword(), authorities);
    }
    
    private UserDetails buildAdminDetails(UserDetails userEntity) {
        Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ADMIN"));
        return new User(userEntity.getUsername(), userEntity.getPassword(), authorities);
    }
    
    private UserDetails buildEmployeeDetails(UserDetails userEntity) {
        Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("EMPLOYEE"));
        return new User(userEntity.getUsername(), userEntity.getPassword(), authorities);
    }

    public void changePassword(String username, String oldPassword, String newPassword, String confirmPassword) throws UsernameNotFoundException, IllegalArgumentException {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
            DocumentSnapshot userSnapshot = userRef.get().get();

            if (userSnapshot.exists()) {
                UserEntity userEntity = userSnapshot.toObject(UserEntity.class);
                if (!encoder.matches(oldPassword, userEntity.getPassword())) {
                    throw new IllegalArgumentException("Old password is incorrect");
                }
                userEntity.setPassword(encoder.encode(newPassword)); // Update password
                userRef.set(userEntity); // Save updated entity
            } else {
                DocumentReference employeeRef = dbFirestore.collection("tblemployee").document(username);
                DocumentSnapshot employeeSnapshot = employeeRef.get().get();

                if (employeeSnapshot.exists()) {
                    EmployeeEntity employeeEntity = employeeSnapshot.toObject(EmployeeEntity.class);
                    if (!encoder.matches(oldPassword, employeeEntity.getPassword())) {
                        throw new IllegalArgumentException("Old password is incorrect");
                    }
                    employeeEntity.setPassword(encoder.encode(newPassword)); // Update password
                    employeeRef.set(employeeEntity); // Save updated entity
                } else {
                    DocumentReference adminRef = dbFirestore.collection("tbladmin").document(username);
                    DocumentSnapshot adminSnapshot = adminRef.get().get();

                    if (adminSnapshot.exists()) {
                        AdminEntity adminEntity = adminSnapshot.toObject(AdminEntity.class);
                        if (!encoder.matches(oldPassword, adminEntity.getPassword())) {
                            throw new IllegalArgumentException("Old password is incorrect");
                        }
                        adminEntity.setPassword(encoder.encode(newPassword)); // Update password
                        adminRef.set(adminEntity); // Save updated entity
                    } else {
                        throw new UsernameNotFoundException("Username not found");
                    }
                }
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new UsernameNotFoundException("Failed to load user by username", e);
        }
    }
    
    
    public void forgotPassword(String username, String newPassword, String confirmPassword) throws UsernameNotFoundException, IllegalArgumentException {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
            DocumentSnapshot userSnapshot = userRef.get().get();

            if (userSnapshot.exists()) {
                UserEntity userEntity = userSnapshot.toObject(UserEntity.class);
                userEntity.setPassword(encoder.encode(newPassword)); // Update password
                userRef.set(userEntity); // Save updated entity
            } else {
                DocumentReference employeeRef = dbFirestore.collection("tblemployee").document(username);
                DocumentSnapshot employeeSnapshot = employeeRef.get().get();

                if (employeeSnapshot.exists()) {
                    EmployeeEntity employeeEntity = employeeSnapshot.toObject(EmployeeEntity.class);
                    employeeEntity.setPassword(encoder.encode(newPassword)); // Update password
                    employeeRef.set(employeeEntity); // Save updated entity
                } else {
                    DocumentReference adminRef = dbFirestore.collection("tbladmin").document(username);
                    DocumentSnapshot adminSnapshot = adminRef.get().get();

                    if (adminSnapshot.exists()) {
                        AdminEntity adminEntity = adminSnapshot.toObject(AdminEntity.class);
                        adminEntity.setPassword(encoder.encode(newPassword)); // Update password
                        adminRef.set(adminEntity); // Save updated entity
                    } else {
                        throw new UsernameNotFoundException("Username not found");
                    }
                }
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new UsernameNotFoundException("Failed to load user by username", e);
        }
    }
    
    //FOR DASHBOARD FUNCTIONS 
    public List<UserEntity> getAllUsers() {
        List<UserEntity> users = new ArrayList<>();
        try {
        	Firestore db = FirestoreClient.getFirestore();
            CollectionReference userCollection = db.collection("tbluser");
            userCollection.get().get().forEach(document -> {
            	users.add(document.toObject(UserEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return users;
    }
    
    public List<EmployeeEntity> getAllEmployees(){
    	 List<EmployeeEntity> employees = new ArrayList<>();
         try {
         	Firestore db = FirestoreClient.getFirestore();
             CollectionReference empCollection = db.collection("tblemployee");
             empCollection.get().get().forEach(document -> {
            	 employees.add(document.toObject(EmployeeEntity.class));
             });
         } catch (ApiException | InterruptedException | ExecutionException e) {
             e.printStackTrace();
         }
         return employees;
    }
    
    public List<AdminEntity> getAllAdmins(){
   	 List<AdminEntity> employees = new ArrayList<>();
        try {
        	Firestore db = FirestoreClient.getFirestore();
            CollectionReference empCollection = db.collection("tbladmin");
            empCollection.get().get().forEach(document -> {
           	 employees.add(document.toObject(AdminEntity.class));
            });
        } catch (ApiException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
        return employees;
   }
    
    public Response updateIsApprover(String username, boolean action) throws InterruptedException, ExecutionException {
    	Response res = new Response();
      	Firestore dbFirestore = FirestoreClient.getFirestore();
       	DocumentReference userRef = dbFirestore.collection("tblemployee").document(username);
       	userRef.update("isApprover", action);
       	res.setMessage("Employee Approverist = " + action);
       	res.setStatus("success");
      	return res;
      }
    
    public Response updateIsVerifier(String username, boolean action) throws InterruptedException, ExecutionException {
    	Response res = new Response();
      	Firestore dbFirestore = FirestoreClient.getFirestore();
       	DocumentReference userRef = dbFirestore.collection("tblemployee").document(username);
       	userRef.update("isVerifier", action);
       	res.setMessage("Employee Verifierist = " + action);
       	res.setStatus("success");
      	return res;
      }
    
    public String getRoleUser(String email) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        
        try {
            // Check in 'tbluser' collection
            DocumentReference userRef = dbFirestore.collection("tbluser").document(email);
            ApiFuture<DocumentSnapshot> future = userRef.get();
            DocumentSnapshot document = future.get();
            
            if (document.exists()) {
                String role = document.getString("role");
                return role;
            } else {
                // Check in 'tlbemployee' collection
                DocumentReference employeeRef = dbFirestore.collection("tblemployee").document(email);
                future = employeeRef.get();
                document = future.get();
                
                if (document.exists()) {
                    String role = document.getString("role");
                    return role;
                } else {
                    // Check in 'tbladmin' collection
                    DocumentReference adminRef = dbFirestore.collection("tbladmin").document(email);
                    future = adminRef.get();
                    document = future.get();
                    
                    if (document.exists()) {
                        String role = document.getString("role");
                        return role;
                    } else {
                        // Document does not exist in any collection
                        return null;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
//    
//    public Response setIsActive(String email) throws InterruptedException, ExecutionException {
//    
//    	Firestore dbFirestore = FirestoreClient.getFirestore();
//     	DocumentReference userRef = dbFirestore.collection("tbluser").document(username);
//     	userRef.update("isEnabled", true);
//     	res.sttawtaw
//    	return res;
//    }
    
    

}

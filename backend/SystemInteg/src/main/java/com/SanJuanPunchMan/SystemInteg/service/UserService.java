package com.SanJuanPunchMan.SystemInteg.service;

import java.util.Collection;
import java.util.Collections;
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
import com.SanJuanPunchMan.SystemInteg.entity.EmployeeEntity;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class UserService implements UserDetailsService {

    private PasswordEncoder encoder = new BCryptPasswordEncoder();

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
                UserDetails userDetails = buildUserDetails(userEntity);
                return userDetails;
            } else if (employeeSnapshot.exists()) {
                EmployeeEntity userEntity = employeeSnapshot.toObject(EmployeeEntity.class); // Log userEntity to verify mapping
                UserDetails userDetails = buildUserDetails(userEntity);
                return userDetails;
            } else {
                throw new UsernameNotFoundException("Username not found");
            }
        } catch (ApiException | InterruptedException | ExecutionException e) {
            throw new UsernameNotFoundException("Failed to load user by username", e);
        }
    }

    private UserDetails buildUserDetails(UserDetails userEntity) {
        Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("USER"));
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

    
    

}

package com.SanJuanPunchMan.SystemInteg.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import jakarta.annotation.PostConstruct;

@Service
public class FirebaseConfig {
	
	@PostConstruct
	public void configureFirebaseConnection() throws IOException {
		
		File file =   ResourceUtils.getFile("classpath:config/sanjuanpunchman-firebase-adminsdk-4591e-77aff3f979.json");
		FileInputStream serviceAccount = new FileInputStream(file);

		FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();
		
		FirebaseApp.initializeApp(options);

	}
}

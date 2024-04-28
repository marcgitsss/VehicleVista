package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.entity.AdminEntity;
import com.SanJuanPunchMan.SystemInteg.entity.AuthenticationResponse;
import com.SanJuanPunchMan.SystemInteg.entity.EmployeeEntity;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.SanJuanPunchMan.SystemInteg.service.AuthenticationService;
import com.google.firebase.auth.FirebaseAuthException;


@RequestMapping("/jwt")
@RestController
public class AuthenticationController {

	@Autowired
	private AuthenticationService authService;
	
	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody UserEntity request) throws InterruptedException, ExecutionException{
		return ResponseEntity.ok(authService.register(request));
	}
	
	@CrossOrigin
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> login(
			@RequestBody UserEntity request
			) throws FirebaseAuthException{
				return ResponseEntity.ok(authService.authenticate(request));
	}
	
	@CrossOrigin
	@PostMapping("/admin-register")
	public ResponseEntity<AuthenticationResponse> adminRegister(@RequestBody AdminEntity request) throws InterruptedException, ExecutionException{
		return ResponseEntity.ok(authService.adminRegister(request));
	}
	
	@CrossOrigin
	@PostMapping("/admin-login")
	public ResponseEntity<AuthenticationResponse> adminLogin(
			@RequestBody AdminEntity request
			) throws FirebaseAuthException{
				return ResponseEntity.ok(authService.adminAuthenticate(request));
	}
	
	@CrossOrigin
	@PostMapping("/employee-register")
	public ResponseEntity<AuthenticationResponse> employeeRegister(@RequestBody EmployeeEntity request) throws InterruptedException, ExecutionException{
		return ResponseEntity.ok(authService.employeeRegister(request));
	}
	
	@CrossOrigin
	@PostMapping("/employee-login")
	public ResponseEntity<AuthenticationResponse> employeeLogin(
			@RequestBody EmployeeEntity request
			) throws FirebaseAuthException{
				return ResponseEntity.ok(authService.employeeAuthentication(request));
	}
}

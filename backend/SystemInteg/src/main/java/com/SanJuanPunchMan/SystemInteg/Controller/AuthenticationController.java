package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.SanJuanPunchMan.SystemInteg.beans.DecodedJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.SanJuanPunchMan.SystemInteg.beans.ChangePasswordRequest;
import com.SanJuanPunchMan.SystemInteg.entity.AdminEntity;
import com.SanJuanPunchMan.SystemInteg.entity.AuthenticationResponse;
import com.SanJuanPunchMan.SystemInteg.entity.EmployeeEntity;
import com.SanJuanPunchMan.SystemInteg.entity.Response;
import com.SanJuanPunchMan.SystemInteg.entity.UserEntity;
import com.SanJuanPunchMan.SystemInteg.service.AuthenticationService;
import com.SanJuanPunchMan.SystemInteg.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;


@RequestMapping("/jwt")
@RestController
public class AuthenticationController {
	
	@Autowired
	private AuthenticationService authService;
	
	@Autowired
	private UserService userService;
	
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
	
	@PostMapping("/change-password")
    public ResponseEntity<String> changePassword(
        @RequestBody ChangePasswordRequest request) {
        try {
            userService.changePassword(request.getUsername(), request.getOldPassword(), request.getNewPassword(), request.getConfirmPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
	
	@PostMapping("/decode")
    public DecodedJwt decodeJwt(@RequestParam String token) {
        return authService.decodeJwt(token);
    }
	
//	@CrossOrigin
//	@GetMapping("/get-user")
//    public UserDetails getUserByUsername(@RequestParam String username) {
//        try {
//            return userService.loadUserByUsername(username);
//        } catch (UsernameNotFoundException e) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", e);
//        }
//    }
//	
	@CrossOrigin
	@GetMapping("/get-user")
    public ResponseEntity<UserEntity> getUserByUsername(@RequestParam String username) {
        try {
            UserEntity userEntity = userService.getUserByUsername(username);
            return ResponseEntity.ok(userEntity);
        } catch (InterruptedException | ExecutionException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/get-admin")
    public ResponseEntity<AdminEntity> getAdminByUsername(@RequestParam String username) {
        try {
            AdminEntity adminEntity = userService.getAdminByUsername(username);
            return ResponseEntity.ok(adminEntity);
        } catch (InterruptedException | ExecutionException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @CrossOrigin
    @GetMapping("/get-employee")
    public ResponseEntity<EmployeeEntity> getEmployeeByUsername(@RequestParam String username) {
        try {
            EmployeeEntity employeeEntity = userService.getEmployeeByUsername(username);
            return ResponseEntity.ok(employeeEntity);
        } catch (InterruptedException | ExecutionException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
	
	@CrossOrigin
	@GetMapping("/getallusers")
	public List<UserEntity> getAllUsers() {
		return userService.getAllUsers();
	} 
	
	@CrossOrigin
	@GetMapping("/getallemployee")
	public List<EmployeeEntity> getAllEmployees() {
		return userService.getAllEmployees();
	}
	
	@CrossOrigin
	@GetMapping("/getalladmins")
	public List<AdminEntity> getAllAdmins() {
		return userService.getAllAdmins();
	} 
	
	@CrossOrigin
	@PostMapping("/updateapprover")
	public Response updateIsApprover(@RequestParam String username, @RequestParam boolean action) throws InterruptedException, ExecutionException {
		return userService.updateIsApprover(username, action);
	}
	
	@CrossOrigin
	@PostMapping("/updateverifier")
	public Response updateIsVerifier(@RequestParam String username, @RequestParam boolean action) throws InterruptedException, ExecutionException {
		return userService.updateIsVerifier(username, action);
	}
	
	@CrossOrigin
	@PostMapping("/getrole")
	public String getRoleUser(@RequestParam String email) {
		return userService.getRoleUser(email);
	}
}

package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.beans.OTPCreateResponse;
import com.SanJuanPunchMan.SystemInteg.entity.OTPEntity;
import com.SanJuanPunchMan.SystemInteg.service.OTPService;
import com.SanJuanPunchMan.SystemInteg.service.UserService;

import jakarta.mail.MessagingException;

@RestController
public class OTPController {
	
	@Autowired
	OTPService otpService;
	
	@Autowired
	UserService userService;

	
	@PostMapping("/register/generateOtp/")
	public OTPCreateResponse createOTP(@RequestBody OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
		return otpService.createOTP(otp);
	}
	
	@PostMapping("/register/verifyOtp/")
	public String verifyOTP(@RequestBody OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
	    return otpService.verifyOTP(otp);
	}
	
	@PostMapping("/forgot-password/generate-otp")
	public OTPCreateResponse generateOTP(@RequestParam String email) throws InterruptedException, ExecutionException, MessagingException {
	    return otpService.createPasswordResetOTP(email);
	}

	@PostMapping("/forgot-password/verify-otp")
	public ResponseEntity<?> verifyOTP(@RequestParam String email, @RequestParam String otp) throws InterruptedException, ExecutionException {
	    boolean isOTPValid = otpService.verifyPasswordResetOTP(email, otp);
	    if (isOTPValid) {
	        return ResponseEntity.ok("OTP is valid");
	    } else {
	        return ResponseEntity.badRequest().body("OTP is invalid or has expired");
	    }
	}

	@PostMapping("/user/change-password")
	public ResponseEntity<String> changePassword(@RequestParam("username") String username,
	                                                 @RequestParam("oldPassword") String oldPassword,
	                                                 @RequestParam("newPassword") String newPassword,
	                                                 @RequestParam("confirmPassword") String confirmPassword) {
	        try {
	            userService.changePassword(username, oldPassword, newPassword, confirmPassword);
	            return ResponseEntity.ok("Password changed successfully");
	        } catch (UsernameNotFoundException | IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }

	 @PostMapping("/user/forgot-password")
	 public ResponseEntity<String> forgotPassword(@RequestParam("username") String username,
	                                              @RequestParam("newPassword") String newPassword,
	                                              @RequestParam("confirmPassword") String confirmPassword) {
	       try {
	            userService.forgotPassword(username, newPassword, confirmPassword);
	            return ResponseEntity.ok("Password reset successfully");
	       } catch (UsernameNotFoundException | IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	     }
	 }
}


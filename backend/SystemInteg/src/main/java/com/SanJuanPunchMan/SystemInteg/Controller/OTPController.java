package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.beans.OTPCreateResponse;
import com.SanJuanPunchMan.SystemInteg.entity.OTPEntity;
import com.SanJuanPunchMan.SystemInteg.service.OTPService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/register")
public class OTPController {
	
	@Autowired
	OTPService otpService;
	
	@PostMapping
	@RequestMapping("/generateOtp/")
	public OTPCreateResponse createOTP(@RequestBody OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
		return otpService.createOTP(otp);
	}
	
	@PostMapping
	@RequestMapping("/verifyOtp/")
	public String verifyOTP(@RequestBody OTPEntity otp) throws InterruptedException, ExecutionException, MessagingException {
	    return otpService.verifyOTP(otp);
	}
	
}

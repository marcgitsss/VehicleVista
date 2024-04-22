package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class OTPEntity {

	private String id;
    private String username;
    private String password;
    private String email;
    private String otp;
    private Date expirationDate;
    
	public OTPEntity() {
		super();
	}
	public OTPEntity(String id, String username, String password, String email, String otp, Date expirationDate) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.otp = otp;
		this.expirationDate = expirationDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public Date getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	
	
    
}

package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@SuppressWarnings("serial")
public class EmployeeEntity implements UserDetails{
	private int id;
	private String username;
	private String password;
	private String fname;
	private String mname;
	private String lname;
	private Boolean isVerifier;
	private Boolean isViewLogger;
	private Boolean isApprover;
	private Role role = Role.EMPLOYEE;
	
	public EmployeeEntity() {
		super();
	}
	public Boolean getIsVerifier() {
		return isVerifier;
	}

	public void setIsVerifier(Boolean isVerifier) {
		this.isVerifier = isVerifier;
	}
	
	public Boolean getIsViewLogger() {
		return isViewLogger;
	}
	public void setIsViewLogger(Boolean isViewLogger) {
		this.isViewLogger = isViewLogger;
	}
	public Boolean getIsApprover() {
		return isApprover;
	}
	public void setIsApprover(Boolean isApprover) {
		this.isApprover = isApprover;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return java.util.List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}

package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

@SuppressWarnings("serial")
public class UserEntity implements UserDetails {
	private String id;
	  private String username;
		private String password;
		private String fname;
		private String mname;
		private String lname;
		private String schoolId;
		private String schoolIdOwner;
		private Boolean isStaff;
		private String contactNumber;
		private String email;
		private String address;
		private Date dateApplied;
		private Date datePaid;
		private Boolean isEnabled;
		
		private Date expirationDate;

		private Boolean isPaid;
		private Boolean isVerified;
		private Boolean isApproved;
		
		private Role role;
		
		public UserEntity() {
			super();
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

		public String getSchoolId() {
			return schoolId;
		}

		public void setSchoolId(String schoolId) {
			this.schoolId = schoolId;
		}

		public String getSchoolIdOwner() {
			return schoolIdOwner;
		}

		public void setSchoolIdOwner(String schoolIdOwner) {
			this.schoolIdOwner = schoolIdOwner;
		}

		public Boolean getIsStaff() {
			return isStaff;
		}

		public void setIsStaff(Boolean isStaff) {
			this.isStaff = isStaff;
		}

		public String getContactNumber() {
			return contactNumber;
		}

		public void setContactNumber(String contactNumber) {
			this.contactNumber = contactNumber;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public Date getDateApplied() {
			return dateApplied;
		}

		public void setDateApplied(Date dateApplied) {
			this.dateApplied = dateApplied;
		}


		public Date getDatePaid() {
			return datePaid;
		}

		public void setDatePaid(Date datePaid) {
			this.datePaid = datePaid;
		}

		public Boolean getIsEnabled() {
			return isEnabled;
		}

		public void setIsEnabled(Boolean isEnabled) {
			this.isEnabled = isEnabled;
		}

		public void save() {
	        DatabaseReference ref = FirebaseDatabase.getInstance().getReference("users");
	        ref.child(id).setValue(this, null);
	    }

		public Role getRole() {
			return role;
		}

		public void setRole(Role usertype) {
			this.role = usertype;
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

		public Boolean getIsPaid() {
			return isPaid;
		}

		public void setIsPaid(Boolean isPaid) {
			this.isPaid = isPaid;
		}

		public Boolean getIsVerified() {
			return isVerified;
		}

		public void setIsVerified(Boolean isVerified) {
			this.isVerified = isVerified;
		}

		public Boolean getIsApproved() {
			return isApproved;
		}

		public void setIsApproved(Boolean isApproved) {
			this.isApproved = isApproved;
		}

		public Date getExpirationDate() {
			return expirationDate;
		}

		public void setExpirationDate(Date expirationDate) {
			this.expirationDate = expirationDate;
		}
		

}

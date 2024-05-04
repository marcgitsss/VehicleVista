package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class ApplicantEntity {
	private String email;
	private String applicantid;
    private String firstName;
	private String lastName;
    private String middleInitial;
    private String studentName;
    private String idNumber;
    private String gradeLevel;
    private String contactNumber;
    private String address;
    private Boolean isStaff;
    
    private String vehicleMake;
	private String plateNo;
	private String color;
	private Boolean isFourWheel;
	
	private String orcrimg;	//file path sa orcr img
	private String licenseimg;
	private String proofofpayment;
    
    private Date datesubmitted;
    private String dateDay;
    
    private boolean verified;
    private boolean approved;
    private boolean isPaid;
    
    public ApplicantEntity() {
    	super();
    	this.verified = false;
    	this.isPaid = false;
    	this.approved = false;
    	this.proofofpayment = null;
    	this.orcrimg = null;
    	this.licenseimg = null;
    }
    
	// Add getters and setters
    public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleInitial() {
		return middleInitial;
	}
	public void setMiddleInitial(String middleInitial) {
		this.middleInitial = middleInitial;
	}
	public String getIdNumber() {
		return idNumber;
	}
	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}
	public String getGradeLevel() {
		return gradeLevel;
	}
	public void setGradeLevel(String gradeLevel) {
		this.gradeLevel = gradeLevel;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getApplicantid() {
		return applicantid;
	}
	public void setApplicantid(String applicantid) {
		this.applicantid = applicantid;
	}
	public Date getDatesubmitted() {
		return datesubmitted;
	}
	public void setDatesubmitted(Date datesubmitted) {
		this.datesubmitted = datesubmitted;
	}
	public boolean getVerified() {
		return verified;
	}
	public void setVerified(boolean verified) {
		this.verified = verified;
	}
	public boolean isPaid() {
		return isPaid;
	}
	public void setPaid(boolean isPaid) {
		this.isPaid = isPaid;
	}
	public String getStudentName() {
		return studentName;
	}
	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}
	public boolean isApproved() {
		return approved;
	}
	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getVehicleMake() {
		return vehicleMake;
	}
	public void setVehicleMake(String vehicleMake) {
		this.vehicleMake = vehicleMake;
	}
	public String getPlateNo() {
		return plateNo;
	}
	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Boolean getVehicleType() {
		return isFourWheel;
	}
	public void setVehicleType(Boolean isFourWheel) {
		this.isFourWheel = isFourWheel;
	}
	public String getOrcrimg() {
		return orcrimg;
	}
	public void setOrcrimg(String orcrimg) {
		this.orcrimg = orcrimg;
	}
	public String getLicenseimg() {
		return licenseimg;
	}
	public void setLicenseimg(String licenseimg) {
		this.licenseimg = licenseimg;
	}

	public String getDateDay() {
		return dateDay;
	}

	public void setDateDay(String dateDay) {
		this.dateDay = dateDay;
	}

	public String getProofofpayment() {
		return proofofpayment;
	}

	public void setProofofpayment(String proofofpayment) {
		this.proofofpayment = proofofpayment;
	}

	public Boolean getIsFourWheel() {
		return isFourWheel;
	}

	public void setIsFourWheel(Boolean isFourWheel) {
		this.isFourWheel = isFourWheel;
	}





	public Boolean getIsStaff() {
		return isStaff;
	}





	public void setIsStaff(Boolean isStaff) {
		this.isStaff = isStaff;
	}
}

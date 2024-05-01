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
    
    private String vehicleMake;
	private String plateNo;
	private String color;
	private String vehicleType;
	private String orcrimg;	//file path sa orcr img
	private String licenseimg;
    
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
    }
    
    public ApplicantEntity(String email, String applicantid, String firstName, String lastName, String middleInitial,
			String studentName, String idNumber, String gradeLevel, String contactNumber, String address,
			String vehicleMake, String plateNo, String color, String vehicleType, String orcrimg, String licenseimg,
			Date datesubmitted, boolean verified, boolean approved, boolean isPaid) {
		super();
		this.email = email;
		this.applicantid = applicantid;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleInitial = middleInitial;
		this.studentName = studentName;
		this.idNumber = idNumber;
		this.gradeLevel = gradeLevel;
		this.contactNumber = contactNumber;
		this.address = address;
		this.vehicleMake = vehicleMake;
		this.plateNo = plateNo;
		this.color = color;
		this.vehicleType = vehicleType;
		this.orcrimg = orcrimg;
		this.licenseimg = licenseimg;
		this.datesubmitted = datesubmitted;
		this.verified = verified;
		this.approved = approved;
		this.isPaid = isPaid;
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
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
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
}

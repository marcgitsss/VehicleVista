package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Date;
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;

import org.springframework.stereotype.Component;

@Component
public class VehicleRegistered {
//	private String vehicleid;	
	private String username; //email rapud ni
	private String vehicleMake;
	private String plateNo;
	private String color;
	private int stickerId; //sticker number
	private Boolean isFourWheel;
	private String semYear;//kaning kung unsa na sem og S.Y
//	private Date expirationDate;
	private Date registeredDate;
	

	private Boolean isParking; 
//	private String applicantid; //foreign key for application
	
	public VehicleRegistered() {
        Date regDate = new Date();
        this.registeredDate = regDate;
    }
	
	public VehicleRegistered(String vehicleid, String username, String vehicleMake, String plateNo, String color,
			int stickerId, Boolean isFourWheel, String applicantid) {
		super();
//		this.vehicleid = vehicleid;
		this.username = username;
		this.vehicleMake = vehicleMake;
		this.plateNo = plateNo;
		this.color = color;
		this.stickerId = stickerId;
		this.isFourWheel = isFourWheel;
//		this.semYear = semYear;
//		this.expirationDate = expirationDate;
//		this.applicantid = applicantid;
	}
	
//	public String getId() {
//		return vehicleid;
//	}
//
//
//
//	public void setId(String vehicleid2) {
//		this.vehicleid = vehicleid2;
//	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
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



	public int getStickerId() {
		return stickerId;
	}



	public void setStickerId(int stickerId) {
		this.stickerId = stickerId;
	}



	public Boolean getisFourWheel() {
		return isFourWheel;
	}



	public void setisFourWheel(Boolean isFourWheel) {
		this.isFourWheel = isFourWheel;
	}



	public String getSemYear() {
		return semYear;
	}



	public void setSemYear(String semYear) {
		this.semYear = semYear;
	}



//	public Date getExpirationDate() {
//		return expirationDate;
//	}
//
//
//
//	public void setExpirationDate(Date expirationDate) {
//		this.expirationDate = expirationDate;
//	}



//	public String getApplicantid() {
//		return applicantid;
//	}
//
//
//
//	public void setApplicantid(String applicantid) {
//		this.applicantid = applicantid;
//	}

	public Date getRegisteredDate() {
		return registeredDate;
	}

	public void setRegisteredDate(Date registeredDate) {
		this.registeredDate = registeredDate;
	}


	public Boolean getIsParking() {
		return isParking;
	}

	public void setIsParking(Boolean isParking) {
		this.isParking = isParking;
	}

	
	
}

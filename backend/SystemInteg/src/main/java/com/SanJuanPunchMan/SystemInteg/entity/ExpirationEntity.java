package com.SanJuanPunchMan.SystemInteg.entity;

import java.util.Date;

public class ExpirationEntity {

	private int id;
	private Date studentExpirationDate;
    private Date staffExpirationDate;
    private String currentSemester;
    private String currentSchoolYear;
    
    
    public ExpirationEntity() {
    	this.studentExpirationDate = new Date();
    	this.staffExpirationDate = new Date();
    }
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getStudentExpirationDate() {
		return studentExpirationDate;
	}
	public void setStudentExpirationDate(Date studentExpirationDate) {
		this.studentExpirationDate = studentExpirationDate;
	}
	public Date getStaffExpirationDate() {
		return staffExpirationDate;
	}
	public void setStaffExpirationDate(Date staffExpirationDate) {
		this.staffExpirationDate = staffExpirationDate;
	}

	public String getCurrentSemester() {
		return currentSemester;
	}

	public void setCurrentSemester(String currentSemester) {
		this.currentSemester = currentSemester;
	}

	public String getCurrentSchoolYear() {
		return currentSchoolYear;
	}

	public void setCurrentSchoolYear(String currentSchoolYear) {
		this.currentSchoolYear = currentSchoolYear;
	}
}

package com.SanJuanPunchMan.SystemInteg.beans;

import java.util.*;

import org.springframework.stereotype.Component;

@Component
public class OTPCreateResponse {
	
	private String id;
	private Date updatedTime;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Date date) {
		this.updatedTime = date;
	}
	
}

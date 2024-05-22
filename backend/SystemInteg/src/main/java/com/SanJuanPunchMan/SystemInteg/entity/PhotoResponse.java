package com.SanJuanPunchMan.SystemInteg.entity;

import lombok.Data;

@Data
public class PhotoResponse {
	private int status;
	private String message;
	private String url;
	
	
	
	
	public PhotoResponse() {
		super();
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
}

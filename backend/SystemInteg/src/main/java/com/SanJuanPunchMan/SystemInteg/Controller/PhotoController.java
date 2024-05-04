package com.SanJuanPunchMan.SystemInteg.Controller;

import java.io.File;
import java.security.GeneralSecurityException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SanJuanPunchMan.SystemInteg.entity.PhotoResponse;
import com.SanJuanPunchMan.SystemInteg.service.PhotoService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/photo")
public class PhotoController {
	
	@Autowired
	private PhotoService service;
	
	@PostMapping("/gdrive-upload")
	public Object handleFileUpload(@RequestParam("image") MultipartFile file, @RequestParam("email") String email) throws IOException, GeneralSecurityException, IllegalStateException, java.io.IOException{
		 if (file.isEmpty()) {
	            return "FIle is empty";
	        }
	        File tempFile = File.createTempFile("temp", null);
	        file.transferTo(tempFile);
	        String res = service.uploadImageToDrive(tempFile, email);
	        System.out.println("Image URL: "+res);
	        return res;
	}
	
	
	//@TODO use the Link in Gdrive para makakita ang mga bebe bois sa axios
	@PostMapping("/gdrive-view")
    public String getViewOnlyLink(@RequestParam("fileName") String fileName) {
        return service.getViewOnlyLink(fileName);
    }
	
	
	
}

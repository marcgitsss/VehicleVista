package com.SanJuanPunchMan.SystemInteg.Controller;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.entity.ExpirationEntity;
import com.SanJuanPunchMan.SystemInteg.service.ExpirationService;

@RestController
@RequestMapping("/expiration")
public class ExpirationController {
	
	@Autowired
	private ExpirationService expirationService;

	@CrossOrigin
	@GetMapping("/get-expiration")
    public ExpirationEntity getExpiration() {
        try {
            return expirationService.getExpiration();
        } catch (Exception e) {
            // Handle exceptions appropriately
            e.printStackTrace();
            return null;
        }
    }
	
	@PostMapping("/update-student-expiration")
    public String updateStudentExpiration(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
        try {
        	
            return expirationService.updateStudentExpiration(expirationDate);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error updating student expiration";
        }
    }
	
	@PostMapping("/update-staff-expiration")
    public String updateStaffExpiration(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date expirationDate) {
        try {
            return expirationService.updateStaffExpiration(expirationDate);
        } catch (Exception e) {
            // Handle exceptions appropriately
        	return "Error updating staff expiration";
        }
    }
	
	@PostMapping("/update-school-year")
    public String updateSchoolYear(@RequestParam String schoolYear) {
        try {
            return expirationService.updateSchoolYear(schoolYear);
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update school year";
        }
    }
	
	@PostMapping("/update-semester")
    public String updateSemester(@RequestParam String semester) {
        try {
            return expirationService.updateSemester(semester);
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to update semester";
        }
    }
}

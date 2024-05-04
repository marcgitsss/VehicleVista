package com.SanJuanPunchMan.SystemInteg.Controller;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SanJuanPunchMan.SystemInteg.entity.ApplicantEntity;
import com.SanJuanPunchMan.SystemInteg.service.ApplicantService;


@RestController
@RequestMapping("/applicants")
public class ApplicantController {
	@Autowired
    private ApplicantService applicantService;

	@PostMapping("/register")
    public String insertApplicant(@RequestBody ApplicantEntity applicant) {
        return applicantService.registerApplicant(applicant);
    }
	
    @PostMapping("/uploadReq")
    public String uploadRequirementsApplicant(@RequestParam String email, @RequestParam("orcrimg") MultipartFile orcrimg, @RequestParam("licenseimg") MultipartFile licenseimg) throws IOException, GeneralSecurityException, IllegalStateException, java.io.IOException {
    	File tmpor = File.createTempFile("temp", null);
    	File tmpli = File.createTempFile("temp", null);
    	orcrimg.transferTo(tmpor);
    	licenseimg.transferTo(tmpli);
    	return applicantService.uploadRequirements(email, tmpor, tmpli);
    }
    
    @PostMapping("/uploadPay")
	public Object handleFileUpload(@RequestParam String email, @RequestParam("image") MultipartFile file) throws IOException, GeneralSecurityException, IllegalStateException, java.io.IOException{
		 if (file.isEmpty()) {
	            return "FIle is empty";
	        }
	        File tempFile = File.createTempFile("temp", null);
	        file.transferTo(tempFile);
	        String res = applicantService.uploadPaymentImageToDrive(tempFile, email);
	        System.out.println(res);
	        return res;
	}
    
    @GetMapping("/all")
    public List<ApplicantEntity> getAllApplicants() {
        return applicantService.getAllApplicants();
    }
    
    @GetMapping("/unverified")
    public List<ApplicantEntity> getUnverifiedApplicants() {
        return applicantService.getUnverifiedApplicants();
    }
    
    @GetMapping("/proofpayments")
    public List<ApplicantEntity> getPendingProofPayment() {
        return applicantService.getPendingProofPayment();
    }
    
    @GetMapping("/approval")
    public List<ApplicantEntity> getPendingApproval() {
        return applicantService.getPendingApproval();
    }
    
    @GetMapping("/{applicantid}")
    public ApplicantEntity getApplicantById(@PathVariable String applicantid) {
        return applicantService.getApplicantById(applicantid);
    }
    
    @PutMapping("/updatePreApprovedStatus/{applicantid}")
    public String updatePreApprovedStatus(@PathVariable String applicantid) {
        return applicantService.updateApplicant(applicantid);
    }
    
    @PutMapping("/updatePaidStatus/{applicantid}")
    public String updatePaidStatus(@PathVariable String applicantid) {
        return applicantService.updatePaidApplicant(applicantid);
    }
    
    @PutMapping("/approveApplicant/{applicantid}")
    public String approveApplicant(@PathVariable String applicantid) {
        return applicantService.approveApplicant(applicantid);
    }
}

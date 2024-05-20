package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
	@Autowired
	private DashboardService dserv;
	
	@GetMapping("/data")
	public Map<String, Long> getDashboardStatistics() {
		return dserv.getDashboardStatistics();
	}
}

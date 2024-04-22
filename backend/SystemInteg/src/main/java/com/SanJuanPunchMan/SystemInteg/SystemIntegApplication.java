package com.SanJuanPunchMan.SystemInteg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SystemIntegApplication {

	public static void main(String[] args) {
		SpringApplication.run(SystemIntegApplication.class, args);
		System.out.print("Running");
	}

}

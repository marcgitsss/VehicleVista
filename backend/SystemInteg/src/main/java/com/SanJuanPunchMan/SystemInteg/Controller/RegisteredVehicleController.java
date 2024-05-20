package com.SanJuanPunchMan.SystemInteg.Controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SanJuanPunchMan.SystemInteg.entity.Response;
import com.SanJuanPunchMan.SystemInteg.entity.VehicleRegistered;
import com.SanJuanPunchMan.SystemInteg.service.RegisteredVehicleService;

@RestController
@RequestMapping("/vehicles")
public class RegisteredVehicleController {
	@Autowired
    private RegisteredVehicleService vserv;

	@PostMapping("/register")
    public Response registerStickerVehicle(@RequestBody VehicleRegistered vehicle) throws InterruptedException, ExecutionException {
        return vserv.registerStickerVehicle(vehicle);
    }
	
	@GetMapping("/get-vehicle")
    public ResponseEntity<VehicleRegistered> getVehicleByUsername(@RequestParam String username) {
        try {
            VehicleRegistered vehicle = vserv.getVehicleByUsername(username);
            if (vehicle != null) {
                return ResponseEntity.ok(vehicle);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
	
	@GetMapping("/all")
    public ResponseEntity<List<VehicleRegistered>> getAllVehicles() {
        List<VehicleRegistered> vehicles = vserv.getAll();
        return ResponseEntity.ok(vehicles);
    }
}

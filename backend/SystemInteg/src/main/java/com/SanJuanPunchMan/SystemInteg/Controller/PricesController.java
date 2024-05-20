package com.SanJuanPunchMan.SystemInteg.Controller;

import com.SanJuanPunchMan.SystemInteg.entity.PricesEntity;
import com.SanJuanPunchMan.SystemInteg.service.PricesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/prices")
public class PricesController {

    @Autowired
    private PricesService pricesService;

    @PostMapping
    public ResponseEntity<String> savePrices(@RequestBody PricesEntity pricesEntity) {
        try {
            pricesService.savePrices(pricesEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body("Prices saved successfully");
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save prices");
        }
    }

    @CrossOrigin
    @GetMapping("/get-prices")
    public ResponseEntity<PricesEntity> getPrices() {
        try {
            PricesEntity prices = pricesService.getPrices();
            if (prices != null) {
                return ResponseEntity.ok(prices);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    

    @CrossOrigin
    @PutMapping("/update-student-prices")
    public ResponseEntity<String> updateStudentPrices(@RequestBody PricesEntity updatedPrices) {
        try {
            pricesService.updateStudentPrices(updatedPrices);
            return ResponseEntity.status(HttpStatus.OK).body("Student prices updated successfully");
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update student prices");
        }
    }

    @CrossOrigin
    @PutMapping("/update-staff-prices")
    public ResponseEntity<String> updateStaffPrices(@RequestBody PricesEntity updatedPrices) {
        try {
            pricesService.updateStaffPrices(updatedPrices);
            return ResponseEntity.status(HttpStatus.OK).body("Staff prices updated successfully");
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update staff prices");
        }
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrices(@PathVariable String id) {
        try {
            pricesService.deletePrices(id);
            return ResponseEntity.status(HttpStatus.OK).body("Prices deleted successfully");
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete prices");
        }
    }
}

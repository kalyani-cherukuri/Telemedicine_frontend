package com.telemedicine.controller;

import com.telemedicine.model.Prescription;
import com.telemedicine.service.PrescriptionService;
import com.telemedicine.repository.PrescriptionRepository;
import com.telemedicine.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionController(PrescriptionService prescriptionService, PrescriptionRepository prescriptionRepository) {
        this.prescriptionService = prescriptionService;
        this.prescriptionRepository = prescriptionRepository;
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @PostMapping
    public ResponseEntity<Prescription> issuePrescription(@RequestParam Long consultationId, @RequestParam Long doctorId, @RequestBody Prescription prescription) {
        return ResponseEntity.ok(prescriptionService.issuePrescription(consultationId, doctorId, prescription));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionRepository.findByPatientId(patientId));
    }

    @PutMapping("/{id}/dispense")
    public ResponseEntity<Prescription> dispensePrescription(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.dispensePrescription(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Prescription> cancelPrescription(@PathVariable Long id) {
        Prescription prescription = prescriptionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found"));
        prescription.setStatus(com.telemedicine.model.PrescriptionStatus.CANCELLED);
        return ResponseEntity.ok(prescriptionRepository.save(prescription));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadPrescription(@PathVariable Long id) {
        return ResponseEntity.ok("Dummy PDF content for Prescription " + id);
    }
}

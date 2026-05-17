package com.telemedicine.controller;

import com.telemedicine.dto.PrescriptionRequestDTO;
import com.telemedicine.dto.PrescriptionResponseDTO;
import com.telemedicine.security.CustomUserDetails;
import com.telemedicine.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @PostMapping
    public ResponseEntity<PrescriptionResponseDTO> issuePrescription(
            @Valid @RequestBody PrescriptionRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(prescriptionService.issuePrescription(requestDTO, userDetails.getId()));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PrescriptionResponseDTO>> getPrescriptionsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatient(patientId));
    }

    @PutMapping("/{id}/dispense")
    public ResponseEntity<PrescriptionResponseDTO> dispensePrescription(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.dispensePrescription(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<PrescriptionResponseDTO> cancelPrescription(@PathVariable Long id) {
        return ResponseEntity.ok(prescriptionService.cancelPrescription(id));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadPrescription(@PathVariable Long id) {
        return ResponseEntity.ok("Dummy PDF content for Prescription " + id);
    }
    @GetMapping
public ResponseEntity<List<PrescriptionResponseDTO>>
getAllPrescriptions() {

    return ResponseEntity.ok(
        prescriptionService.getAllPrescriptions()
    );
}
}

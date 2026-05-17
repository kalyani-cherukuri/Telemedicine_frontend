package com.telemedicine.controller;

import com.telemedicine.dto.MedicalRecordRequestDTO;
import com.telemedicine.dto.MedicalRecordResponseDTO;
import com.telemedicine.security.CustomUserDetails;
import com.telemedicine.service.MedicalRecordService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PreAuthorize("hasRole('DOCTOR')")
    @PostMapping(
        consumes = {
                "multipart/form-data"
        }
)
    public ResponseEntity<MedicalRecordResponseDTO> addMedicalRecord(
            @Valid @ModelAttribute MedicalRecordRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(medicalRecordService.addMedicalRecord(requestDTO, userDetails.getId()));
    }

    @PreAuthorize("#patientId == authentication.principal.id or hasRole('DOCTOR')")
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecordResponseDTO>> getMedicalRecordsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordsByPatient(patientId));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadMedicalRecord(@PathVariable Long id) {
        return ResponseEntity.ok("Dummy file content for Medical Record " + id);
    }
}

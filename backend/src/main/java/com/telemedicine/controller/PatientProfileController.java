package com.telemedicine.controller;

import com.telemedicine.dto.PatientProfileRequestDTO;
import com.telemedicine.dto.PatientProfileResponseDTO;
import com.telemedicine.security.CustomUserDetails;
import com.telemedicine.service.PatientProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient-profiles")
public class PatientProfileController {

    private final PatientProfileService patientProfileService;

    public PatientProfileController(PatientProfileService patientProfileService) {
        this.patientProfileService = patientProfileService;
    }

    @PostMapping
    public ResponseEntity<PatientProfileResponseDTO> createPatientProfile(
            @Valid @RequestBody PatientProfileRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(patientProfileService.createPatientProfile(requestDTO, userDetails.getId()));
    }
}

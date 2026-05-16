package com.telemedicine.controller;

import com.telemedicine.dto.DoctorProfileRequestDTO;
import com.telemedicine.dto.DoctorProfileResponseDTO;
import com.telemedicine.model.Specialization;
import com.telemedicine.security.CustomUserDetails;
import com.telemedicine.service.DoctorProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor-profiles")
public class DoctorProfileController {

    private final DoctorProfileService doctorProfileService;

    public DoctorProfileController(DoctorProfileService doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }

    @PostMapping
    public ResponseEntity<DoctorProfileResponseDTO> createDoctorProfile(
            @Valid @RequestBody DoctorProfileRequestDTO requestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(doctorProfileService.createDoctorProfile(requestDTO, userDetails.getId()));
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<DoctorProfileResponseDTO>> getDoctorsBySpecialization(@PathVariable Specialization specialization) {
        return ResponseEntity.ok(doctorProfileService.getDoctorsBySpecialization(specialization));
    }
}

package com.telemedicine.controller;

import com.telemedicine.dto.ConsultationRequestDTO;
import com.telemedicine.dto.ConsultationResponseDTO;
import com.telemedicine.model.Consultation;
import com.telemedicine.service.ConsultationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    @PostMapping
    public ResponseEntity<ConsultationResponseDTO> bookConsultation(@Valid @RequestBody ConsultationRequestDTO requestDTO) {
        return ResponseEntity.ok(consultationService.bookConsultation(requestDTO));
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<ConsultationResponseDTO> startConsultation(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.startConsultation(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ConsultationResponseDTO> completeConsultation(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(consultationService.completeConsultation(id, payload.get("diagnosis"), payload.get("notes")));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ConsultationResponseDTO> cancelConsultation(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.cancelConsultation(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ConsultationResponseDTO>> getPatientConsultations(@PathVariable Long patientId) {
        return ResponseEntity.ok(consultationService.getPatientConsultations(patientId));
    }
    
    
    @GetMapping
public ResponseEntity<List<ConsultationResponseDTO>>
getAllConsultations() {

    return ResponseEntity.ok(
        consultationService.getAllConsultations()
    );
}
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ConsultationResponseDTO>> getDoctorConsultations(@PathVariable Long doctorId) {
        return ResponseEntity.ok(consultationService.getDoctorConsultations(doctorId));
    }
}

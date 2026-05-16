package com.telemedicine.controller;

import com.telemedicine.model.Consultation;
import com.telemedicine.service.ConsultationService;
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
    public ResponseEntity<Consultation> bookConsultation(@RequestBody Consultation consultation) {
        return ResponseEntity.ok(consultationService.bookConsultation(consultation));
    }

    @PutMapping("/{id}/start")
    public ResponseEntity<Consultation> startConsultation(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.startConsultation(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Consultation> completeConsultation(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(consultationService.completeConsultation(id, payload.get("diagnosis"), payload.get("notes")));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Consultation> cancelConsultation(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.cancelConsultation(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Consultation>> getPatientConsultations(@PathVariable Long patientId) {
        return ResponseEntity.ok(consultationService.getPatientConsultations(patientId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Consultation>> getDoctorConsultations(@PathVariable Long doctorId) {
        return ResponseEntity.ok(consultationService.getDoctorConsultations(doctorId));
    }
}

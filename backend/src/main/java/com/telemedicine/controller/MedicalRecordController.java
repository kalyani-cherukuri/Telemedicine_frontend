package com.telemedicine.controller;

import com.telemedicine.model.MedicalRecord;
import com.telemedicine.service.MedicalRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> uploadMedicalRecord(@RequestBody MedicalRecord record) {
        return ResponseEntity.ok(medicalRecordService.createMedicalRecord(record));
    }

    @PreAuthorize("#patientId == authentication.principal.id or hasRole('DOCTOR')")
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getPatientRecords(@PathVariable Long patientId, @RequestParam Long accessedById) {
        return ResponseEntity.ok(medicalRecordService.getPatientRecords(patientId, accessedById));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<String> downloadMedicalRecord(@PathVariable Long id) {
        return ResponseEntity.ok("Dummy file content for Medical Record " + id);
    }
}

package com.telemedicine.controller;

import com.telemedicine.model.AccessLog;
import com.telemedicine.model.ConsultationActivityLog;
import com.telemedicine.repository.AccessLogRepository;
import com.telemedicine.repository.ConsultationActivityLogRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuditController {

    private final ConsultationActivityLogRepository consultationLogRepository;
    private final AccessLogRepository accessLogRepository;

    public AuditController(ConsultationActivityLogRepository consultationLogRepository, AccessLogRepository accessLogRepository) {
        this.consultationLogRepository = consultationLogRepository;
        this.accessLogRepository = accessLogRepository;
    }

    @GetMapping("/consultations/{id}/activity")
    public ResponseEntity<List<ConsultationActivityLog>> getConsultationActivity(@PathVariable Long id) {
        return ResponseEntity.ok(consultationLogRepository.findByConsultationId(id));
    }

    @GetMapping("/access-logs/patient/{patientId}")
    public ResponseEntity<List<AccessLog>> getPatientAccessLogs(@PathVariable Long patientId) {
        return ResponseEntity.ok(accessLogRepository.findByPatientId(patientId));
    }
}

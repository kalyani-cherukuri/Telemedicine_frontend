package com.telemedicine.service;

import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final AccessLogRepository accessLogRepository;
    private final UserRepository userRepository;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, AccessLogRepository accessLogRepository, UserRepository userRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.accessLogRepository = accessLogRepository;
        this.userRepository = userRepository;
    }

    public MedicalRecord createMedicalRecord(MedicalRecord record) {
        // Validation: file size must be <= 10MB
        // For REST, this is checked in the controller if MultipartFile is used. 
        // Here we just save the entity.
        if (record.getFileUrl() == null || record.getFileUrl().isEmpty()) {
            throw new BusinessException("File URL is mandatory.");
        }
        
        record.setRecordedAt(LocalDateTime.now());
        return medicalRecordRepository.save(record);
    }

    public List<MedicalRecord> getPatientRecords(Long patientId, Long accessedById) {
        User patient = userRepository.findById(patientId).orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        User accessor = userRepository.findById(accessedById).orElseThrow(() -> new ResourceNotFoundException("Accessor not found"));
        
        // Log access
        AccessLog log = new AccessLog();
        log.setPatient(patient);
        log.setAccessedBy(accessor);
        log.setAccessType("VIEW_EHR");
        log.setAccessedAt(LocalDateTime.now());
        accessLogRepository.save(log);

        return medicalRecordRepository.findByPatientId(patientId);
    }
}

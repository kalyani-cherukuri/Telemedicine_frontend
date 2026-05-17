package com.telemedicine.service;

import com.telemedicine.dto.DtoMapper;
import com.telemedicine.dto.MedicalRecordRequestDTO;
import com.telemedicine.dto.MedicalRecordResponseDTO;
import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final AccessLogRepository accessLogRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;

    public MedicalRecordService(MedicalRecordRepository medicalRecordRepository, 
                               AccessLogRepository accessLogRepository, 
                               UserRepository userRepository,
                               DtoMapper dtoMapper) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.accessLogRepository = accessLogRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public MedicalRecordResponseDTO addMedicalRecord(MedicalRecordRequestDTO request, Long doctorId) {
        User patient = userRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new BusinessException("Only DOCTORs can record medical records.");
        }

        MedicalRecord record = dtoMapper.toEntity(request, patient, doctor);
        MedicalRecord saved = medicalRecordRepository.save(record);
        
        return dtoMapper.toDto(saved);
    }

    @Transactional
    public List<MedicalRecordResponseDTO> getMedicalRecordsByPatient(Long patientId) {
        User patient = userRepository.findById(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        
        List<MedicalRecord> records = medicalRecordRepository.findByPatientId(patientId);
        
        return records.stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
    }
}

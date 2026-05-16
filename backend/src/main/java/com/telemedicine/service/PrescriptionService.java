package com.telemedicine.service;

import com.telemedicine.dto.*;
import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;

    public PrescriptionService(PrescriptionRepository prescriptionRepository, 
                               ConsultationRepository consultationRepository, 
                               UserRepository userRepository,
                               DtoMapper dtoMapper) {
        this.prescriptionRepository = prescriptionRepository;
        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public PrescriptionResponseDTO issuePrescription(PrescriptionRequestDTO request, Long doctorId) {
        Consultation consultation = consultationRepository.findById(request.getConsultationId())
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));
        
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new BusinessException("Only DOCTORs can issue prescriptions.");
        }
        
        if (consultation.getStatus() != ConsultationStatus.COMPLETED) {
            throw new BusinessException("Can only be issued after a COMPLETED consultation.");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BusinessException("Must contain at least 1 medicine.");
        }

        Prescription prescription = dtoMapper.toEntity(request, consultation, consultation.getPatient(), doctor);
        
        List<PrescriptionItem> items = request.getItems().stream()
                .map(itemDto -> dtoMapper.toEntity(itemDto, prescription))
                .collect(Collectors.toList());
        
        prescription.setItems(items);

        Prescription saved = prescriptionRepository.save(prescription);
        return dtoMapper.toDto(saved);
    }

    @Transactional
    public List<PrescriptionResponseDTO> getPrescriptionsByPatient(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId).stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public PrescriptionResponseDTO dispensePrescription(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));

        if (prescription.getStatus() != PrescriptionStatus.ACTIVE) {
            throw new BusinessException("Prescription is not active and cannot be dispensed.");
        }
        
        prescription.setStatus(PrescriptionStatus.DISPENSED);
        Prescription saved = prescriptionRepository.save(prescription);
        return dtoMapper.toDto(saved);
    }

    @Transactional
    public PrescriptionResponseDTO cancelPrescription(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));

        if (prescription.getStatus() != PrescriptionStatus.ACTIVE) {
            throw new BusinessException("Only active prescriptions can be cancelled.");
        }
        
        prescription.setStatus(PrescriptionStatus.CANCELLED);
        Prescription saved = prescriptionRepository.save(prescription);
        return dtoMapper.toDto(saved);
    }
public List<PrescriptionResponseDTO>
getAllPrescriptions() {

    List<Prescription> prescriptions =
        prescriptionRepository.findAll();

    return prescriptions.stream()
        .map(dtoMapper::toDto)
        .toList();
}
}

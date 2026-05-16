package com.telemedicine.service;

import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository, ConsultationRepository consultationRepository, UserRepository userRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Prescription issuePrescription(Long consultationId, Long doctorId, Prescription prescription) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));
        
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (doctor.getRole() != Role.DOCTOR) {
            throw new BusinessException("Only DOCTORs can issue prescriptions.");
        }
        
        if (consultation.getStatus() != ConsultationStatus.COMPLETED) {
            throw new BusinessException("Can only be issued after a COMPLETED consultation.");
        }

        if (prescription.getItems() == null || prescription.getItems().isEmpty()) {
            throw new BusinessException("Must contain at least 1 medicine.");
        }
        
        if (prescription.getDigitalSignature() == null || prescription.getDigitalSignature().isEmpty()) {
            throw new BusinessException("Digital signature is mandatory for validity.");
        }

        prescription.setConsultation(consultation);
        prescription.setPatient(consultation.getPatient());
        prescription.setDoctor(doctor);
        prescription.setIssuedAt(LocalDateTime.now());
        prescription.setValidUntil(LocalDateTime.now().plusDays(30)); // Valid for 30 days
        prescription.setStatus(PrescriptionStatus.ACTIVE);

        // Link items
        prescription.getItems().forEach(item -> item.setPrescription(prescription));

        return prescriptionRepository.save(prescription);
    }

    @Transactional
    public Prescription dispensePrescription(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found"));

        if (prescription.getStatus() != PrescriptionStatus.ACTIVE) {
            throw new BusinessException("Prescription is not active and cannot be dispensed.");
        }
        
        prescription.setStatus(PrescriptionStatus.DISPENSED);
        return prescriptionRepository.save(prescription);
    }
}

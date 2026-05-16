package com.telemedicine.service;

import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;

@Service
public class ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final UserRepository userRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final ConsultationActivityLogRepository logRepository;

    public ConsultationService(ConsultationRepository consultationRepository, UserRepository userRepository,
                               PatientProfileRepository patientProfileRepository, ConsultationActivityLogRepository logRepository) {
        this.consultationRepository = consultationRepository;
        this.userRepository = userRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.logRepository = logRepository;
    }

    @Transactional
    public Consultation bookConsultation(Consultation consultation) {
        User patient = userRepository.findById(consultation.getPatient().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found"));
        User doctor = userRepository.findById(consultation.getDoctor().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (patient.getRole() != Role.PATIENT) throw new BusinessException("Only PATIENTs can book");
        if (doctor.getRole() != Role.DOCTOR) throw new BusinessException("Target user is not a DOCTOR");

        PatientProfile profile = patientProfileRepository.findById(patient.getId())
                .orElseThrow(() -> new BusinessException("Patient profile missing, please complete registration"));

        int age = Period.between(profile.getDateOfBirth(), LocalDate.now()).getYears();
        if (age < 0 || age > 120) throw new BusinessException("Patient age must be between 0-120 years.");
        if (age < 18) throw new BusinessException("Patients must be >= 18 years old for self-booking.");

        consultation.setPatient(patient);
        consultation.setDoctor(doctor);
        consultation.setStatus(ConsultationStatus.SCHEDULED);
        if (consultation.getStartedAt() == null) {
            consultation.setStartedAt(LocalDateTime.now().plusDays(1)); // dummy default
        }
        consultation.setEndedAt(consultation.getStartedAt().plusMinutes(30)); // Default duration 30 mins

        Consultation saved = consultationRepository.save(consultation);
        logActivity(saved, null, ConsultationStatus.SCHEDULED);
        return saved;
    }

    @Transactional
    public Consultation startConsultation(Long id) {
        Consultation consultation = getById(id);
        if (consultation.getStatus() != ConsultationStatus.SCHEDULED) {
            throw new BusinessException("Must be SCHEDULED before transitioning to IN_PROGRESS");
        }
        consultation.setStatus(ConsultationStatus.IN_PROGRESS);
        Consultation saved = consultationRepository.save(consultation);
        logActivity(saved, ConsultationStatus.SCHEDULED, ConsultationStatus.IN_PROGRESS);
        return saved;
    }

    @Transactional
    public Consultation completeConsultation(Long id, String diagnosis, String notes) {
        Consultation consultation = getById(id);
        if (consultation.getStatus() == ConsultationStatus.COMPLETED) {
            throw new BusinessException("COMPLETED consultations cannot be modified.");
        }
        if (consultation.getStatus() != ConsultationStatus.IN_PROGRESS) {
            throw new BusinessException("Consultation must be IN_PROGRESS to complete.");
        }
        consultation.setStatus(ConsultationStatus.COMPLETED);
        consultation.setDiagnosis(diagnosis);
        consultation.setNotes(notes);
        Consultation saved = consultationRepository.save(consultation);
        logActivity(saved, ConsultationStatus.IN_PROGRESS, ConsultationStatus.COMPLETED);
        return saved;
    }

    @Transactional
    public Consultation cancelConsultation(Long id) {
        Consultation consultation = getById(id);
        if (consultation.getStatus() == ConsultationStatus.COMPLETED) {
            throw new BusinessException("COMPLETED consultations cannot be modified.");
        }
        ConsultationStatus oldStatus = consultation.getStatus();
        consultation.setStatus(ConsultationStatus.CANCELLED);
        Consultation saved = consultationRepository.save(consultation);
        logActivity(saved, oldStatus, ConsultationStatus.CANCELLED);
        return saved;
    }

    public List<Consultation> getPatientConsultations(Long patientId) {
        return consultationRepository.findByPatientId(patientId);
    }

    public List<Consultation> getDoctorConsultations(Long doctorId) {
        return consultationRepository.findByDoctorId(doctorId);
    }

    private Consultation getById(Long id) {
        return consultationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Consultation not found"));
    }

    private void logActivity(Consultation consultation, ConsultationStatus oldStatus, ConsultationStatus newStatus) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(currentEmail).orElse(consultation.getPatient()); // Fallback for simplicity

        ConsultationActivityLog log = new ConsultationActivityLog();
        log.setConsultation(consultation);
        log.setOldStatus(oldStatus);
        log.setNewStatus(newStatus);
        log.setChangedAt(LocalDateTime.now());
        log.setChangedBy(user);
        logRepository.save(log);
    }
}

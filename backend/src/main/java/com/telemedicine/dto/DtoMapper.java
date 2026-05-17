package com.telemedicine.dto;

import com.telemedicine.model.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Component
public class DtoMapper {

    public Consultation toEntity(ConsultationRequestDTO dto, User patient, User doctor) {
        Consultation consultation = new Consultation();
        consultation.setPatient(patient);
        consultation.setDoctor(doctor);
        consultation.setConsultationType(dto.type());
        consultation.setSymptoms(dto.symptoms());
        return consultation;
    }

    public ConsultationResponseDTO toDto(Consultation entity) {
        if (entity == null) {
            return null;
        }
        
        Long patientId = (entity.getPatient() != null) ? entity.getPatient().getId() : null;
        Long doctorId = (entity.getDoctor() != null) ? entity.getDoctor().getId() : null;

        return new ConsultationResponseDTO(
                entity.getId(),
                patientId,
                doctorId,
                entity.getConsultationType(),
                entity.getSymptoms(),
                entity.getDiagnosis(),
                entity.getNotes(),
                entity.getStartedAt(),
                entity.getEndedAt(),
                entity.getStatus(),
                entity.getFollowUpRequired()
        );
    }

    public MedicalRecord toEntity(MedicalRecordRequestDTO dto, User patient, User recordedBy) {
        MedicalRecord record = new MedicalRecord();
        record.setPatient(patient);
        record.setRecordedBy(recordedBy);
        record.setRecordType(dto.getRecordType());
        record.setTitle(dto.getTitle());
        record.setDescription(dto.getDescription());
        record.setFileUrl(dto.getFile()
               .getOriginalFilename());
        record.setRecordedAt(LocalDateTime.now());
        return record;
    }

    public MedicalRecordResponseDTO toDto(MedicalRecord entity) {
        if (entity == null) return null;
        return new MedicalRecordResponseDTO(
                entity.getId(),
                entity.getPatient().getId(),
                entity.getRecordType().name(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getFileUrl(),
                entity.getRecordedBy().getId(),
                entity.getRecordedAt()
        );
    }

    public Prescription toEntity(PrescriptionRequestDTO dto, Consultation consultation, User patient, User doctor) {
        Prescription prescription = new Prescription();
        prescription.setConsultation(consultation);
        prescription.setPatient(patient);
        prescription.setDoctor(doctor);
        prescription.setIssuedAt(LocalDateTime.now());
        prescription.setValidUntil(LocalDateTime.now().plusMonths(1));
        prescription.setStatus(PrescriptionStatus.ACTIVE);
        prescription.setDigitalSignature("SIG-" + doctor.getName().toUpperCase().replaceAll(" ", "_"));
        return prescription;
    }

    public PrescriptionItem toEntity(PrescriptionItemRequestDTO dto, Prescription prescription) {
        PrescriptionItem item = new PrescriptionItem();
        item.setPrescription(prescription);
        item.setMedicineName(dto.getMedicineName());
        item.setDosage(dto.getDosage());
        item.setFrequency(dto.getFrequency());
        item.setInstructions(dto.getInstructions());
        // Note: PrescriptionItem model might need duration field if it doesn't exist
        return item;
    }

    public PrescriptionResponseDTO toDto(Prescription entity) {
        if (entity == null) return null;
        return new PrescriptionResponseDTO(
                entity.getId(),
                entity.getConsultation().getId(),
                entity.getPatient().getId(),
                entity.getDoctor().getId(),
                entity.getIssuedAt(),
                entity.getValidUntil(),
                entity.getStatus().name(),
                entity.getDigitalSignature(),
                entity.getItems().stream().map(this::toDto).collect(Collectors.toList())
        );
    }

    public PrescriptionItemResponseDTO toDto(PrescriptionItem entity) {
        if (entity == null) return null;
        return new PrescriptionItemResponseDTO(
                entity.getId(),
                entity.getMedicineName(),
                entity.getDosage(),
                entity.getFrequency(),
                "", // duration placeholder
                entity.getInstructions()
        );
    }

    public PatientProfile toEntity(PatientProfileRequestDTO dto, User user) {
        PatientProfile profile = new PatientProfile();
        profile.setUser(user);
        profile.setDateOfBirth(dto.getDateOfBirth());
        profile.setGender(dto.getGender());
        profile.setBloodGroup(dto.getBloodGroup());
        profile.setEmergencyContact(dto.getEmergencyContact());
        profile.setAllergies(dto.getAllergies());
        profile.setChronicConditions(dto.getChronicConditions());
        return profile;
    }

    public PatientProfileResponseDTO toDto(PatientProfile entity) {
        if (entity == null) return null;
        return new PatientProfileResponseDTO(
                entity.getId(),
                entity.getUser().getId(),
                entity.getDateOfBirth(),
                entity.getGender(),
                entity.getBloodGroup(),
                entity.getEmergencyContact(),
                entity.getAllergies(),
                entity.getChronicConditions()
        );
    }

    public DoctorProfile toEntity(DoctorProfileRequestDTO dto, User user) {
        DoctorProfile profile = new DoctorProfile();
        profile.setUser(user);
        profile.setSpecialization(dto.getSpecialization());
        profile.setQualification(dto.getQualification());
        profile.setLicenseNumber(dto.getLicenseNumber());
        profile.setConsultationFee(dto.getConsultationFee());
        profile.setYearsOfExperience(dto.getYearsOfExperience());
        return profile;
    }

    public DoctorProfileResponseDTO toDto(DoctorProfile entity) {
        if (entity == null) return null;
        return new DoctorProfileResponseDTO(
                entity.getId(),
                entity.getUser().getId(),
                entity.getSpecialization(),
                entity.getQualification(),
                entity.getLicenseNumber(),
                entity.getConsultationFee(),
                entity.getYearsOfExperience()
        );
    }
}

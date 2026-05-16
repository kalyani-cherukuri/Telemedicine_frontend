package com.telemedicine.dto;

import com.telemedicine.model.Consultation;
import com.telemedicine.model.MedicalRecord;
import com.telemedicine.model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

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
        record.setFileUrl(dto.getFileUrl());
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
}

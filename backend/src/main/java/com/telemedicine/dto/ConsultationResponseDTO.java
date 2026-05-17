package com.telemedicine.dto;

import com.telemedicine.model.ConsultationStatus;
import com.telemedicine.model.ConsultationType;

import java.time.LocalDateTime;

public record ConsultationResponseDTO(
        Long id,
        Long patientId,
        Long doctorId,
        ConsultationType type,
        String symptoms,
        String diagnosis,
        String notes,
        LocalDateTime startedAt,
        LocalDateTime endedAt,
        ConsultationStatus status,
        Boolean followUpRequired
) {}

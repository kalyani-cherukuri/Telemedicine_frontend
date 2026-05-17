package com.telemedicine.dto;

import java.time.LocalDateTime;

import com.telemedicine.model.ConsultationType;
import jakarta.validation.constraints.NotNull;

public record ConsultationRequestDTO(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        @NotNull ConsultationType type,
        @NotNull LocalDateTime scheduledAt,
        String symptoms,
        String diagnosis,
        String notes,
        Boolean followUpRequired
) {}

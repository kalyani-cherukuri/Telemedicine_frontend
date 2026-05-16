package com.telemedicine.dto;

import com.telemedicine.model.ConsultationType;
import jakarta.validation.constraints.NotNull;

public record ConsultationRequestDTO(
        @NotNull Long patientId,
        @NotNull Long doctorId,
        @NotNull ConsultationType type,
        String symptoms,
        String diagnosis,
        String notes,
        Boolean followUpRequired
) {}

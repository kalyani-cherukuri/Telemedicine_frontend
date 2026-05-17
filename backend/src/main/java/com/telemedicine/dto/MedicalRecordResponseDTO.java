package com.telemedicine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordResponseDTO {
    private Long id;
    private Long patientId;
    private String recordType;
    private String title;
    private String description;
    private String fileUrl;
    private Long recordedById;
    private LocalDateTime recordedAt;
}

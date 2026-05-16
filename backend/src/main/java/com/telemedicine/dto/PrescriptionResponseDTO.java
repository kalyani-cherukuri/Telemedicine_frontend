package com.telemedicine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponseDTO {
    private Long id;
    private Long consultationId;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime issuedAt;
    private LocalDateTime validUntil;
    private String status;
    private String digitalSignature;
    private List<PrescriptionItemResponseDTO> items;
}

package com.telemedicine.dto;

import com.telemedicine.model.Specialization;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorProfileResponseDTO {
    private Long id;
    private Long userId;
    private Specialization specialization;
    private String qualification;
    private String licenseNumber;
    private BigDecimal consultationFee;
    private Integer yearsOfExperience;
}

package com.telemedicine.dto;

import com.telemedicine.model.RecordType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecordRequestDTO {

    @NotNull
    private Long patientId;

    @NotNull
    private RecordType recordType;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private MultipartFile file;
}
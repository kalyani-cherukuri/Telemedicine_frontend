package com.telemedicine.service;

import com.telemedicine.dto.DtoMapper;
import com.telemedicine.dto.PatientProfileRequestDTO;
import com.telemedicine.dto.PatientProfileResponseDTO;
import com.telemedicine.model.PatientProfile;
import com.telemedicine.model.Role;
import com.telemedicine.model.User;
import com.telemedicine.repository.PatientProfileRepository;
import com.telemedicine.repository.UserRepository;
import com.telemedicine.exception.BusinessException;
import com.telemedicine.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PatientProfileService {

    private final PatientProfileRepository patientProfileRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;

    public PatientProfileService(PatientProfileRepository patientProfileRepository, 
                                UserRepository userRepository,
                                DtoMapper dtoMapper) {
        this.patientProfileRepository = patientProfileRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public PatientProfileResponseDTO createPatientProfile(PatientProfileRequestDTO request, Long authenticatedUserId) {
        User user = userRepository.findById(authenticatedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != Role.PATIENT) {
            throw new BusinessException("Only users with role PATIENT can create a patient profile");
        }

        // Check if profile already exists
        if (patientProfileRepository.findById(authenticatedUserId).isPresent()) {
            throw new BusinessException("Patient profile already exists for this user");
        }

        PatientProfile profile = dtoMapper.toEntity(request, user);
        PatientProfile saved = patientProfileRepository.save(profile);
        
        return dtoMapper.toDto(saved);
    }
}

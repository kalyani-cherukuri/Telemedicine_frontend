package com.telemedicine.service;

import com.telemedicine.dto.DtoMapper;
import com.telemedicine.dto.DoctorProfileRequestDTO;
import com.telemedicine.dto.DoctorProfileResponseDTO;
import com.telemedicine.model.DoctorProfile;
import com.telemedicine.model.Role;
import com.telemedicine.model.Specialization;
import com.telemedicine.model.User;
import com.telemedicine.repository.DoctorProfileRepository;
import com.telemedicine.repository.UserRepository;
import com.telemedicine.exception.BusinessException;
import com.telemedicine.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorProfileService {

    private final DoctorProfileRepository doctorProfileRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;

    public DoctorProfileService(DoctorProfileRepository doctorProfileRepository, 
                               UserRepository userRepository,
                               DtoMapper dtoMapper) {
        this.doctorProfileRepository = doctorProfileRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    @Transactional
    public DoctorProfileResponseDTO createDoctorProfile(DoctorProfileRequestDTO request, Long authenticatedUserId) {
        User user = userRepository.findById(authenticatedUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (user.getRole() != Role.DOCTOR) {
            throw new BusinessException("Only users with role DOCTOR can create a doctor profile");
        }

        // Check if profile already exists
        if (doctorProfileRepository.findById(authenticatedUserId).isPresent()) {
            throw new BusinessException("Doctor profile already exists for this user");
        }

        DoctorProfile profile = dtoMapper.toEntity(request, user);
        DoctorProfile saved = doctorProfileRepository.save(profile);
        
        return dtoMapper.toDto(saved);
    }

    public List<DoctorProfileResponseDTO> getDoctorsBySpecialization(Specialization specialization) {
        return doctorProfileRepository.findBySpecialization(specialization).stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
    }
}

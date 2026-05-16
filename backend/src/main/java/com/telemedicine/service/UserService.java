package com.telemedicine.service;

import com.telemedicine.model.*;
import com.telemedicine.repository.*;
import com.telemedicine.exception.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final DoctorProfileRepository doctorProfileRepository;

    public UserService(UserRepository userRepository, PatientProfileRepository patientProfileRepository, DoctorProfileRepository doctorProfileRepository) {
        this.userRepository = userRepository;
        this.patientProfileRepository = patientProfileRepository;
        this.doctorProfileRepository = doctorProfileRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public PatientProfile createPatientProfile(PatientProfile profile) {
        if (profile.getUser() == null || profile.getUser().getId() == null) {
            throw new BusinessException("User ID is required for profile");
        }
        User user = userRepository.findById(profile.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getRole() != Role.PATIENT) {
            throw new BusinessException("User is not a PATIENT");
        }
        profile.setUser(user);
        return patientProfileRepository.save(profile);
    }

    public DoctorProfile createDoctorProfile(DoctorProfile profile) {
        if (profile.getUser() == null || profile.getUser().getId() == null) {
            throw new BusinessException("User ID is required for profile");
        }
        User user = userRepository.findById(profile.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getRole() != Role.DOCTOR) {
            throw new BusinessException("User is not a DOCTOR");
        }
        profile.setUser(user);
        return doctorProfileRepository.save(profile);
    }
    
    public List<DoctorProfile> getDoctorsBySpecialization(Specialization specialization) {
        return doctorProfileRepository.findBySpecialization(specialization);
    }
}

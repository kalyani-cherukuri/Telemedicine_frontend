package com.telemedicine.controller;

import com.telemedicine.model.DoctorProfile;
import com.telemedicine.model.PatientProfile;
import com.telemedicine.model.Role;
import com.telemedicine.model.Specialization;
import com.telemedicine.model.User;
import com.telemedicine.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false) Role role) {
        if (role != null) {
            return ResponseEntity.ok(userService.getUsersByRole(role));
        }
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/patient-profiles")
    public ResponseEntity<PatientProfile> createPatientProfile(@RequestBody PatientProfile profile) {
        return ResponseEntity.ok(userService.createPatientProfile(profile));
    }

    @PostMapping("/doctor-profiles")
    public ResponseEntity<DoctorProfile> createDoctorProfile(@RequestBody DoctorProfile profile) {
        return ResponseEntity.ok(userService.createDoctorProfile(profile));
    }

    @GetMapping("/doctor-profiles/specialization/{specialization}")
    public ResponseEntity<List<DoctorProfile>> getDoctorsBySpecialization(@PathVariable Specialization specialization) {
        return ResponseEntity.ok(userService.getDoctorsBySpecialization(specialization));
    }
}

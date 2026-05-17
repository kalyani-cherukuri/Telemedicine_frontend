package com.telemedicine.repository;

import com.telemedicine.model.DoctorProfile;
import com.telemedicine.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {
    List<DoctorProfile> findBySpecialization(Specialization specialization);
}

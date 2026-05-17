package com.telemedicine.repository;

import com.telemedicine.model.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    
    List<Consultation> findByPatientId(Long patientId);
    
    List<Consultation> findByDoctorId(Long doctorId);

    // JOIN Query Requirement
    @Query("SELECT c FROM Consultation c JOIN FETCH c.patient JOIN FETCH c.doctor LEFT JOIN FETCH c.prescription WHERE c.id = :id")
    Optional<Consultation> findByIdWithDetails(@Param("id") Long id);

    // Aggregate Query Requirement
    @Query(value = "SELECT COUNT(*) FROM consultations c WHERE c.doctor_id = :doctorId AND MONTH(c.started_at) = :month AND YEAR(c.started_at) = :year", nativeQuery = true)
    Long countConsultationsByDoctorAndMonth(@Param("doctorId") Long doctorId, @Param("month") int month, @Param("year") int year);
}

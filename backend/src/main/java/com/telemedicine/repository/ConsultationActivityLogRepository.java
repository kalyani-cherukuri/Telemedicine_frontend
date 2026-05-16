package com.telemedicine.repository;

import com.telemedicine.model.ConsultationActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ConsultationActivityLogRepository extends JpaRepository<ConsultationActivityLog, Long> {
    List<ConsultationActivityLog> findByConsultationId(Long consultationId);
}

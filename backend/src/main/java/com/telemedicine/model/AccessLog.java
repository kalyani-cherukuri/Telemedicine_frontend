package com.telemedicine.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "access_logs")
public class AccessLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accessed_by_id", nullable = false)
    private User accessedBy;

    @Column(nullable = false)
    private String accessType; // e.g., "VIEW_EHR", "DOWNLOAD_RECORD"

    @Column(nullable = false)
    private LocalDateTime accessedAt;
}

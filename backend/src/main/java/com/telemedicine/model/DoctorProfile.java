package com.telemedicine.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "doctor_profiles")
public class DoctorProfile {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Specialization specialization;

    @Column(nullable = false)
    private String qualification;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    @Column(nullable = false)
    private BigDecimal consultationFee;

    @Column(nullable = false)
    private Integer yearsOfExperience;
}

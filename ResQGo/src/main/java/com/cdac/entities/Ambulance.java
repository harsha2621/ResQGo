package com.cdac.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="ambulances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ambulance extends BaseEntity {

    @Column(nullable = false, unique = true, length = 20)
    private String ambulanceNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private AmbulanceType type;  // BASIC, ICU

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 15)
    private AmbulanceStatus status;  // AVAILABLE, BUSY, MAINTENANCE

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_ambulance_location"))
    private Location currentLocation;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_ambulance_driver"))
    private User driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_ambulance_org"))
    private Organization organization;
}
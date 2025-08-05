package com.cdac.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_booking_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ambulance_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_booking_ambulance"))
    private Ambulance ambulance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_location_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_booking_pickup"))
    private Location pickupLocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "drop_location_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_booking_drop"))
    private Location dropLocation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingStatus bookingStatus; // e.g., REQUESTED, CONFIRMED, CANCELLED, COMPLETED

    @Enumerated(EnumType.STRING)
    @Column(name = "emergency_type", nullable = false, length = 30)
    private EmergencyType emergencyType;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Bill bill;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Feedback feedback;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TripStatusUpdate> statusUpdates;
}


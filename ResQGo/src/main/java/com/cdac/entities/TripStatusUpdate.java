package com.cdac.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="trip_status_update")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TripStatusUpdate extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", nullable = false,
	                foreignKey = @ForeignKey(name = "fk_tripstatus_booking"))
	private Booking booking;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TripStatus status;

    @Column(name = "updated_time", nullable = false)
    private LocalDateTime updatedTime;
}
package com.cdac.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bill extends BaseEntity {

	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false, unique = true,
                foreignKey = @ForeignKey(name = "fk_bill_booking"))
    private Booking booking;
	
    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private boolean paid;
    
    @Column(name="payment_date",nullable = false)
    private LocalDateTime paymentDate; 
}
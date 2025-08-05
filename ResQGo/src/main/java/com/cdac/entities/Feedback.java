package com.cdac.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name="feedbacks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback extends BaseEntity {


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_feedback_booking"), unique = true)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_feedback_user"))
    private User user;
    
    @Column(length = 1000)
    private String comments;

    @Column(nullable = false)
    private int rating;
    
    
}
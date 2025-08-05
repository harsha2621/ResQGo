package com.cdac.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class User extends BaseEntity {

    @Column(name = "full_name",length = 50, nullable = false)
    private String name;

    @Column(nullable = false,length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 60)
    private String password;
    
    @Column(name="aadhaar_no",length = 12, unique = true,nullable = false)
    private String aadhaarNumber;

   

    @Column(name="contact_no",length = 10,nullable = false)
    private String contactNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private UserRole role; // USER or ADMIN

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id",nullable = false, foreignKey = @ForeignKey(name = "fk_user_organization"))
    private Organization organization;
    
    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Feedback> feedbacks;
    

    
}
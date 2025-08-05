package com.cdac.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="organization")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(of = "orgName", callSuper = false)
public class Organization extends BaseEntity {

    @Column(name = "org_name",length = 50, nullable = false)
    private String orgName;

    @Column(length = 100,nullable = false)
    private String address;

    @Column(name = "contact_no",length = 10, nullable = false)
    private String contactNo;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private User admin;
    
    /*Use @JoinColumn only on the owning side (usually @ManyToOne).

The non-owning side as inverse side
 (@OneToMany with mappedBy) just references the owning side and does not create a column.

*/
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Ambulance> ambulances;

  
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<User> drivers;
}
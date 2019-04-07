package com.okta.developer.goldilocks.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "dispensaries")
public class Dispensary {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String address;
    private String city;
    private String stateOrProvince;
    private String country;
    private String postalCode;
    private String phoneNumber;
    private String website;
    private Boolean deliveryOnly;
    @ManyToMany
    private Set<User> subscribers;
}
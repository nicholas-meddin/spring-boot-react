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
@Table(name = "strains")
public class Strain {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private Set<String> tags;
    private Set<String> flavors;
    private Set<String> effects;
    private Set<String> medicalUsages;
    private Set<String> negatives;
    @ManyToMany
    private Set<User> subscribers;
}
package com.okta.developer.goldilocks.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Strain {

    @Id
    @GeneratedValue
    @Column(name = "STRAIN_ID")
    private Long id;
    @Column(name = "STRAIN_NAME")
    private String name;
    @Column(name = "STRAIN_DESCRIPTION")
    private String description;
    private HashSet<String> tags;
    private HashSet<String> flavors;
    private HashSet<String> effects;
    private HashSet<String> medicalUsages;
    private HashSet<String> negatives;

}
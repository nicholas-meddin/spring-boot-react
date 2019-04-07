package com.okta.developer.goldilocks.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_product")
public class Product {

    public enum Type {
        FLOWER, CONCENTRATE, EDIBLE, PRE_ROLL, CARTRIDGE, TOPICAL, OTHER
    }

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private Type type;
    @ManyToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Dispensary dispensary;
    private int price;

    private HashSet<String> tags;

    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Strain> strains;
}


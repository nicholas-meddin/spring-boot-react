package com.okta.developer.goldilocks;

import com.okta.developer.goldilocks.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final ProductRepository repository;

    public Initializer(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("OMNIA | PREMIUM FLOWER | XXX 3.5G", "Product 2").forEach(name ->
                repository.save(new Product(name))
        );

        HashSet<String> flavors = new HashSet<>(Arrays.asList("EARTHY", "PINE", "LEMON"));
        HashSet<String> effects = new HashSet<>(Arrays.asList("RELAXED", "EUPHORIC", "SLEEPY", "UPLIFTED", "HAPPY"));

        Product product = repository.findByName("OMNIA | PREMIUM FLOWER | XXX 3.5G");
        Strain e = Strain.builder().name("XXX OG")
                .description("XXX OG is a hard-hitting indica that took 1st place in the 2014 Los Angeles Cannabis Cup.")
                .flavors(flavors)
                .effects(effects)
                .build();
        Dispensary d = Dispensary.builder()
                .name("Luvbrite Collective")
                .address("Olympic Blvd and Overland Ave")
                .deliveryOnly(true)
                .city("West Los Angeles")
                .stateOrProvince("CA")
                .country("USA")
                .phoneNumber("(424) 270-1560")
                .website("http://www.luvbrite.com/")
                .build();
        product.setStrains(Collections.singleton(e));
        product.setDispensary(d);
        product.setPrice(38);
        product.setType(Product.Type.FLOWER);
        repository.save(product);

        product = repository.findByName("Product 2");
        e = Strain.builder().description("Description 2").build();
        d = Dispensary.builder().address("Address 2").city("Test City").stateOrProvince("Test State").build();
        product.setStrains(Collections.singleton(e));
        product.setDispensary(d);
        product.setPrice(12);
        product.setType(Product.Type.OTHER);
        repository.save(product);

        repository.findAll().forEach(System.out::println);
    }
}
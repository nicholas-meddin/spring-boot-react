package com.okta.developer.goldilocks.web;

import com.okta.developer.goldilocks.model.Product;
import com.okta.developer.goldilocks.model.ProductRepository;
import com.okta.developer.goldilocks.model.User;
import com.okta.developer.goldilocks.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class ProductController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);
    private ProductRepository productRepository;
    private UserRepository userRepository;


    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/products")
    Collection<Product> products(Principal principal) {
        return productRepository.findAllByUserId(principal.getName());
    }

    @GetMapping("/product/{id}")
    ResponseEntity<?> getProduct(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/product")
    ResponseEntity<Product> createProduct(@Valid @RequestBody Product product,
                                      @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create product: {}", product);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists

        Optional<User> user = userRepository.findById(userId);
        product.setUser(user.orElse(new User(userId, details.get("name").toString(), details.get("email").toString())));

        Product result = productRepository.save(product);
        return ResponseEntity.created(new URI("/api/product/" + result.getId()))
                .body(result);
    }

    @PutMapping("/product")
    ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) {
        log.info("Request to update product: {}", product);
        Product result = productRepository.save(product);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        log.info("Request to delete product: {}", id);
        productRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
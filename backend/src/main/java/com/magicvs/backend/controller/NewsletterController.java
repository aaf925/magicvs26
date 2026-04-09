package com.magicvs.backend.controller;

import com.magicvs.backend.model.NewsletterSubscription;
import com.magicvs.backend.repository.NewsletterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/newsletter")
@RequiredArgsConstructor
@Slf4j
public class NewsletterController {

    private final NewsletterRepository newsletterRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "El email es obligatorio"));
        }

        if (newsletterRepository.existsByEmail(email)) {
            log.info("Subscription attempt with existing email: {}", email);
            return ResponseEntity.ok(Map.of("message", "Ya estás suscrito con este correo"));
        }

        NewsletterSubscription subscription = NewsletterSubscription.builder()
                .email(email)
                .subscriptionDate(LocalDateTime.now())
                .build();

        newsletterRepository.save(subscription);
        log.info("New newsletter subscription: {}", email);
        return ResponseEntity.ok(Map.of("message", "¡Te has suscrito correctamente!"));
    }

    @GetMapping
    public ResponseEntity<?> getSubscribers() {
        return ResponseEntity.ok(newsletterRepository.findAll());
    }
}

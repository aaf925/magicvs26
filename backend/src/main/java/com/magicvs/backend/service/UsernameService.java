package com.magicvs.backend.service;

import com.magicvs.backend.repository.RegistroRepository;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;

@Service
public class UsernameService {

    private final RegistroRepository registroRepository;
    private static final SecureRandom RANDOM = new SecureRandom();

    public UsernameService(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    /**
     * Generates a clean username from a Google display name.
     * Logic: Replace spaces with underscores. If exists, append _XX suffix.
     * example: "Juan Perez" -> "Juan_Perez"
     */
    public String generateUniqueUsername(String fullName) {
        if (fullName == null || fullName.trim().isEmpty()) {
            fullName = "Caminante";
        }

        // 1. Replace spaces with underscores and remove special characters
        // We only allow letters, numbers and underscores for simplicity in this auto-generation
        String baseUsername = fullName.trim()
                .replaceAll("\\s+", "_")
                .replaceAll("[^A-Za-z0-9_]", "");

        // limit length if needed (Entity says 50 max, but ValidationUtils says 16)
        // Let's stick to 16 for consistency with manual registration
        if (baseUsername.length() > 13) { // 13 to allow "_99" suffix
            baseUsername = baseUsername.substring(0, 13);
        }
        
        if (baseUsername.isEmpty()) {
            baseUsername = "User";
        }

        String currentUsername = baseUsername;
        
        // 2. Check for collisions
        while (registroRepository.existsByUsername(currentUsername)) {
            int suffix = RANDOM.nextInt(90) + 10; // 10-99
            currentUsername = baseUsername + "_" + suffix;
            
            // Safety break just in case of extreme collision scenarios
            if (currentUsername.length() > 16) {
                baseUsername = baseUsername.substring(0, baseUsername.length() - 3);
                currentUsername = baseUsername + "_" + suffix;
            }
        }

        return currentUsername;
    }
}

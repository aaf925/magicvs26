package com.magicvs.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GoogleAuthService {

    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthService.class);
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    // The Client ID the user just generated
    private static final String CLIENT_ID = "676945457635-7pqnrpq4gebcph27b300jgr6ce70jfra.apps.googleusercontent.com";

    public GoogleAuthService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Verifies the Google ID Token using Google's tokeninfo endpoint.
     * Returns a GoogleUserInfo object if valid, null otherwise.
     */
    public GoogleUserInfo verifyToken(String idToken) {
        try {
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                logger.error("Error verifying Google token: Status {}", response.statusCode());
                return null;
            }

            JsonNode node = objectMapper.readTree(response.body());

            // Validate the 'aud' (audience) claim matches our Client ID
            String aud = node.get("aud").asText();
            if (!CLIENT_ID.equals(aud)) {
                logger.error("Token audience mismatch. Expected {}, got {}", CLIENT_ID, aud);
                return null;
            }

            GoogleUserInfo info = new GoogleUserInfo();
            info.setGoogleId(node.get("sub").asText());
            info.setEmail(node.get("email").asText());
            info.setName(node.get("name").asText());
            info.setPicture(node.path("picture").asText(null));
            
            return info;

        } catch (Exception e) {
            logger.error("Exception during token verification", e);
            return null;
        }
    }

    public static class GoogleUserInfo {
        private String googleId;
        private String email;
        private String name;
        private String picture;

        // Getters and Setters
        public String getGoogleId() { return googleId; }
        public void setGoogleId(String googleId) { this.googleId = googleId; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPicture() { return picture; }
        public void setPicture(String picture) { this.picture = picture; }
    }
}

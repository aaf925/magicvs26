package com.magicvs.backend.service;

import com.magicvs.backend.dto.ProfileResponseDto;
import com.magicvs.backend.dto.UserDeckSummaryDto;
import com.magicvs.backend.model.User;
import com.magicvs.backend.model.UserDeck;
import com.magicvs.backend.repository.RegistroRepository;
import com.magicvs.backend.repository.UserDeckRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserProfileService {

    private final RegistroRepository registroRepository;
    private final UserDeckRepository userDeckRepository;
    private final AuthService authService;

    public UserProfileService(RegistroRepository registroRepository, UserDeckRepository userDeckRepository, AuthService authService) {
        this.registroRepository = registroRepository;
        this.userDeckRepository = userDeckRepository;
        this.authService = authService;
    }

    public ProfileResponseDto getProfileByUserId(Long userId) {
        User user = registroRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));

        long decksCount = userDeckRepository.countByUserId(userId);
        return toProfileResponse(user, decksCount);
    }

    public ProfileResponseDto getProfileOfAuthenticatedUser(String authorization) {
        Long userId = extractUserIdFromAuthorization(authorization);
        return getProfileByUserId(userId);
    }

    public List<UserDeckSummaryDto> getDecksByUserId(Long userId) {
        if (!registroRepository.existsById(userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        return userDeckRepository.findByUserIdOrderByUpdatedAtDesc(userId)
                .stream()
                .map(this::toDeckSummary)
                .toList();
    }

    public List<UserDeckSummaryDto> getDecksOfAuthenticatedUser(String authorization) {
        Long userId = extractUserIdFromAuthorization(authorization);
        return getDecksByUserId(userId);
    }

    private Long extractUserIdFromAuthorization(String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }

        String token = authorization.substring("Bearer ".length());
        return authService.getUserId(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
    }

    private ProfileResponseDto toProfileResponse(User user, long decksCount) {
        return new ProfileResponseDto(
                user.getId(),
                user.getUsername(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getCountry(),
                user.getBio(),
                user.getEloRating(),
                user.getGamesPlayed(),
                user.getGamesWon(),
                user.getGamesLost(),
                user.getFriendTag(),
                user.getFriendsCount(),
                decksCount
        );
    }

    private UserDeckSummaryDto toDeckSummary(UserDeck deck) {
        return new UserDeckSummaryDto(
                deck.getId(),
                deck.getName(),
                deck.getDescription(),
                deck.getFormatName(),
                deck.getTotalCards(),
                deck.getPublic(),
                deck.getUpdatedAt()
        );
    }
}

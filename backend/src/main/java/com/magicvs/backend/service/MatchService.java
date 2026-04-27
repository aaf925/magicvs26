package com.magicvs.backend.service;

import com.magicvs.backend.dto.MatchHistoryDto;
import com.magicvs.backend.model.Match;
import com.magicvs.backend.model.MatchStatus;
import com.magicvs.backend.model.User;
import com.magicvs.backend.repository.MatchRepository;
import com.magicvs.backend.repository.RegistroRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final MatchRepository matchRepository;
    private final RegistroRepository userRepository;

    public MatchService(MatchRepository matchRepository, RegistroRepository userRepository) {
        this.matchRepository = matchRepository;
        this.userRepository = userRepository;
    }

    public List<MatchHistoryDto> getHistoryForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Match> matches = matchRepository.findByUserAndStatus(user, MatchStatus.FINISHED);

        return matches.stream()
                .map(m -> mapToDto(m, userId))
                .collect(Collectors.toList());
    }

    private MatchHistoryDto mapToDto(Match match, Long currentUserId) {
        MatchHistoryDto dto = new MatchHistoryDto();
        dto.setId(match.getId());
        
        dto.setPlayer1(new MatchHistoryDto.PlayerDto(
                match.getPlayer1().getUsername(),
                match.getPlayer1().getAvatarUrl()
        ));
        
        if (match.getPlayer2() != null) {
            dto.setPlayer2(new MatchHistoryDto.PlayerDto(
                    match.getPlayer2().getUsername(),
                    match.getPlayer2().getAvatarUrl()
            ));
        }

        // Determine winner display
        if (match.getWinnerId() != null) {
            if (match.getWinnerId().equals(currentUserId)) {
                dto.setWinner("Current_User");
            } else {
                dto.setWinner("Opponent");
            }
        }

        dto.setScore(match.getScoreP1() + " - " + match.getScoreP2());
        dto.setEloChange(match.getEloChange());
        dto.setFormat(match.getFormat());
        dto.setTimestamp(match.getFinishedAt() != null ? match.getFinishedAt().toString() : match.getCreatedAt().toString());

        dto.setDeck1(new MatchHistoryDto.DeckSummaryDto(
                match.getDeckArchetype1(),
                match.getDeckColors1() != null ? Arrays.asList(match.getDeckColors1().split(",")) : List.of()
        ));

        dto.setDeck2(new MatchHistoryDto.DeckSummaryDto(
                match.getDeckArchetype2(),
                match.getDeckColors2() != null ? Arrays.asList(match.getDeckColors2().split(",")) : List.of()
        ));

        return dto;
    }
}

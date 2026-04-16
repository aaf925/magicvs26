package com.magicvs.backend.dto;

import com.magicvs.backend.model.User;

public class UserDirectoryResponseDto {
    private Long id;
    private String username;
    private Integer elo;
    private String avatarUrl;

    public UserDirectoryResponseDto() {}

    public UserDirectoryResponseDto(Long id, String username, Integer elo, String avatarUrl) {
        this.id = id;
        this.username = username;
        this.elo = elo;
        this.avatarUrl = avatarUrl;
    }

    public static UserDirectoryResponseDto fromEntity(User user) {
        return new UserDirectoryResponseDto(
            user.getId(),
            user.getUsername(),
            user.getEloRating(),
            user.getAvatarUrl()
        );
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Integer getElo() { return elo; }
    public void setElo(Integer elo) { this.elo = elo; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}

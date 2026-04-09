package com.magicvs.backend.repository;

import com.magicvs.backend.model.UserDeck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDeckRepository extends JpaRepository<UserDeck, Long> {

    List<UserDeck> findByUserIdOrderByUpdatedAtDesc(Long userId);

    long countByUserId(Long userId);
}

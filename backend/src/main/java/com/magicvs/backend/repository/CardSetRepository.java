package com.magicvs.backend.repository;

import com.magicvs.backend.model.CardSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CardSetRepository extends JpaRepository<CardSet, Long> {

    Optional<CardSet> findByScryfallId(UUID scryfallId);

    Optional<CardSet> findByCode(String code);

    boolean existsByCode(String code);
}
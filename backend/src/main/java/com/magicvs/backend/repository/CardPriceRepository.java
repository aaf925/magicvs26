package com.magicvs.backend.repository;

import com.magicvs.backend.model.CardPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardPriceRepository extends JpaRepository<CardPrice, Long> {
}
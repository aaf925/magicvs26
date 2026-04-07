package com.magicvs.backend.repository;

import com.magicvs.backend.model.Ruling;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RulingRepository extends JpaRepository<Ruling, Long> {
}
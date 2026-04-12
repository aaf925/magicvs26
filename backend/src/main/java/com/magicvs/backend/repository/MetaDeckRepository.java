package com.magicvs.backend.repository;

import com.magicvs.backend.model.MetaDeck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetaDeckRepository extends JpaRepository<MetaDeck, Long> {
}

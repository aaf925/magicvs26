package com.magicvs.backend.repository;

import com.magicvs.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistroRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByFriendTag(String friendTag);

    java.util.Optional<User> findByGoogleId(String googleId);

    java.util.Optional<User> findByEmail(String email);

    java.util.Optional<User> findByUsername(String username);
}

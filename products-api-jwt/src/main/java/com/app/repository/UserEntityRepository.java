package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserEntity;

public interface UserEntityRepository extends JpaRepository<UserEntity, Long> {
//finder (derived)
	Optional<UserEntity>  findByEmail(String email);
	//derived query method
		boolean existsByEmail(String email);
		
}

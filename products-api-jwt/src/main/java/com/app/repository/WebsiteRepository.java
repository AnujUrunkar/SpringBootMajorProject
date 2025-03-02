package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.UserEntity;
import com.app.entities.Website;

public interface WebsiteRepository extends JpaRepository<Website, Long> {
	List<Website> findByUser(UserEntity user);
}

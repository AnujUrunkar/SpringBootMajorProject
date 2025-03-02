package com.app.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.app.entities.UserEntity;
import com.app.entities.UserRole;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
//only for adding user recs
@Rollback(false)
class TestUserEntityRepository {
	// depcy
	@Autowired
	private UserEntityRepository userEntityRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	void testAddUsers() {
		UserEntity admin = new UserEntity("a1", "b1", "a1@gmail.com",
				passwordEncoder.encode("12345"),
				LocalDate.parse("1990-10-20"), UserRole.ROLE_ADMIN);
		UserEntity customer = new UserEntity("a2", "b2", "a2@gmail.com",
				passwordEncoder.encode("2345"),
				LocalDate.parse("1992-10-20"), UserRole.ROLE_USER);
		userEntityRepository.saveAll(List.of(admin, customer));
		assertEquals(2, userEntityRepository.count());

	}

}

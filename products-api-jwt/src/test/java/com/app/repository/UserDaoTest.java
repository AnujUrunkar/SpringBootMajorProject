package com.app.repository;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;

import com.app.entities.UserEntity;
import com.app.entities.UserRole;
import com.app.repository.UserEntityRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
class UserDaoTest {
	@Autowired
	private UserEntityRepository userEntityRepository;
	@Autowired
	private PasswordEncoder encoder;

//	@Test
//	void testAddCustomer() {
//		UserEntity newUser=new UserEntity("a4", "b4", "a4@gmail.com", 
//				encoder.encode("5567"), UserRole.ROLE_CUSTOMER);
//		userEntityRepository.save(newUser);
//	}

}

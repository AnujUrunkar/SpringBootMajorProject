package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ApiException;
import com.app.dto.Signup;
import com.app.dto.UserResponseDto;
import com.app.entities.UserEntity;
import com.app.repository.UserEntityRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	//dep : dao layer i/f
		@Autowired
		private UserEntityRepository userDao;
		//dep
		@Autowired
		private ModelMapper mapper;
		//dep 
		@Autowired
		private PasswordEncoder encoder;
	@Override
	public Signup userRegistration(Signup reqDTO) {
		//dto --> entity
		UserEntity user=mapper.map(reqDTO, UserEntity.class);
		if(userDao.existsByEmail(reqDTO.getEmail()))
			throw new ApiException("Email already exists !!!");
		
		user.setPassword(encoder.encode(user.getPassword()));//pwd : encrypted using SHA
		return mapper.map(userDao.save(user), Signup.class);
	}
	@Override
	 public UserResponseDto getUserById(Long id) {
	        UserEntity user = userDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
	        return mapper.map(user, UserResponseDto.class);
	 }
	@Override
	 public String updateUser(Long id, Signup userRequestDto) {
	        UserEntity user = userDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
	        user.setFirstName(userRequestDto.getFirstName());
	        user.setLastName(userRequestDto.getLastName());
	        user.setEmail(userRequestDto.getEmail());
	        userDao.save(user);
	        return "User updated successfully with ID: " + id;
	    }
	@Override
	 public String deleteUser(Long id) {
	        UserEntity user = userDao.findById(id)
	                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
	        userDao.delete(user);
	        return "User deleted successfully with ID: " + id;
	    }
	@Override
	public List<UserResponseDto> getAll(){
		return userDao.findAll().stream().map(user->mapper.map(user,UserResponseDto.class)).collect(Collectors.toList());
	}
}
	 

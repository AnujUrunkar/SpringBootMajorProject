package com.app.service;

import java.util.List;

import com.app.dto.Signup;
import com.app.dto.UserResponseDto;

public interface UserService {
	//add signup method
	Signup userRegistration(Signup reqDTO);
	String deleteUser(Long id);
	String updateUser(Long id, Signup userRequestDto);
	UserResponseDto getUserById(Long id);
	List<UserResponseDto> getAll();
}

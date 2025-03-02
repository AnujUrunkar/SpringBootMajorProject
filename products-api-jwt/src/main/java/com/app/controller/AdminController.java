package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.UserResponseDto;
import com.app.service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private UserService userService;
//	@RequestMapping(value="/{id}" , method = RequestMethod.POST)
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
	    return ResponseEntity.ok(userService.deleteUser(id));
	}
	@GetMapping("/all")
	public ResponseEntity<List<UserResponseDto>> getall(){
		return ResponseEntity.ok(userService.getAll());
	}
}

package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Signup;
import com.app.dto.UserResponseDto;
import com.app.service.UserService;


@CrossOrigin
@RestController
@RequestMapping("/users/profile")
public class UserController {
@Autowired
private UserService userService;
@GetMapping("/{id}")
public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
    UserResponseDto user = userService.getUserById(id);
    return ResponseEntity.ok(user);
}
@PutMapping("/{id}")
public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody Signup userRequestDto) {
    return ResponseEntity.ok(userService.updateUser(id, userRequestDto));
}
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.deleteUser(id));
}


}

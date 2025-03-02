package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.WebsiteRequestDto;
import com.app.service.websiteService;





@CrossOrigin
@RestController
@RequestMapping("/users")
public class WebsiteContoller {
@Autowired
private websiteService websiteService;
@PostMapping("/add-website/{id}")
public ResponseEntity<?> postWebsite(@RequestBody WebsiteRequestDto websiteRequestDto,@PathVariable Long id) {
    //TODO: process POST request
    return ResponseEntity.ok(websiteService.addWebsite(websiteRequestDto,id));
   }
@PutMapping("/update-website/{id}")
public ResponseEntity<ApiResponse>  putWebsite(@PathVariable Long id, @RequestBody WebsiteRequestDto websiteRequestDto) {
    return ResponseEntity.ok(new ApiResponse(websiteService.updateWebsite(id, websiteRequestDto)));
}

@GetMapping("/website-dashboard/{id}")
public ResponseEntity<List<WebsiteRequestDto>> getWebsiteById(@PathVariable Long id) {
	
     return ResponseEntity.ok(websiteService.getWebsitesByUser(id));
}
@DeleteMapping("/delete-website/{id}")
public ResponseEntity<ApiResponse> deleteWebsite(@PathVariable Long id) {
    return ResponseEntity.ok(new ApiResponse(websiteService.deleteWebsite(id)));
}

}

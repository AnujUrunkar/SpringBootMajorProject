package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.WebsiteRequestDto;
import com.app.entities.UserEntity;
import com.app.entities.Website;
import com.app.repository.UserEntityRepository;
import com.app.repository.WebsiteRepository;
@Service
@Transactional
public class WebsiteServiceImpl implements websiteService {
@Autowired
private WebsiteRepository websiteRepo;
@Autowired
private UserEntityRepository user;
@Autowired
private ModelMapper modelmap;
	@Override
	public String addWebsite(WebsiteRequestDto dto, Long id) {
		// TODO Auto-generated method stub
		UserEntity us=user.findById(id).orElseThrow();
		Website wb=modelmap.map(dto,Website.class);
		System.out.println(wb.getUrl()+" "+dto.getUrl());
		us.Addwebsite(wb);
		websiteRepo.save(wb);
		return "website added successfully with id "+wb.getId();
	}
	@Override
	public List<WebsiteRequestDto> getWebsitesByUser(Long userId) {
        UserEntity us = user.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Website> websites = websiteRepo.findByUser(us);
        return websites.stream()
                .map(website -> modelmap.map(website, WebsiteRequestDto.class))
                .collect(Collectors.toList());
    }
	@Override
	public String updateWebsite(Long websiteId, WebsiteRequestDto dto) {
        Website website = websiteRepo.findById(websiteId).orElseThrow(() -> new RuntimeException("Website not found"));
        website.setUrl(dto.getUrl());
        websiteRepo.save(website);
        return "Website updated successfully";
    }
	@Override
	 public String deleteWebsite(Long id) {
	        Website website = websiteRepo.findById(id).orElseThrow(() -> new RuntimeException("Website not found"));
	        websiteRepo.delete(website);
	        return "Website deleted successfully";
	    }

}

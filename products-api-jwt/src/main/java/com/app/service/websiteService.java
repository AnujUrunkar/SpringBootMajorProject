package com.app.service;

import java.util.List;

import com.app.dto.WebsiteRequestDto;

public interface websiteService {
public String addWebsite(WebsiteRequestDto websiteRequestDto ,Long id);
public List<WebsiteRequestDto> getWebsitesByUser(Long id);
public String updateWebsite(Long websiteId, WebsiteRequestDto dto);
public String deleteWebsite(Long id);
}

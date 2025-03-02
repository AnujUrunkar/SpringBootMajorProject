package com.app.service;

import java.util.List;

import com.app.dto.WebsiteStatusDto;

public interface WebsiteStatusService {
public List<WebsiteStatusDto> getWebsiteStatus(Long id);
public Double getAverageResponseTime(long id);
public List<WebsiteStatusDto> getTop10ResponseTime(long id);
//public Long getIncident();
public Long getIncident(Long id) ;
public Double getPercentageDown(Long id) ;

}

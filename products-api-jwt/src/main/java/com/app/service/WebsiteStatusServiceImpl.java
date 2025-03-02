package com.app.service;

import java.util.Date;
import java.time.LocalDate;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.WebsiteStatusDto;
import com.app.entities.Website;
import com.app.entities.WebsiteStatus;
import com.app.repository.WebsiteRepository;
import com.app.repository.WebsiteStatusRepository;
@Service
@Transactional
public class WebsiteStatusServiceImpl implements WebsiteStatusService {
@Autowired
private WebsiteStatusRepository wbs;
@Autowired
private WebsiteRepository web;
@Autowired
private ModelMapper modelmap;
	@Override
	public List<WebsiteStatusDto> getWebsiteStatus(Long id) {
		 Website us = web.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	        List<WebsiteStatus> websites = wbs.findByWebsite(us);
	        return websites.stream()
	                .map(website -> modelmap.map(website, WebsiteStatusDto.class))
	                .collect(Collectors.toList());
	}
	@Override
	public Double getAverageResponseTime(long id) {
		return wbs.findAverageResponseTime(id);
	}
	@Override
	public List<WebsiteStatusDto> getTop10ResponseTime(long id) {
		return wbs.findTop10ByWebsiteIdOrderByTimestampDesc(id).stream().map(website->modelmap.map(website, WebsiteStatusDto.class)).collect(Collectors.toList());
	}

//	public Long getIncident() {
////		Calendar cal=Calendar.getInstance();
////		cal.add(Calendar.DAY_OF_YEAR, -7);
////		Date startDate=cal.getTime();
////		return wbs.countIncidentsInLast7Days(startDate);
//		
//	    // Get current date and subtract 7 days
//	    LocalDate startDate = LocalDate.now().minusDays(7);
//
//	    // Call repository method with LocalDate
//	    return wbs.countIncidentsInLast7Days(startDate);
//	}
	
	 
//	@Override 
//	public Long getIncident() {
//		LocalDate startDate = LocalDate.now().minusDays(7); 
//	    return wbs.countIncidentsInLast7Days(startDate);  
//	}
	
	@Override 
	public Long getIncident(Long id) {
		LocalDate startDate = LocalDate.now().minusDays(7); 
	    return wbs.countIncidentsInLast7Days(startDate,id);  
	}
	
	@Override
	public Double getPercentageDown(Long id) {
		List<Double> l1=wbs.findResponseTime(id);
		List<Integer> l2=wbs.findStatus(id);
		int total = l1.size();
		Double fineResponse=0.0;
		for(int i=0;i<total;i++) {
			if(l1.get(i)!=-1&&l2.get(i)<400) {
				fineResponse++;
			}
		}
		return (fineResponse/total)*100.00;
	}
	
}

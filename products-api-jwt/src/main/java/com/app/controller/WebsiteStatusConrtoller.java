package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.WebsiteStatusDto;
import com.app.service.WebsiteStatusService;



@CrossOrigin
@RequestMapping("/users")
@RestController
public class WebsiteStatusConrtoller {
@Autowired
private WebsiteStatusService websiteStatusService;
@GetMapping("/monitoring-dashboard/{id}")
public ResponseEntity<List<WebsiteStatusDto>> getMethodName(@PathVariable Long id) {
    return ResponseEntity.ok(websiteStatusService.getWebsiteStatus(id));
}
@GetMapping("/monitoring-dashboard/average/{id}")
public ResponseEntity<Double> getAverage(@PathVariable long id) {
    return ResponseEntity.ok(websiteStatusService.getAverageResponseTime(id));
}
@GetMapping("/monitoring-dashboard/top/{id}")
public ResponseEntity<List<WebsiteStatusDto>> getTop10(@PathVariable Long id){
	return ResponseEntity.ok(websiteStatusService.getTop10ResponseTime(id));
}
//@GetMapping("/monitoring-dashboard/incidents")
//public ResponseEntity<Long> getMethodName() {
//    return ResponseEntity.ok(websiteStatusService.getIncident());
//}

@GetMapping("/monitoring-dashboard/incidents/{id}")
public ResponseEntity<Long> getIncident(@PathVariable Long id) {
    return ResponseEntity.ok(websiteStatusService.getIncident(id));
}


@GetMapping("/monitoring-dashboard/percentage/{id}")
public ResponseEntity<Double> getPercentage(@PathVariable Long id){
	return ResponseEntity.ok(websiteStatusService.getPercentageDown(id));
}


}

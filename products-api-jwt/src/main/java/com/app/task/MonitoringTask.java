package com.app.task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.app.service.MonitoringService;

@Component
public class MonitoringTask {
private final MonitoringService monitoringService;
public MonitoringTask(MonitoringService mns) {
	this.monitoringService=mns;
}
@Scheduled(fixedRate=60000)
public void monitorWebsites() {
	monitoringService.checkWebSiteStatus();
}
}

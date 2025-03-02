//package com.app.service;
//
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.List;
//
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.entities.Website;
//import com.app.entities.WebsiteStatus;
//import com.app.repository.WebsiteRepository;
//import com.app.repository.WebsiteStatusRepository;
//
//@Service
//@Transactional
//public class MonitoringStatusServiceImpl implements MonitoringService {
//private final WebsiteRepository websiteRepository;
//private final WebsiteStatusRepository websiteStatusRepository;
//private final mailerService mailService;
//public MonitoringStatusServiceImpl(WebsiteRepository wb ,WebsiteStatusRepository wsb,mailerService mail) {
//	this.websiteRepository=wb;
//	this.websiteStatusRepository=wsb;
//	this.mailService=mail;
//	
//}
//	@Override
//	public void checkWebSiteStatus() {
//		// TODO Auto-generated method stub
//        List<Website> websites=websiteRepository.findAll();
//	   for(Website webs:websites) {
//		   try {
//			   long starttime=System.currentTimeMillis();
//			   URL url=new URL(webs.getUrl());
//			   HttpURLConnection connection=(HttpURLConnection) url.openConnection();
//		       connection.setRequestMethod("GET");
//			   connection.setConnectTimeout(5000);
//			   connection.setReadTimeout(5000);
//			   int code =connection.getResponseCode();
//			   long rpTime=System.currentTimeMillis()-starttime;
//			   WebsiteStatus status=new WebsiteStatus();
//			   status.setWebsite(webs);
//			   status.setResponseTime(rpTime);
//			   status.setStatusCode(code);
//			   webs.addWebsiteStatus(status);
//			   websiteStatusRepository.save(status);
//			   System.out.println("Checked " + webs.getUrl() + ": " + code + " (" + rpTime + "ms)");
//		   }catch(Exception e) {
//			   System.err.println("Error checking " + webs.getUrl() + ": " + e.getMessage());
//			   WebsiteStatus status = new WebsiteStatus();
//               // Assign meaningful error codes
//               int errorCode = mapExceptionToStatusCode(e);
//
//               // Save failure status with an appropriate error code
//               status.setStatusCode(errorCode);
//               status.setResponseTime((long)-1);
//               status.setWebsite(webs);
//               websiteStatusRepository.save(status);
//               // Send Email Notification
//               String subject = "🚨 Website Down Alert: " + webs.getUrl();
//               String body = "The website " + webs.getUrl() + " is down.\nError: " + e.getMessage() + "\nError Code: " + errorCode;
//               mailService.sendEmail("admin@example.com", subject, body);
//		   }
//	   }
//	}
//	 private int mapExceptionToStatusCode(Exception e) {
//	        String message = e.getMessage().toLowerCase();
//
//	        if (message.contains("connect timed out")) return 408;  // Request Timeout
//	        if (message.contains("unknownhostexception")) return 404;  // Not Found
//	        if (message.contains("forbidden")) return 403;  // Forbidden
//	        if (message.contains("unauthorized")) return 401;  // Unauthorized
//	        if (message.contains("500")) return 500;  // Internal Server Error
//	        return 520;  // Unknown Error (Custom Code)
//	    }
//}






package com.app.service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.UserResponseDto;
import com.app.entities.Website;
import com.app.entities.WebsiteStatus;
import com.app.repository.WebsiteRepository;
import com.app.repository.WebsiteStatusRepository;

@Service
@Transactional
public class MonitoringStatusServiceImpl implements MonitoringService {
private final WebsiteRepository websiteRepository;
private final WebsiteStatusRepository websiteStatusRepository;
private final mailerService mailService;
private final UserService us;
public MonitoringStatusServiceImpl(WebsiteRepository wb ,WebsiteStatusRepository wsb,mailerService mail,UserService us) {
	this.websiteRepository=wb;
	this.websiteStatusRepository=wsb;
	this.mailService=mail;
	this.us=us;
	
}
	@Override
	public void checkWebSiteStatus() {
		// TODO Auto-generated method stub
        List<Website> websites=websiteRepository.findAll();
	   for(Website webs:websites) {
		   try {
			   long starttime=System.currentTimeMillis();
			   URL url=new URL(webs.getUrl());
			   HttpURLConnection connection=(HttpURLConnection) url.openConnection();
		       connection.setRequestMethod("GET");
			   connection.setConnectTimeout(5000);
			   connection.setReadTimeout(5000);
			   int code =connection.getResponseCode();
			   long rpTime=System.currentTimeMillis()-starttime;
			   WebsiteStatus status=new WebsiteStatus();
			   status.setWebsite(webs);
			   status.setResponseTime(rpTime);
			   status.setStatusCode(code);
			   webs.addWebsiteStatus(status);
			   websiteStatusRepository.save(status);
			   System.out.println("Checked " + webs.getUrl() + ": " + code + " (" + rpTime + "ms)");
			   if(400<=code &&  code<600) {
				   String subject = "🚨 Website Down Alert: " + webs.getUrl();
				   String body = "The website " + webs.getUrl()  + "\nError Code: " + code;
				   mailService.sendEmail(us.getUserById(webs.getUser().getId()).getEmail(),subject ,body);
			   }
		   }catch(Exception e) {
			   System.err.println("Error checking " + webs.getUrl() + ": " + e.getMessage());
			   WebsiteStatus status = new WebsiteStatus();
               // Assign meaningful error codes
               int errorCode = mapExceptionToStatusCode(e);

               // Save failure status with an appropriate error code
               status.setStatusCode(errorCode);
               status.setResponseTime((long)-1);
               status.setWebsite(webs);
               webs.addWebsiteStatus(status);
               websiteStatusRepository.save(status);

               // Send Email Notification
               String subject = "🚨 Website Down Alert: " + webs.getUrl();
               String body = "The website " + webs.getUrl() + " is down.\nError: " + e.getMessage() + "\nError Code: " + errorCode;
              UserResponseDto uss= us.getUserById(webs.getUser().getId());
               mailService.sendEmail(uss.getEmail(), subject, body);
		   }
	   }
	}
	 private int mapExceptionToStatusCode(Exception e) {
	        String message = e.getMessage().toLowerCase();

	        if (message.contains("connect timed out")) return 408;  // Request Timeout
	        if (message.contains("unknownhostexception")) return 404;  // Not Found
	        if (message.contains("forbidden")) return 403;  // Forbidden
	        if (message.contains("unauthorized")) return 401;  // Unauthorized
	        if (message.contains("500")) return 500;  // Internal Server Error
	        return 520;  // Unknown Error (Custom Code)
	    }
}

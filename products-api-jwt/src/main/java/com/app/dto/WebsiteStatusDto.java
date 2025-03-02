package com.app.dto;

import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebsiteStatusDto {
	 private Integer statusCode;
	 private Long responseTime;
	 private LocalDateTime updated_on ;
	 
	 
	 public String getUpdatedTime() {
	        return updated_on != null ? updated_on.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm:ss")) : null;
	    }
}

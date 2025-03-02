package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WebsiteRequestDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
   private String url;
public WebsiteRequestDto(String url) {
	this.url=url;
}
}

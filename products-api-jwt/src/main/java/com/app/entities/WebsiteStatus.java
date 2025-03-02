package com.app.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class WebsiteStatus extends BaseEntity{
   @ManyToOne
   @JoinColumn(name="website_id",nullable=false) // @JoinColum indicate foreign key
	private Website website;
   private Integer statusCode;
   private Long responseTime;
public WebsiteStatus( Integer statusCode, Long responseTime) {
	super();
	this.statusCode = statusCode;
	this.responseTime = responseTime;
}
   

}

package com.app.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Website extends BaseEntity{
	@Column(length=200)
private String url;
@ManyToOne
@JoinColumn(name="user_id",nullable=false)
private UserEntity user;

@OneToMany(mappedBy = "website",cascade=CascadeType.ALL,orphanRemoval = true)
private List<WebsiteStatus> status; 
public void  addWebsiteStatus(WebsiteStatus wbs) {
 this.status.add(wbs);
 wbs.setWebsite(this);
}
public void removeWebsiteStatus(WebsiteStatus wbs) {
	this.status.remove(wbs);
	wbs.setWebsite(null);
}
}

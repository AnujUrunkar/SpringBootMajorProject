package com.app.entities;


import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // mandatory class level annotation for hibernate , to specify
//following class represents DB entity
@Table(name = "users") // to specify name of the table
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password"})

public class UserEntity extends BaseEntity {
	
//	@transient use for ignore the coloum in database (no colum is created) 
	@Column(length = 20) // column name , varchar(20)
	private String firstName;
	@Column(length = 20) // column name , varchar(20)
	private String lastName;
	@Column(length = 25, unique = true) // adds unique constraint
	private String email;
	@Column(length = 500, nullable = false) // not null constraint
	private String password;
	private LocalDate dob;
	@OneToMany(mappedBy = "user",cascade =CascadeType.ALL,orphanRemoval = true)
	private List<Website> website;
	@Enumerated(EnumType.STRING) // create column of type
	// varchar to store the name of constant
	@Column(length = 30) // varchar(30)
	private UserRole role;
	public UserEntity(String firstName, String lastName, String email, String password, LocalDate dob, UserRole role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.role = role;
	}
	public void Addwebsite(Website wb) {
		website.add(wb);
		wb.setUser(this);
	}
	public void DeleteWebsite(Website wb) {
		website.remove(wb);
		wb.setUser(null);
	}
	
}

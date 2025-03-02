package com.app.repository;

//import java.util.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Website;
import com.app.entities.WebsiteStatus;

public interface WebsiteStatusRepository extends JpaRepository<WebsiteStatus, Long> {
//	@Query("SELECT AVG(r.responseTime) FROM WebsiteStatus r WHERE r.id = :id" )
	@Query(value = "SELECT AVG(response_time) FROM website_status  WHERE website_id = :id" , nativeQuery = true)

	Double findAverageResponseTime(long id);
	List<WebsiteStatus> findByWebsite(Website web);
	@Query(value = "SELECT * FROM website_status WHERE website_id = :websiteId AND response_time != -1 ORDER BY id DESC LIMIT 1", 
		       nativeQuery = true)
	 List<WebsiteStatus> findTop10ByWebsiteIdOrderByTimestampDesc(Long websiteId);
//	@Query("SELECT COUNT(rt) FROM WebsiteStatus rt WHERE rt.responseTime = -1 AND rt.created_on >= :startDate")
//	@Query(value = "SELECT COUNT(id) FROM website_status rt WHERE rt.response_time = 403 AND rt.created_on >= :startDate" , nativeQuery = true)
//
//    Long countIncidentsInLast7Days( LocalDate startDate);
//	@Query("SELECT COUNT(rt) FROM WebsiteStatus rt WHERE rt.responseTime between 400 AND 600 AND rt.created_on >= :startDate")
//    Long countIncidentsInLast7Days( LocalDate startDate);
	
	@Query(value ="SELECT COUNT(id) FROM website_status rt WHERE rt.status_code between 400 AND 600 AND rt.created_on >= :startDate and rt.website_id=:id" , nativeQuery = true)
    Long countIncidentsInLast7Days( @Param("startDate") LocalDate startDate,@Param("id") Long id);
	
	
	@Query(value = "SELECT ws.response_time FROM website_status ws WHERE ws.website_id = :websiteId" , nativeQuery = true)
	 List<Double> findResponseTime(Long websiteId);
	   @Query(value = "SELECT ws.status_code FROM website_status ws WHERE ws.website_id = :websiteId" , nativeQuery = true)
	 List<Integer> findStatus(Long websiteId);
	
	
	
}

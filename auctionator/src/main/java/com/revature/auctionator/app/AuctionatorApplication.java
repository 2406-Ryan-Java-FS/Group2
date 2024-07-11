package com.revature.auctionator.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.revature.auctionator")
@EntityScan("com.revature.auctionator.models")
@EnableJpaRepositories("com.revature.auctionator.repositories")
public class AuctionatorApplication {
	public static void main(String[] args) {
		SpringApplication.run(AuctionatorApplication.class, args);
	}
}
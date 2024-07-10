package com.revature.auctionator.repositories;

import com.revature.auctionator.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}

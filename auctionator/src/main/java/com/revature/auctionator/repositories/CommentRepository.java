package com.revature.auctionator.repositories;

import com.revature.auctionator.models.Comment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByCommenterId(int id);
    List<Comment> findByAuctionId(int id);

    @Modifying
    @Transactional
    @Query("update Comment c set c.comment = :text where c.cId = :id")
    int updateCommentTextById(@Param("id") int id, @Param("text") String text);
}

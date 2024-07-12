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

    /**
     * takes an id to query the Comment table in the database to return a List of all entries with the passed commenter id
     * @param id
     * @return
     */
    List<Comment> findByCommenterId(int id);

    /**
     * takes an id to query the Comment table in the database to return a List of all entries with the passed auction id
     * @param id
     * @return
     */
    List<Comment> findByAuctionId(int id);

    /**
     * returns a list of all Comments made by the user with the specified commenterId for an auction with the
     * passed auctionId
     * @param commenterId
     * @param auctionId
     * @return
     */
    List<Comment> findByCommenterIdAndAuctionId(int commenterId, int auctionId);


    /**
     * update the comment text for the comment with the associated comment id
     * returns the number of rows changed (either 1 or 0)
     * @param id
     * @param text
     * @return
     */
    @Modifying
    @Transactional
    @Query("update Comment c set c.comment = :text where c.cId = :id")
    int updateCommentTextById(@Param("id") int id, @Param("text") String text);
}

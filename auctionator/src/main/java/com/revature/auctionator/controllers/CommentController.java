package com.revature.auctionator.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.auctionator.models.Comment;
import com.revature.auctionator.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    CommentService cs;


    /**
     * POST request handler to create a new Comment record in table
     * returns the created object or null if object could not be created
     * @param c
     * @return
     */
    @PostMapping("/comments")
    public ResponseEntity<Comment> createNewComment(@RequestBody Comment c){
        Comment comment = cs.createComment(c);

        if(comment != null) return ResponseEntity.ok(comment);
        else return ResponseEntity.badRequest().body(null);
    }

    /**
     * GET request handler to return a comment record with the passed id
     * returns the comment if it exists in table or null if no comment exists with given id
     * @param id
     * @return
     */
    @GetMapping("/comments/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable("id") int id){
        Comment c = cs.getComment(id);

        if(c != null) return ResponseEntity.ok(c);
        else return ResponseEntity.badRequest().body(null);
    }

    /**
     * GET request handler to return a List of all comments presently in table
     * returns an empty list if no records exist in the table
     * @return
     */
    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments(){
        return ResponseEntity.ok(cs.getAllComments());
    }

    /**
     * GET request handler to return a List of comments with the given auction id
     * returns an empty list if no comments have an auction id field that matches the passed id
     * @param id
     * @return
     */
    @GetMapping("/comments/auctions/{id}")
    public ResponseEntity<List<Comment>> getAllCommentsForAuctionId(@PathVariable("id") int id){
        return ResponseEntity.ok(cs.getAllCommentsForAuction(id));
    }

    /**
     * GET request handler to return a List of comments with the given commenter id
     * returns an empty list if no comments have a commenter id field that matches the passed id
     * @param id
     * @return
     */
    @GetMapping("/comments/users/{id}")
    public ResponseEntity<List<Comment>> getAllCommentsFromUser(@PathVariable("id") int id){
        return ResponseEntity.ok(cs.getAllCommentsFromUser(id));
    }

    /**
     * PATCH request handler to return an Integer of the number of rows updated in the table after updating
     * the comment field of the Comment object
     * @param id
     * @param comment
     * @return
     */
    @PatchMapping("/comments/{id}")
    public ResponseEntity<Integer> updateCommentTextById(@PathVariable("id") int id, @RequestBody String comment){

        try{
            ObjectMapper om = new ObjectMapper();
            JsonNode jsonNode = om.readTree(comment);
            String updatedText = jsonNode.get("comment").asText();


            int rowsUpdated = cs.updateCommentText(id, updatedText);
            if(rowsUpdated == 1) return ResponseEntity.ok(rowsUpdated);
            else return ResponseEntity.badRequest().body(0);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(0);
        }


    }

    /**
     * DELETE request handler to delete a record on the Comments table with the associated id
     * Returns a message stating if the delete operation was successful or not
     * @param id
     * @return
     */
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<String> deleteCommentById(@PathVariable("id") int id){
        int rowsUpdated = cs.deleteComment(id);

        if(rowsUpdated == 1) return ResponseEntity.ok("Comment successfully deleted");
        else return ResponseEntity.badRequest().body("Failed to delete Comment");
    }
}

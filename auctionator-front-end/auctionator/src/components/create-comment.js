import { useContext, useRef } from "react";
import { CommentContext } from "../CommentContext";
import { UserContext } from "../UserContext";
import { AuctionContext } from "./AuctionContext";

export default function CreateComment() {
    const { comments, updateCommentsList } = useContext(CommentContext);
    const {user} = useContext(UserContext);
    const {auctionId} = useContext(AuctionContext);

    
    const comment = useRef();

    async function createComment() {
        // Check if refs are not null before accessing their values
        if (!user['id'] || !auctionId || !comment.current) {
            console.error("One or more input fields are not initialized");
            return;
        }

        const url = "http://localhost:8080/comments";

        const commentObj = {
            commenterId: user['id'],
            auctionId: auctionId,
            comment: comment.current.value
        };

        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentObj)
        };

        const httpResponse = await fetch(url, options);

        if (httpResponse.ok) {
            const body = await httpResponse.json();
            updateCommentsList([...comments, body]);
        } else {
            console.error("Failed to create comment");
        }
    }

    return (<>


        <div className="container mt-5">                  
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Add New Comment
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={createComment}>Add Comment</button>
                            <div className="ml-auto d-flex col-4">
                                <input type="text" id="commentText" ref={comment} min="0" placeholder='Comment text here' className='form-control'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        </>
    );


}

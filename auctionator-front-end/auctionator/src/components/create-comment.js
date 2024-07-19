import { useContext, useRef } from "react";
import { AppContext } from "../CommentContext";

export default function CreateComment() {
    const { comments, updateCommentsList } = useContext(AppContext);

    const commenterId = useRef();
    const auctionId = useRef();
    const comment = useRef();

    async function createComment() {
        // Check if refs are not null before accessing their values
        if (!commenterId.current || !auctionId.current || !comment.current) {
            console.error("One or more input fields are not initialized");
            return;
        }

        const url = "http://localhost:8080/comments";

        const commentObj = {
            commenterId: commenterId.current.value,
            auctionId: auctionId.current.value,
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

    return (
        <>
            <form className="form-group">
                <div className="row">
                    <div className="col">
                        <input type="number" ref={commenterId} className="form-control" placeholder="Commenter Id here"/>
                    </div>
                    <div className="col">
                        <input type="number" ref={auctionId} className="form-control" placeholder="Auction Id here"/>
                    </div>
                    <div className="col">
                        <input type="text" ref={comment} className="form-control" placeholder="Comment Text here"/>
                    </div>
                    <div className="col">
                        <button onClick={createComment} className="btn btn-outline-primary">Submit</button>
                    </div>
                </div>
            </form> 
        </>
    );

}

import {  useEffect, useCallback, useState, useContext } from 'react';
import { AppContext } from '../CommentContext';
import CommentEditableCell from './comment-editable-cell';

export default function AuctionCommentList() {

    const { auctionId, userId, role } = useContext(AppContext);

    console.log("role: " + role + "  userId: " + userId);

    const useGetAllAuctionComments = () => {
        const [allComments, setAllComments] = useState([]);

        const getAllAuctionComments = useCallback(async () => {
            
                const url = `http://localhost:8080/comments/auctions/${auctionId}`;

                const httpResponse = await fetch(url);

                const body = await httpResponse.json();

                setAllComments(body);
            
        }, []);

        useEffect(() => {
            getAllAuctionComments();
        }, [getAllAuctionComments]);

        const handleCellChange = (commentId, newValue) => {
            const newData = [...allComments];
            const comment = newData.find(c => c.cId === commentId);
            if (comment) {
                comment.comment = newValue;
            }
            setAllComments(newData);
        }

         // Function to patch (update) item data on the backend
    const patchChanges = async (commentId) => {
        const url = `http://localhost:8080/comments/${commentId}`;
        const commentToUpdate = allComments.find(c => c.cId === commentId); // Find the item to update
        const httpResponse = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentToUpdate) // Send the updated item data
        });
        const response = await httpResponse.json();
        console.log(response);

        // Refetch the data to refresh the table
        await getAllAuctionComments();
    }

    // Function to delete an item from the backend
    const deleteComment = async (commentId) => {
        const url = `http://localhost:8080/comments/${commentId}`;
        const httpResponse = await fetch(url, {
            method: 'DELETE',
        });

        if (httpResponse.ok) {
            console.log(`Comment ${commentId} deleted successfully.`);
            await getAllAuctionComments(); // Refetch data to refresh the table
        } else {
            console.error('Failed to delete comment');
        }
    }

        const allAuctionCommentsTable = allComments.map((c, index) =>
            <tr key={c.cId}>
                <th scope="row">{index + 1}</th>
                <td>{c.commenterId}</td>
                <td>{c.auctionId}</td>
                {/* <td>
                        <CommentEditableCell
                            value={c.comment}
                            onChange={newValue => handleCellChange(c.cId, newValue)}
                            onEnter={() => patchChanges(c.cId)}
                        />
                </td>
                <td>
                    
                        <button onClick={() => deleteComment(c.cId)} className="btn btn-danger">Delete</button>
                    
                </td> */}
                
                <td>
                    {(role === 'admin' || (role === 'client' && c.commenterId === userId)) ? (
                        <CommentEditableCell
                            value={c.comment}
                            onChange={newValue => handleCellChange(c.cId, newValue)}
                            onEnter={() => patchChanges(c.cId)}
                        />
                    ) : (
                        c.comment
                    )}
                </td>
                <td>
                    {(role === 'admin' || (role === 'client' && c.commenterId === userId)) ? (
                        <button onClick={() => deleteComment(c.cId)} className="btn btn-danger">Delete</button>
                    ) : <p></p>}
                </td>
            </tr>
        );

        return { allAuctionCommentsTable, getAllAuctionComments, deleteComment };
    }

    const { allAuctionCommentsTable } = useGetAllAuctionComments();

    return (
        <table className="table table-hover table-striped table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Commenter Id</th>
                    <th>Auction Id</th>
                    <th>Comment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {allAuctionCommentsTable.length > 0 ? (
                    allAuctionCommentsTable
                ) : (
                    <tr>
                        <td colSpan="5">No comments available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
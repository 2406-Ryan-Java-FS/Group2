import {  useEffect, useCallback, useState, useContext } from 'react';
import CommentEditableCell from './comment-editable-cell';
import { UserContext } from '../UserContext';
import { AuctionContext } from './AuctionContext';
import CreateComment from './create-comment';

export default function AuctionCommentList() {

    const { user } = useContext(UserContext);

    console.log("role: " + user['role'] + "  userId: " + user['id']);

    const { auctionId }  = useContext(AuctionContext);

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
                <td>
                    {(user['role'] === 'Admin' || (user['role'] === 'Client' && c.commenterId === user['id'])) ? (
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
                    {(user['role'] === 'Admin' || (user['role'] === 'Client' && c.commenterId === user['id'])) ? (
                        <button onClick={() => deleteComment(c.cId)} className="btn btn-danger">Delete</button>
                    ) : <p></p>}
                </td>
            </tr>
        );

        return { allAuctionCommentsTable, getAllAuctionComments, deleteComment };
    }

    const { allAuctionCommentsTable } = useGetAllAuctionComments();

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Your Comments
                </div>
                <div className="card-body">
                    <table  className="table table-striped table-sm">
                        <thead className="table-dark">
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
                    <CreateComment />
                </div>
            </div>
        </div>
    );
}
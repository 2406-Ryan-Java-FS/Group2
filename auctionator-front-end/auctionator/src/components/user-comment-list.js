import {  useEffect, useCallback, useState, useContext } from 'react';
import CommentEditableCell from './comment-editable-cell';
import { UserContext } from '../UserContext';

export default function UserCommentList() {

    const { user } = useContext(UserContext);

    const useGetAllUserComments = () => {
        const [allComments, setAllComments] = useState([]);

        const id = user['id'];

        console.log(user['id']);

        const getAllUserComments = useCallback(async () => {
            
                const url = `http://localhost:8080/comments/users/${id}`;

                const httpResponse = await fetch(url);

                const body = await httpResponse.json();

                setAllComments(body);
            
        }, []);

        useEffect(() => {
            getAllUserComments();
        }, [getAllUserComments]);

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
        await getAllUserComments();
    }

    // Function to delete an item from the backend
    const deleteComment = async (commentId) => {
        const url = `http://localhost:8080/comments/${commentId}`;
        const httpResponse = await fetch(url, {
            method: 'DELETE',
        });

        if (httpResponse.ok) {
            console.log(`Comment ${commentId} deleted successfully.`);
            await getAllUserComments(); // Refetch data to refresh the table
        } else {
            console.error('Failed to delete comment');
        }
    }

        const allUserCommentsTable = allComments.map((c, index) =>
            <tr key={c.cId}>
                <th scope="row">{index + 1}</th>
                <td>{c.commenterId}</td>
                <td>{c.auctionId}</td>
                <td>
                    <CommentEditableCell
                        value={c.comment}
                        onChange={newValue => handleCellChange(c.cId, newValue)}
                        onEnter={() => patchChanges(c.cId, c.comment)}
                    />
                </td>
                <td>
                    <button onClick={() => deleteComment(c.cId)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );

        return { allUserCommentsTable, getAllUserComments, deleteComment };
    }

    const { allUserCommentsTable } = useGetAllUserComments();

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
                {allUserCommentsTable.length > 0 ? (
                    allUserCommentsTable
                ) : (
                    <tr>
                        <td colSpan="5">No comments available</td>
                    </tr>
                )}
            </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
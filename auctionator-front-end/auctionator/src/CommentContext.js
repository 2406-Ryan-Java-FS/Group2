import { createContext, useState } from "react";


export const CommentContext = createContext();

export default function CommentProvider({children}){

    const [comments, setComments] = useState([]);


    function updateCommentsList(newComments) {
        // Only update if the new comments are different
        if (JSON.stringify(newComments) !== JSON.stringify(comments)) {
            setComments(newComments);
        }
    }

    
    

    const data ={
        comments: comments,
        updateCommentsList: updateCommentsList
    };

    return (
        <CommentContext.Provider value = {data}>
            {children}
        </CommentContext.Provider>
    )
}
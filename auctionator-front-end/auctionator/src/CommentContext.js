import { createContext, useState } from "react";


export const AppContext = createContext();

export default function AppProvider({children}){

    const [ auctionId, setAuctionId ] = useState(1);

    const [ userId, setUserId ] = useState(2);

    const [ role, setRole ] = useState('client');

    const [comments, setComments] = useState([]);

    function updateAuctionId(newAId){
        setAuctionId(newAId);
    }

    function updateUserId(newUId){
        setUserId(newUId);
    }

    function updateCommentsList(newComments) {
        // Only update if the new comments are different
        if (JSON.stringify(newComments) !== JSON.stringify(comments)) {
            setComments(newComments);
        }
    }

    function updateRole(newRole) {
        setRole(newRole);
    }
    

    const data ={
        auctionId: auctionId,
        setAuctionId: updateAuctionId,
        userId: userId,
        updateUserId: updateUserId,
        comments: comments,
        updateCommentsList: updateCommentsList,
        role: role,
        updateRole: updateRole
    };

    return (
        <AppContext.Provider value = {data}>
            {children}
        </AppContext.Provider>
    )
}
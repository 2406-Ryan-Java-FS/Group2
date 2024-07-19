import React, { createContext, useState, useEffect } from 'react';

// Create a context to hold our admin item data and functions
export const ClientItemContext = createContext();

export function ClientItemProvider({ children }) {
    const { userItems, getItemsByUsername, setUserItems } = useGetItemsByUsername();
    
    const data = {
        userItems,
        addNewItem: (username, itemName) => addNewItem(username, itemName, getItemsByUsername),
        deleteItem: (itemId) => deleteItem(itemId, getItemsByUsername),
        handleCellChange: (itemId, newValue) => handleCellChange(itemId, newValue, userItems, setUserItems),
        patchChanges: (itemId) => patchChanges(itemId, userItems, getItemsByUsername)
    };

    return (
        <ClientItemContext.Provider value={data}>
            {children}
        </ClientItemContext.Provider>
    );
}

// Custom hook to fetch all items and user info
function useGetItemsByUsername() {
    // hardcoded username
    const username = "johndamme";

    // the default state for userItems is a blank array
    const [userItems, setUserItems] = useState([]);

    // Function to fetch all items and user info from the backend
    async function getItemsByUsername() {
        console.log(`Fetching ${username}'s items`);
        const url = `http://localhost:8080/${username}/items`;
        const httpResponse = await fetch(url);
        const theUserItems = await httpResponse.json();
        console.log(theUserItems);
        setUserItems(theUserItems);
    }

    // Fetch items and user info when the component mounts
    useEffect(() => {
        getItemsByUsername();
    }, []);

    // export the objects and data that other functions may need
    return { userItems, getItemsByUsername, setUserItems };
}

// Function to add a new item to the backend
async function addNewItem(username, itemName, getItemsByUsername) {
    const url = `http://localhost:8080/${username}/add-items`;

    const newItem = {
        itemName: itemName,
    };

    const httpResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem) // Send the new item data
    });

    const response = await httpResponse.json();
    console.log(response);

    // Refetch the data to refresh the table
    await getItemsByUsername();
}

// Function to delete an item from the backend
async function deleteItem(itemId, getItemsByUsername) {
    const url = `http://localhost:8080/items/${itemId}`;
    const httpResponse = await fetch(url, {
        method: 'DELETE',
    });

    if (httpResponse.ok) {
        console.log(`Item ${itemId} deleted successfully.`);
        await getItemsByUsername(); // Refetch data to refresh the table
    } else {
        console.error('Failed to delete item');
    }
}

// Function to handle changes in item cells
function handleCellChange(itemId, newValue, userItems, setUserItems) {
    const newData = [...userItems];
    const item = newData.find(i => i.itemId === itemId);
    if (item) {
        item.itemName = newValue;
    }
    setUserItems(newData);
}

// Function to patch (update) item data on the backend
async function patchChanges(itemId, userItems, getItemsByUsername) {
    const url = `http://localhost:8080/items/${itemId}`;
    const itemToUpdate = userItems.find(u => u.itemId === itemId);

    const httpResponse = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemToUpdate)
    });

    const response = await httpResponse.json();
    console.log(response);

    await getItemsByUsername();
}
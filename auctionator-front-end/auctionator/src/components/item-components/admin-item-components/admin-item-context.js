import React, { createContext, useState, useEffect } from 'react';

// Create a context to hold our admin item data and functions
export const AdminItemContext = createContext();

// Context provider component
export function AdminItemProvider({ children }) {
    const { allUserItems, getAllItemsAndUserInfo, setAllUserItems } = useGetAllItemsAndUserInfo();
    const {specificUserItems, getAllItemsByUsername} = useGetAllItemsByUsername();

    const data = {
        allUserItems,
        specificUserItems,
        getAllItemsByUsername,
        addNewItem: (username, itemName) => addNewItem(username, itemName, getAllItemsAndUserInfo),
        deleteItem: (itemId) => deleteItem(itemId, getAllItemsAndUserInfo),
        handleCellChange: (itemId, newValue) => handleCellChange(itemId, newValue, allUserItems, setAllUserItems),
        patchChanges: (itemId) => patchChanges(itemId, allUserItems, getAllItemsAndUserInfo)
    };

    return (
        <AdminItemContext.Provider value={data}>
            {children}
        </AdminItemContext.Provider>
    );
}

// Custom hook to fetch all items and user info
function useGetAllItemsAndUserInfo() {
    const [allUserItems, setAllUserItems] = useState([]);

    // Function to fetch all items and user info from the backend
    async function getAllItemsAndUserInfo() {
        console.log("Getting Items On the Admin Level");
        const url = "http://localhost:8080/all-users/items";
        const httpResponse = await fetch(url); // Make the HTTP request
        const itemList = await httpResponse.json(); // Parse the JSON response
        setAllUserItems(itemList); // Update state with the fetched data
    }

    // Fetch items and user info when the component mounts
    useEffect(() => {
        getAllItemsAndUserInfo();
    }, []);

    // export the objects and data that other functions may need
    return { allUserItems, getAllItemsAndUserInfo, setAllUserItems };
};

// Custom hook to fetch items by username
function useGetAllItemsByUsername() {
    const [specificUserItems, setSpecificUserItems] = useState([]);

    // Function to fetch items by username from the backend
    async function getAllItemsByUsername(username) {
        console.log("Getting Items Based on Username On the Admin Level");
        const url = `http://localhost:8080/${username}/items`;
        const httpResponse = await fetch(url); // Make the HTTP request
        const userItemList = await httpResponse.json(); // Parse the JSON response
        setSpecificUserItems(userItemList); // Update state with the fetched data
    }
    return { getAllItemsByUsername, specificUserItems };
}

// Function to add a new item to the backend
async function addNewItem(username, itemName, getAllItemsAndUserInfo) {
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
    await getAllItemsAndUserInfo();
}

// Function to delete an item from the backend
async function deleteItem(itemId, getAllItemsAndUserInfo) {
    const url = `http://localhost:8080/items/${itemId}`;
    const httpResponse = await fetch(url, {
        method: 'DELETE',
    });

    if (httpResponse.ok) {
        console.log(`Item ${itemId} deleted successfully.`);
        await getAllItemsAndUserInfo(); // Refetch data to refresh the table
    } else {
        console.error('Failed to delete item');
    }
}

// Function to handle changes in item cells
function handleCellChange(itemId, newValue, allUserItems, setAllUserItems) {
    const newData = [...allUserItems];
    const item = newData.find(a => a.itemId === itemId);
    if (item) {
        item.itemName = newValue;
    }
    setAllUserItems(newData);
}

// Function to patch (update) item data on the backend
async function patchChanges(itemId, allUserItems, getAllItemsAndUserInfo) {
    const url = `http://localhost:8080/items/${itemId}`;
    const itemToUpdate = allUserItems.find(a => a.itemId === itemId);

    const httpResponse = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemToUpdate)
    });

    const response = await httpResponse.json();
    console.log(response);

    await getAllItemsAndUserInfo();
}
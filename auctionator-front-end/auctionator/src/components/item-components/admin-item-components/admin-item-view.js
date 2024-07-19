import { useContext, useRef } from "react";
import { AdminItemContext } from "./admin-item-context";
import AdminItemTable from "./admin-item-table";
import AdminSpecificUserItemTable from "./admin-specific-user-item-table";

export default function AdminItemView() {
    const { getAllItemsByUsername, addNewItem } = useContext(AdminItemContext);

    const itemListUsername = useRef(); // Reference to the username input for fetching user-specific items
    const newItemUsername = useRef(); // Reference to the username input for adding a new item
    const newItemName = useRef(); // Reference to the item name input for adding a new item

    // Handle the button click to fetch items by username
    const handleGetUserItems = () => {
        getAllItemsByUsername(itemListUsername.current.value);
        itemListUsername.current.value='';
    };

    // Handle the button click to add a new item
    const handleAddNewItem = async() => {
        const username = newItemUsername.current.value;
        const itemName = newItemName.current.value;
        addNewItem(username, itemName);
    };

    return (
        <div className='mt-5 container'>
            {/* Client Item List */}
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    All Client Item List
                </div>
                <div className="card-body">
                    <AdminItemTable/>
                </div>
            </div>
            <br />
            <br />
            <div className="card">
                <div className="row">
                    <div className="col">
                        <button onClick={handleGetUserItems} className="btn btn-primary col-6">Get Items By Username</button>
                    </div>
                    <div className="col-6">
                        <input type="text" id="usernameInput" placeholder="Find items by a specific user - Provide username" className="form-control" ref={itemListUsername} />
                    </div>
                </div>
            </div>
            <br />
            <br />
            {/* Specific User Item List */}
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Client Item List
                </div>
                <div className="card-body">
                    <AdminSpecificUserItemTable/>
                </div>
            </div>
            <br/>
            <br/>
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Add A New Item
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button onClick={handleAddNewItem} className="btn btn-primary col-3">Submit New Item</button>
                            <div className="ml-auto d-flex">
                                <input
                                    type="text"
                                    id="usernameInput"
                                    placeholder="Username"
                                    className="form-control"
                                    ref={newItemUsername}
                                />
                            </div>
                            <div className="ml-auto d-flex">
                                <input
                                    type="text"
                                    id="itemNameInput"
                                    placeholder="Item Name"
                                    className="form-control"
                                    ref={newItemName}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}
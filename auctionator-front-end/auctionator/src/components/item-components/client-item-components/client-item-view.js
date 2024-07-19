import { useContext, useRef } from "react";
import { ClientItemContext } from "./client-item-context";
import { UserContext } from '../../../UserContext';
import ClientItemTable from "./client-item-table";

export default function ClientItemView() {
    const { addNewItem } = useContext(ClientItemContext);
    const { user } = useContext(UserContext); // Get user from UserContext

    const newItem = useRef(); // Reference to the item name input for adding a new item

    const handleAddNewItem = async () => {
        if (user) {
            await addNewItem(user.username, newItem.current.value);
            newItem.current.value = '';
        } else {
            alert("No user is logged in.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    {user ? `${user.firstName} ${user.lastName}` : "User"} Item List
                </div>
                <div className="card-body">
                    <ClientItemTable />
                </div>
            </div>
            <br />
            <br />
            <div className="card">
                <div className="card-header text-center fw-bold fs-3">
                    Add A New Item
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="d-flex justify-content-between align-items-center col-12">
                            <button className="btn btn-primary col-3" onClick={handleAddNewItem}>Submit New Item</button>
                            <div className="ml-auto d-flex col-5">
                                <input
                                    type="text"
                                    id="itemNameInput"
                                    placeholder="Please input the item's name"
                                    className="form-control"
                                    ref={newItem}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useContext } from 'react';
import { capitalizeWords, changeStatus, EditableCell } from '../utils/item-utility';
import { AdminItemContext } from "./admin-item-context";

export default function AdminItemTable(){
    const { allUserItems, deleteItem, handleCellChange, patchChanges } = useContext(AdminItemContext);

    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Username</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUserItems.map((a, index) => (
                        <tr key={a.itemId}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <EditableCell
                                    value={capitalizeWords(a.itemName)}
                                    onChange={newValue => handleCellChange(a.itemId, newValue)}
                                    onEnter={() => patchChanges(a.itemId)}
                                />
                            </td>
                            <td>{changeStatus(a.sold.toString())}</td>
                            <td>{a.firstName + " " + a.lastName}</td>
                            <td>{a.username}</td>
                            <td>
                                <button 
                                    onClick={() => deleteItem(a.itemId)} 
                                    className="btn btn-danger"
                                    style={{ width: '100%' }}
                                    >
                                        Delete
                                    </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody> 
        </table>
    );
}
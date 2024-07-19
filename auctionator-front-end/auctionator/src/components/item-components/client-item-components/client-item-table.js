import React, { useContext } from 'react';
import { ClientItemContext } from "./client-item-context";
import { capitalizeWords, changeStatus, EditableCell } from "../utils/item-utility";

export default function ClientItemTable() {
    const { userItems, deleteItem, handleCellChange, patchChanges } = useContext(ClientItemContext);
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col" className="text-center">Item Name</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {userItems.map((u, index) => (
                    <tr key={u.itemId}>
                        <th scope="row" className='text-center'>{index + 1}</th>
                        <td className='text-center'>
                            <EditableCell
                                value={capitalizeWords(u.itemName)}
                                onChange={(newValue) => handleCellChange(u.itemId, newValue)}
                                onEnter={() => patchChanges(u.itemId)}
                            />
                        </td>
                        <td className='text-center'>{changeStatus(u.sold)}</td>
                        <td>
                            <button 
                                onClick={() => deleteItem(u.itemId)} 
                                className="btn btn-danger"
                                style={{ width: '100%' }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
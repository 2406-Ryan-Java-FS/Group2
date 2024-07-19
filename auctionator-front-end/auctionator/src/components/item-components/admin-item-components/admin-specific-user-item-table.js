import React, { useContext } from 'react';
import { capitalizeWords, changeStatus } from '../utils/item-utility';
import { AdminItemContext } from "./admin-item-context";

export default function AdminSpecificUserItemTable(){
    const { specificUserItems } = useContext(AdminItemContext);

    return (
        <table className="table table-hover table-striped ">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    specificUserItems.map((s, index) => (
                        <tr key={s.itemId}>
                            <th scope="row">{index + 1}</th>
                            <td>{capitalizeWords(s.itemName)}</td>
                            <td>{changeStatus(s.sold.toString())}</td>
                        </tr>
                    ))
                }
            </tbody> 
        </table>
    );
}
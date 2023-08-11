import { useLoaderData } from "react-router-dom"
import { User } from "../../stores/types"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from "react";
import { colDef } from "./colDefs";
import { ColDef } from "ag-grid-community";

interface RowData {
    id: number
    username: string
    email: string
    posts: number
}


export default function Users() {
    const data = useLoaderData() as User[]
    const [rowData, setRowData] = useState<RowData[]>()
    const [columnDefs] = useState<ColDef[]>(colDef)
    useEffect(() => {
        setRowData(data.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                posts: user.posts.length
            }
        }))
    }, [])

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    console.log(rowData, columnDefs)

    return (
        <div className="ag-theme-material" style={{ height: 400, width: 1000 }}>
            <AgGridReact
                animateRows
                rowData={rowData}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
}

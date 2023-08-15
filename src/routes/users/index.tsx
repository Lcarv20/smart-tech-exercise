import { useLoaderData } from "react-router-dom"
import { User } from "../../stores/types"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { colDef } from "./colDefs";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import { Box, Button, Container, IconButton, SpeedDial } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import "../../components/grid-styles.css"
import { AddItemDialog } from "../../components/AddEntryModal/AddItemDialog";
import { ModalType } from "../../components/AddEntryModal/ModalType";
import AddUser from "../../components/AddEntryModal/AddUserForm";

interface RowData {
    id: number
    username: string
    email: string
    posts: number
}


export default function Users() {
    const [isEdit, setIsEdit] = useState(false)
    const data = useLoaderData() as User[]
    const [rowData, setRowData] = useState<RowData[]>()
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(colDef)
    const gridStyle = useMemo(() => ({ flexGrow: 1, borderRadius: "20px", border: "1px solid black", overflow: "hidden" }), []);
    const onGridReady = useCallback((params: GridReadyEvent) => {
        setRowData(data.map((user) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                posts: user.posts.length
            }
        }))
    }, []);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            // editable: true,
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,

        };
    }, []);

    const gridRef = useRef(null)

    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    }

    useEffect(() => {
        setColumnDefs(colDef(isEdit))
        // console.log("isEdit:", isEdit)
        // if (isEdit && gridRef.current) {
        // } else if(!isEdit && gridRef.current) {
        // }
    }, [isEdit])

    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"} height={"100%"} position={"relative"}>




            {/* Action Bar (edit, delete, ...) */}
            <Box
                borderColor="divider"
                minHeight={"3rem"}
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
            >

                <ActionBar fn={setIsEdit} />
            </Box>





            {/* Grid */}
            <div style={gridStyle} className="ag-theme-material">
                <AgGridReact
                    ref={gridRef}
                    animateRows
                    editType={'fullRow'}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    columnDefs={columnDefs}
                />
            </div>




            {/* Add Record action bar*/}
            <Button
                sx={{
                    width: "fit-content", mt: 1, ml: "auto", "&:hover svg": {
                        transform: "rotate(180deg)",
                        transition: "all 500ms ease-in-out"
                    }
                }}
                onClick={handleOpenDialog}
                startIcon={<AddIcon />}>
                Add record
            </Button>



            {/* Add Entries Modal */}
            <AddItemDialog
                type={ModalType.User}
                handleSubmit={() => console.log("submited")}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <AddUser></AddUser>
            </AddItemDialog>
        </Box>


    );
}

function ActionBar({ fn }: { fn: (isEdit: boolean) => void }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        fn(true)
        setOpen(true)
    };
    const handleClose = () => {
        fn(false)
        setOpen(false);
    }

    const actions = [
        { icon: <FileCopyIcon />, name: 'Copy' },
        { icon: <SaveIcon />, name: 'Save' },
        { icon: <PrintIcon />, name: 'Print' },
        { icon: <ShareIcon />, name: 'Share' },
    ];

    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            direction="left"
            icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon />} />}
            onFocus={undefined}
            sx={{ boxShadow: "none", mb: 1 }}
            FabProps={{
                size: 'small',
                onClick: open ? handleClose : handleOpen,
            }}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    FabProps={{
                        size: 'small',
                    }}
                    sx={{ boxShadow: "1 1 1" }}
                    onClick={() => console.log("Icooooon")}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </SpeedDial>
    )
}


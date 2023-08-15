// export const colDef = [
//     { field: 'id', editable: false, checkboxSelection: false, headerCheckboxSelection: false, width : 60 },
//     { field: 'username', editable: true },
//     { field: 'email', editable: true },
//     { field: 'posts', editable: false },
// ]
//

import { ColDef } from "ag-grid-community"

export const colDef : ColDef[]= (editMode : boolean) => {
    return [
        { field: 'id', editable: false, checkboxSelection: true, headerCheckboxSelection: true, width : 60, hide : !editMode},
        { field: 'username', editable: true },
        { field: 'email', editable: true },
        { field: 'posts', editable: false },
    ] as ColDef[]
}

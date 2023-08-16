// export const colDef = [
//     { field: 'id', editable: false, checkboxSelection: false, headerCheckboxSelection: false, width : 60 },
//     { field: 'username', editable: true },
//     { field: 'email', editable: true },
//     { field: 'posts', editable: false },
// ]
//

export const colDef = (editMode: boolean) => {
  return [
    {
      field: "id",
      editable: false,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60,
      hide: !editMode,
    },
    { field: "username", editable: true },
    { field: "email", editable: true },
    { field: "posts", editable: false },
  ];
};

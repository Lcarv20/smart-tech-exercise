import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { dataFetch } from "../../../functions/requests";
import { UserRes } from "../../../utils/dataTypes";

export default function UsersAutoComplete({
    setAuthorId,
  }: {
    setAuthorId: React.Dispatch<React.SetStateAction<number | null>>;
  }) {
    const [users, setUsers] = useState<UserRes[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>("");
  
    useEffect(() => {
      dataFetch("Users").then((res) => {
        setUsers(res);
      });
    }, []);
  
    const handleChange = (event: SelectChangeEvent<string>) => {
      setSelectedUser(event.target.value);
      setAuthorId(Number(event.target.value));
    };
  
    return (
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Author</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          label="Author"
          onChange={handleChange}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import Form from "../../components/FormWrapper";
import { z } from "zod";

interface AddUserFormProps {
  open: boolean;
  handleSubmit: () => void;
  onClose: () => void;
}

export default function AddUserForm(props: AddUserFormProps) {
  const [nameError, setNameError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const { onClose, open } = props;

  const reset = () => {
    setNameError(false);
    setMailError(false);
    setName("");
    setMail("");
  };

  // ZOD SCHEMAS
  const nameSchema = useMemo(() => z.string().nonempty().min(3), []);
  const mailSchema = useMemo(() => z.string().nonempty().email(), []);

  const handleSubmit = () => {
    console.log(name, mail);

    // Handle here the POST new User
    // fetch (post new user)
    // if ok, add to userRow state

    reset();
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = nameSchema.safeParse(e.target.value);
    if (!val.success) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(e.target.value);
  };

  const handleMailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = mailSchema.safeParse(e.target.value);
    if (!val.success) {
      setMailError(true);
    } else {
      setMailError(false);
    }
    setMail(e.target.value);
  };

  const closeModal = () => {
    onClose()
    reset()
  }

  return (
    <Dialog onClose={closeModal} open={open}>
      <DialogTitle>Add a new user.</DialogTitle>
      <DialogContent>
        <Form>
          <Stack>
            <TextField
              id="standard-basic"
              label="name"
              variant="standard"
              error={nameError}
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              id="standard-basic"
              label="email"
              variant="standard"
              error={mailError}
              value={mail}
              onChange={handleMailChange}
            />
          </Stack>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

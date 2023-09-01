import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { FormDialogContext } from "../../components/Coumpound/BodyCompound";
import { Form } from "react-router-dom";
import { Severity } from "../../stores/snackbarReducer";
import { dataFetch, ReqType } from "../../functions/requests";
import { GridCtx } from "../../components/AGGrid/GridContext";
import { mailSchema, nameSchema } from "./schemas";

export default function TagForm() {
  const [nameErr, setNameErr] = useState(false);
  const [mailErr, setMailErr] = useState(false);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const { isOpen, close } = useContext(FormDialogContext);
  const { gridRef } = useContext(GridCtx);

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = nameSchema.safeParse(e.target.value);
    if (!val.success) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
    setName(e.target.value);
  }

  const handleMail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = mailSchema.safeParse(e.target.value);
    if (!val.success) {
      setMailErr(true);
    } else {
      setMailErr(false);
    }
    setMail(e.target.value);
  }
  
  const handleSubmit = async () => {
    if (!vallidation(nameErr, mailErr)) {
      gridRef?.context.snack("Invalid Submition", Severity.error);
      return;
    }

    const res = await dataFetch("Users", ReqType.post, {
      name,
      email: mail
    });

    if (res.error) {
      gridRef?.context.snack(res.message, Severity.warning);
    } else {
      gridRef?.context.snack(res.message, Severity.success);
    }

    // Apply Transaction
    gridRef?.api.applyTransactionAsync({ add: [res.data] });
    // Proceed here with the api call and show again snackbar
    reset();
  };

  const reset = () => {
    setMail("");
    setName("");
    setNameErr(false);
    setMailErr(false);
    close();
  };

  return (
    <Dialog maxWidth="xs" fullWidth onClose={close} open={isOpen}>
      <DialogTitle>Add New User</DialogTitle>

      <DialogContent>
        <Form>
          <Stack>
            <TextField
              id="standard-basic"
              type="text"
              label="User Name"
              fullWidth
              variant="standard"
              error={nameErr}
              value={name}
              onChange={handleName}
            />

            <TextField
              id="standard-basic"
              type="text"
              label="Email"
              fullWidth
              variant="standard"
              error={mailErr}
              value={mail}
              onChange={handleMail}
            />
          </Stack>
        </Form>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="error" onClick={close}>
          Cancel
        </Button>
        {/* Handle submit here */}
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function vallidation(nameErr: boolean, mailErr: boolean) {
  if (nameErr || mailErr) {
    return false;
  }
  return true;
}

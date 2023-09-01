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
import { tagSchema } from "./schemas";
import { Severity, openSnackbar } from "../../stores/snackbarReducer";
import { useAppDispatch } from "../../stores/hooks";
import { dataFetch, ReqType } from "../../functions/requests";
import { GridCtx } from "../../components/AGGrid/GridContext";

export default function TagForm() {
  const [tagNameErr, setTagNameErr] = useState(false);
  const [tagName, setTagName] = useState("");
  const { isOpen, close } = useContext(FormDialogContext);
  const { gridRef } = useContext(GridCtx);
  const dispatch = useAppDispatch();
  const sBar = (message: string, severity: Severity) =>
    dispatch(openSnackbar({ message, severity }));

  const handleTagName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = tagSchema.safeParse(e.target.value);
    if (!val.success) {
      setTagNameErr(true);
    } else {
      setTagNameErr(false);
    }
    setTagName(e.target.value);
  };

  const validate = (e : React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleTagName(e)
  }

  const handleSubmit = async () => {
    if (!vallidation(tagName, tagNameErr)) {
      sBar("Invalid Submition", Severity.error);
      return;
    }

    const res = await dataFetch("Tags", ReqType.post, {
      name: tagName,
    });
    console.log(res)

    if (res.error) {
      sBar(res.message, Severity.warning);
    } else {
      sBar(res.message, Severity.success);
    }

    // Apply Transaction
    gridRef?.api.applyTransactionAsync({add: [res.data]})

    // Proceed here with the api call and show again snackbar
    reset();
  };

  const reset = () => {
    setTagName("");
    setTagNameErr(false);
    close();
  };

  return (
    <Dialog maxWidth="xs" fullWidth onClose={close} open={isOpen}>
      <DialogTitle>Add New Tag</DialogTitle>

      <DialogContent>
        <Stack>
          <Form>
            <TextField
              id="standard-basic"
              type="text"
              label="Tag Name"
              fullWidth
              variant="standard"
              onBlur={validate}
              error={tagNameErr}
              value={tagName}
              onChange={handleTagName}
            />
          </Form>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="error" onClick={close}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

function vallidation(tagName: string, tagErr: boolean) {
  if (tagErr || tagName.trim().length === 0) return false;
  return true;
}

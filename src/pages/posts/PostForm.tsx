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
import { descriptionSchema, titleSchema } from "./schemas";
import TagsMultiSelect from "./Components/TagsMultiSelect";
import UsersAutoComplete from "./Components/UserSelect";

export default function TagForm() {
  const [title, setTitle] = useState({ title: "", err: false });
  const [description, setDescription] = useState({
    description: "",
    err: false,
  });
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const { isOpen, close } = useContext(FormDialogContext);
  const { gridRef } = useContext(GridCtx);
  const snack = gridRef?.context.snack;

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = titleSchema.safeParse(e.target.value);
    if (!val.success) {
      setTitle({ title: e.target.value, err: true });
    } else {
      setTitle({ title: e.target.value, err: false });
    }
  };

  const handleDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = descriptionSchema.safeParse(e.target.value);
    if (!val.success) {
      setDescription({ description: e.target.value, err: true });
    } else {
      setDescription({ description: e.target.value, err: false });
    }
  };

  const handleSubmit = async () => {
    // verify title and description
    if(!vallidation(title.err, description.err, authorId)) {
      snack("Invalid data", Severity.error);
      return
    }

    const res = await dataFetch("Posts", ReqType.post, {
      title: title.title,
      description: description.description,
      userId: authorId,
      tagIds: tagIds,
    });

    if (res.error) {
      snack(res.message, Severity.warning);
    } else {
      snack(res.message, Severity.success);
    }

    // Apply Transaction
    gridRef?.api.applyTransactionAsync({ add: [res.data] });

    // Proceed here with the api call and show again snackbar
    reset();
  };

  const reset = () => {
    setTitle({ title: "", err: false });
    setDescription({ description: "", err: false });
    setAuthorId(null);
    setTagIds([]);
    close();
  };

  return (
    <Dialog maxWidth="xs" fullWidth onClose={close} open={isOpen}>
      <DialogTitle>Add New Post</DialogTitle>

      <DialogContent>
        <Form>
          <Stack spacing={2}>
            <TextField
              id="standard-basic"
              type="text"
              label="Title"
              fullWidth
              variant="standard"
              error={title.err}
              value={title.title}
              onChange={handleTitle}
            />
            <TextField
              id="standard-basic"
              type="text"
              label="Description"
              fullWidth
              variant="standard"
              error={description.err}
              value={description.description}
              onChange={handleDescription}
            />
            <UsersAutoComplete setAuthorId={setAuthorId} />
            <TagsMultiSelect setTagIds={setTagIds} />
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

function vallidation(titleErr : boolean, descriptionErr : boolean, authorID : number | null) {
  if (titleErr || descriptionErr || authorID === null) {
    return false;
  }
  return true
}


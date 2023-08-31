import {
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Form from "../../components/FormWrapper";
import { dataFetch } from "../../functions/requests";
import { mailSchema, nameSchema } from "./schemas";
// import { RowData } from "./colDefs";
import { UserRes } from "../../utils/dataTypes";

interface AddUserFormProps {
  open: boolean;
  closeHandler: () => void;
  updateStateHandler: React.Dispatch<
    React.SetStateAction<UserRes[] | undefined>
  >;
}

export default function useUserForm({
  closeHandler,
  updateStateHandler,
}: AddUserFormProps) {
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setNameErr(false);
    setEmailErr(false);
    setName("");
    setEmail("");
  };

   const handleSubmit = async () => {
    if (!validateSubmission(name, email, nameErr, emailErr)) {
      alert("Invalid data");
      return;
    }

    closeHandler();

    console.log(name, email);
    // 1. Post to API new user
    const res = await dataFetch("Users", "POST", {
      name,
      email,
    });

    // Handle error properly
    if (res.Error) {
      console.log(res.Error);
      alert(res.Message);
    } else {
      console.log(res);
      const { email, posts, id, username } = res.data;
      // Refactor my code to be more DRY
      updateStateHandler((state) => {
        console.log("Statatata", state);
        return [
          ...(state ?? []),
          {
            id,
            username,
            email,
            posts: posts ?? [],
          },
        ];
      });
    }
    reset();
  };

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = nameSchema.safeParse(e.target.value);
    if (!val.success) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
    setName(e.target.value);
  };

  const handleMail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const val = mailSchema.safeParse(e.target.value);
    if (!val.success) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    setEmail(e.target.value);
  };

  return (
        <Form>
          <Stack>
            <TextField
              id="standard-basic"
              type="text"
              label="name"
              variant="standard"
              error={nameErr}
              value={name}
              onChange={handleName}
            />
            <TextField
              id="standard-basic"
              type="email"
              label="email"
              variant="standard"
              error={emailErr}
              value={email}
              onChange={handleMail}
            />
          </Stack>
        </Form>
  );
}

function validateSubmission(
  nameErr: boolean,
  emailErr: boolean,
) {
  if (nameErr || emailErr) {
    return false;
  }
  return true;
}

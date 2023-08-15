import { Stack, TextField } from '@mui/material'
import Form from './FormWrapper'

export default function AddUser() {
  return (
    <Form>
      <Stack>
        <TextField id="standard-basic" label="name" variant="standard" />
        <TextField id="standard-basic" label="email" variant="standard" />
      </Stack>
    </Form>
  )
}

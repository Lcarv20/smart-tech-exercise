import { TextField } from '@mui/material'
import { Form } from 'react-router-dom'

export default function AddPost() {
  return (
    <Form>
      <TextField id="standard-basic" label="email" variant="standard" />
      <TextField id="standard-basic" label="title" variant="standard" />
      <TextField id="standard-basic" label="content" variant="standard" />
      <TextField id="standard-basic" label="tags" variant="standard" />
    </Form>
  )
}

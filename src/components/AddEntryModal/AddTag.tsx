import { TextField } from '@mui/material'
import { Form } from 'react-router-dom'

export default function AddTag() {
  return (
    <Form>
      <TextField id="standard-basic" label="name" variant="standard" />
    </Form>
  )
}

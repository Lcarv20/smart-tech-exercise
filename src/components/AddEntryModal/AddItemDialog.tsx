import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ModalType } from "./ModalType"

interface AddItemDialogProps {
  type: ModalType
  open: boolean
  children : React.ReactNode
  onClose: () => void
  handleSubmit: () => void
}

export function AddItemDialog(props: AddItemDialogProps) {
  const { type, onClose, open, children: inputs, handleSubmit } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Add a new {type}</DialogTitle>
      <DialogContent>
        {inputs}
        {/* <SmartFields type={type} /> */}
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="error" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}


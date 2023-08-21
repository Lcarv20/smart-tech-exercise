import { Button } from "@mui/material";
import { useAppDispatch } from "../../stores/hooks";
import { Severity, openSnackbar } from "../../stores/snackbarReducer";

export default function Home() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(
      openSnackbar({
        open: true,
        message: "This is a warning",
        severity: Severity.warning,
      }),
    );
  };
  return (
    <div>
      Home
      <Button onClick={handleClick}>TriggerSnack</Button>
    </div>
  );
}

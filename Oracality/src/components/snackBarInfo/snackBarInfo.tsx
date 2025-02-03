import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Alert } from "@mui/material";
import { DefaultIcons } from "../../utils/defaultIcons";
import { SnackBarType } from "../../types/SnackBarType";

interface Props {
  message: string;
  type: SnackBarType;
  toOpen: boolean;
  handleClose: () => void;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
}

export function SnackBarInfo(props: Props) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
      >
        <DefaultIcons.Close />
      </IconButton>
    </React.Fragment>
  );
  const snackBarClass =
    props.type === "success"
      ? "snackbar-success"
      : props.type === "error"
      ? "snackbar-error"
      : "snackbar-info";
  return (
    <div>
      <Snackbar
        className={snackBarClass}
        anchorOrigin={
          props.vertical && props.horizontal !== undefined
            ? { vertical: props.vertical, horizontal: props.horizontal }
            : { vertical: "top", horizontal: "center" }
        }
        open={props.toOpen}
        autoHideDuration={4000}
        onClose={props.handleClose}
        message={props.message}
        action={action}
      >
        <Alert severity={props.type}>{props.message}</Alert>
      </Snackbar>
    </div>
  );
}

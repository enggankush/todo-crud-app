import Snackbar from "@mui/material/Snackbar";
import Alert, { type AlertColor } from "@mui/material/Alert";
import type { SyntheticEvent } from "react";

interface CustomAlertProps {
  openAlert: boolean;
  severity: AlertColor;
  alertMsg: string;
  handleClose: (event?: SyntheticEvent | Event, reason?: string) => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  openAlert,
  severity,
  alertMsg,
  handleClose,
}) => {
  return (
    <div>
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default CustomAlert;

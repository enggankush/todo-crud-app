import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomAlert = ({ openAlert, severity, alertMsg, handleClose }) => {

    return (
        <div>
            <Snackbar
                open={openAlert}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alertMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
export default CustomAlert

import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { AppContext } from '../../provider/index.provider';
import { Slide } from '@mui/material';
import { SlideProps } from '@mui/material/Slide'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}


export default function CustomAlert() {
    const {appState, setAppState}= React.useContext(AppContext)
    
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAppState({...appState, alert: {...appState.alert, open: false}})
    };

    return (
        <>
            <Snackbar TransitionComponent={TransitionDown} open={appState.alert.open} ContentProps={{sx: {background: "transparent", color: "red", border: null, outline: null, boxShadow: null}}} anchorOrigin={{ vertical : 'top', horizontal : 'right' }} autoHideDuration={2000} onClose={handleClose} message={""} >
                <Alert onClose={handleClose} severity={appState.alert.type} sx={{ width: '100%', maxWidth: "800px" }}>
                    {appState.alert.message}
                </Alert>    
            </Snackbar>
        </>
    );
}
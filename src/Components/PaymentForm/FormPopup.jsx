import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



export default function NewKeyGenerationPopup({...props}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    props.setOpen(false);
  };


  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Generate new Keys"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
             If you have any previous keys, It will be get deactivated.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={props.handleGenerateKeys} autoFocus>
            Agree
          </Button>
        </DialogActions>

        <p style={{display:'flex', justifyContent:'center', alignItems:'center', color:'green'}}>{props.success && props.success}</p>

      </Dialog>
    </React.Fragment>
  );
}

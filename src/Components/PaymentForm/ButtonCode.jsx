import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Box, Typography } from '@mui/material';


const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let CheckoutURL = '';




if (IS_DEVELOPMENT === 'True') {
    CheckoutURL = 'http://localhost:5173/PaymentButton/checkout.js'
} else {
    CheckoutURL = 'https://react-payment.oyefin.com/PaymentButton/checkout.js'
};





// Popup Modal
export default function PaymentButtonCode({open, setOpen, buttonID}) {
  const handleClose = () => setOpen(false);

  // Method to copy the html content
  const handleCopy = () => {
    navigator.clipboard.writeText('<form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-key="your_key"></script></form>');
    alert('Code copied to clipboard');
  };

  const CodeSnipet = `<form><script src="${CheckoutURL}" data-payment_button_id="${buttonID}"></script></form>`


  return (
    <div>
      
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 200 }}>
            
        <div>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Copy Button Code
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                <Typography>Your payment button is ready to go!</Typography>
                <small style={{fontSize:'11px'}}>Copy and paste the HTML inside your code</small>

                <Box mt={2}>
                    <Typography variant="body1">HTML Code</Typography>
                    <TextField
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue={CodeSnipet}
                    InputProps={{
                        endAdornment: (
                        <IconButton onClick={handleCopy}>
                            <ContentCopyIcon />
                        </IconButton>
                        ),
                    }}
                    />
                </Box>
                <Box mt={2}>
                    <a href="#" target="_blank" rel="noopener noreferrer">See documentation</a>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Back to Dashboard
                </Button>
                </DialogActions>
            </Dialog>
            </div>

        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'base-Backdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);

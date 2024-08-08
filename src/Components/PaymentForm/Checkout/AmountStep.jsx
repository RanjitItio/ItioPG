import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';



// Currency sign according to the Currency name
const getStartDecorator = (currency) => {
    if (currency === 'USD') {
      return '$';
    } else if (currency === 'EUR') {
      return '€';
    } else if (currency === 'GBP') {
      return '£';
    } else if (currency === 'INR') {
        return '₹'
    } else if (currency === 'yen') {
        return '¥'
    } else {
      return '';
    }
  };




// Payment form amount step
export default function PaymentFormAmountStep({current, steps, setCurrent, amountDetails, handleStepValueChange, formValue}) {
    const [open, setOpen] = useState(true);  // state to keep open the Dialogue box


    // Method to close the Dialogue box
    const handleClose = () => {
        setOpen(false);
      };

    // Redirect to next step
    const handleNext = ()=> {
        setCurrent(current + 1)
    };
    

    return (
        <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{style: {height: 600, borderRadius: 10}}}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6">Amount Details</Typography>
                    <Box flexGrow={1} />

                    <Box>
                        <IconButton aria-label="Example" onClick={handleClose}>
                            <ClearIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent>
            <Box display="flex" flexDirection="column" height="100%">
                <Box flexGrow={1}>
                    <Box mb={2}>
                        <Typography variant="h6">{amountDetails.businessName ? amountDetails.businessName : 'Business Name'}</Typography>
                    </Box>
                    {amountDetails.isFixedAmount && (
                        <>
                            <label htmlFor="fixedAmount">{amountDetails.fixedAmountLabel}</label>
                            <TextField 
                                margin="dense"
                                id='fixedAmount'
                                label={amountDetails.fixedAmountLabel}
                                type="number"
                                value={amountDetails.fixedAmount ? amountDetails.fixedAmount : 0.00}
                                fullWidth
                                required
                                disabled
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            {getStartDecorator(amountDetails.fixedAmountCurrency)}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </>
                    )}

                    {amountDetails.isCustomerAmount && (
                        <>
                            <label htmlFor="customerDecidedAmount">{amountDetails.customerAmountLabel}</label>
                            <TextField 
                                id='customerDecidedAmount'
                                name='customerAmt'
                                margin="dense"
                                label={amountDetails.customerAmountLabel}
                                type="number"
                                fullWidth
                                required
                                onChange={handleStepValueChange}
                                // value={formValue.customerAmt}
                                InputProps={{
                                    startAdornment:(
                                        <InputAdornment position="start">
                                            {getStartDecorator(amountDetails.customerAmountCurrency)}
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </>
                    )}
                    
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={0}>

                    <Typography variant="h6">
                        {getStartDecorator(amountDetails.fixedAmountCurrency)} 
                        {amountDetails.fixedAmount + amountDetails.customerAmount}
                    </Typography>

                    {current < steps.length - 1 && (
                        <Button variant="contained" size='large' color="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                    
                </Box>
            </Box>
            </DialogContent>
        </Dialog>
    );
};



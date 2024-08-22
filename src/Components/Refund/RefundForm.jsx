import { Box, Checkbox, FormControlLabel,
         TextField, Typography,
  } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Textarea from '@mui/joy/Textarea';
import axiosInstance from '../Authentication/axios';
import { useState, useEffect } from 'react';





// Refund form
export default function RefundFrom({open, handleClose, refundTransactionData}) {
    const [error, setError]                       = useState();  // Error Message
    const [sumInstantRefund, setSumInstantRefund] = useState(0); // Instant Refund total Amount
    const [refundAmount, updateRefundAmount]      = useState(parseFloat(refundTransactionData.amount));  // Refund Amount
    const [instantRefund, setInstantRefund]       = useState(false); // Instant Refund value
    const [visibleComment, setVisibleComment]     = useState(false);
    const [formError, updateFormError]            = useState('');   // Form input error
    const [commentData, updateCommentData]        = useState('');  // Comment Input
    const [successMessage, setSuccessMessage]     = useState('');



    // Update refund Amount value when the page loads
    useEffect(() => {
        updateRefundAmount(refundTransactionData?.amount)
    }, [open]);


   
    // Merchant input
    const handleMerchantRefundInput = (e)=> {
        const {value} = e.target

        if (value > refundTransactionData.amount) {
            setError('Please enter amount less than or equal to Transaction amount')
            updateRefundAmount(parseFloat(value));
        } else{
            setError('');
            updateRefundAmount(parseFloat(value));
        }
    };

    // Get merchant input comments
    const handleChangeCommentData = (e)=> {
        const { value } = e.target;

        updateCommentData(value);
    };
    
    // Update Instant Refund Total Amount
    const handleInstantRefund = (e)=> {
        const {checked} = e.target

        if (checked) {
            const transactionAmount = refundTransactionData.amount
            const totalAmount       = transactionAmount + 25
            setSumInstantRefund(totalAmount);
            setInstantRefund(true);
        } else {
            setInstantRefund(false);
        }
    };


    // Visible Comment section
    const handleVisibleComment = ()=> {
        setVisibleComment(true);
    };

    
    // Call API and Initiate New refund request
    const handleInitiateRefund = ()=> {
        if (refundAmount === 0){
            updateFormError('Please type refund amount');
        } else {
            updateFormError('')

            axiosInstance.post(`/api/v6/merchant/refund/`, {
                transaction_id: refundTransactionData?.transaction_id || '',
                refund_amt:     parseFloat(refundAmount),
                comment:        commentData
                // instant_refund: instantRefund,

            }).then((res)=> {
                console.log(res)

                if (res.status === 201) {
                    setSuccessMessage('Refund Created successfully');

                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 1000);
                }

            }).catch((error)=> {
                console.error(error)

                if (error.response.data) {
                    updateFormError(error.response.data.message)
                } else {
                    updateFormError('')
                }
            })
        }
    };


/// Assign Currency Icon according to the Currency
  const getCurrencyIcon = (currency) => {
   switch (currency) {
      case 'USD':
         return '$'
      case 'INR':
         return '₹'
      case 'EUR':
         return '€'
      case 'GBP':
         return '£'
      default:
         break;
   }
};


  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:'#eeeff1'}}>
          {"Initiate Refund"}
        </DialogTitle>
        
        <DialogContent>
            <Typography sx={{mt:2}} variant="body2" color="textSecondary" gutterBottom>
                Maximum refund allowed: {getCurrencyIcon(refundTransactionData?.currency)}{parseFloat(refundTransactionData?.amount).toFixed(2)}
            </Typography>

            &nbsp;
            <Box display="flex" alignItems="center" mb={2}>
            <TextField
                label="Refund Amount"
                fullWidth
                variant="outlined"
                defaultValue={`${parseFloat(refundTransactionData?.amount).toFixed(2)}`}
                onChange={(e)=> {handleMerchantRefundInput(e); }}
                error={Boolean(error)}
                helperText={error}
                InputProps={{
                startAdornment: <Typography variant="h6">{getCurrencyIcon(refundTransactionData?.currency)}</Typography>,
                }}
            />
            </Box>

            {/* <FormControlLabel
                control={<Checkbox defaultChecked onClick={handleInstantRefund} />}
                label={
                    <Box display="flex" alignItems="center">
                    <Typography variant="body1">Instant Refund</Typography>
                    <Typography variant="body2" color="textSecondary">
                        &nbsp;₹ 25.00 Fee
                    </Typography>
                    </Box>
                }
                /> */}


                {/* {instantRefund && 
                    <Box mt={1} mb={2}>
                        <Typography variant="body2" color="textSecondary">
                            Amount to be deducted from your account: {getCurrencyIcon(refundTransactionData?.currency)}{sumInstantRefund}
                        </Typography>
                    </Box>
                } */}

            <Box>
                <Button variant="text" color="primary" onClick={handleVisibleComment}>
                    + Add Remark
                </Button>

                {visibleComment && 
                <Textarea 
                    minRows={3} 
                    onChange={handleChangeCommentData}
                    size="sm" 
                    name="Size" 
                    placeholder="Comment..." 
                    color="primary" 
                    variant="outlined" 
                    />
                }
            </Box>

        {/* Error Message */}
        <small style={{color:'red'}}>{formError && formError}</small>

        {/* Success Message */}
        <small style={{color:'green'}}>{successMessage && successMessage}</small>

        <DialogActions sx={{mt:0}}>
            <Button onClick={handleClose} color="secondary">
                Cancel
            </Button>

            <Button
            variant="contained"
            color="primary"
            onClick={handleInitiateRefund}
            >
                Initiate Refund of {getCurrencyIcon(refundTransactionData?.currency)}{refundAmount}
            </Button>
        </DialogActions>

        {/* {instantRefund && 
        <Box textAlign="center" mt={2} mb={2}>
            <Typography variant="caption" color="textSecondary">
                Refund will be processed instantly.
            </Typography>
        </Box>
        } */}
        
        </DialogContent>

      </Dialog>
    </React.Fragment>
    );
}

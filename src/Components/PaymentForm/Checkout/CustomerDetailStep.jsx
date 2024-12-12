import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import axiosInstance from '../../Authentication/axios';
import calculateSha256 from '../../GenerateID/encode';



const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let paymentURL = '';



// URL according to the environment
if (IS_DEVELOPMENT === 'True') {
    paymentURL = 'http://127.0.0.1:8000'
} else {
    paymentURL = 'https://python-uat.oyefin.com'
};



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



// Customer Details step
export default function PaymentFormCustomerDetailStep({current, steps, amountDetails, 
    handleStepValueChange, formValue, phoneNumberError, emailError}) {

    const [open, setOpen]                    = useState(true);  // State to keep open the Dialoguebox
    const [merchantKeys, updateMerchantKeys] = useState([]);
    const [error, setError]                  = useState(''); // Error Message
    const [disableButton, setDisableButton]  = useState(false); // Disable Button

    const totalAmount = amountDetails?.fixedAmount + formValue?.customerAmt // Total Amount

    // console.log('amountDetails', amountDetails.redirectURL)

    // Close the step
    const handleClose = () => {
        setOpen(false);
      };

    // Fetch Public key and Secret keys
    useEffect(() => {
        axiosInstance.get(`/api/merchant/payment/forms/keys/?form_id=${amountDetails.button_id}`).then((res)=> {
            // console.log(res)
            if(res.status === 200 && res.data.success === true) {
                updateMerchantKeys(res.data.merchant_keys);
            };

        }).catch((error)=> {
            // console.log(error)

        })
    }, []);




    // Send Payment Request
    const handlePaymentCheckout = ()=> {
        if (formValue.email === '') {
            setError('Please type your Email ID')

        } else if (formValue.phoneno === '') {
            setError('Please provide your Phone Number')

        } else {
            setError('')
            setDisableButton(true)

            // Call API for payment
            const MAINPAYLOAD = {
                // Public Key
                "merchantPublicKey": merchantKeys.public_key,  // Local Public Key
                // Secret Key
                "merchantSecretKey": merchantKeys.secret_key,   // Local Secret Key
                // Merchant order Id
                "merchantOrderId": amountDetails.button_id,     
    
                'currency': amountDetails.fixedAmountCurrency ? amountDetails.fixedAmountCurrency : amountDetails.customerAmountCurrency,
                
                "amount": totalAmount * 100,   // Multiplied by 100
    
                "redirectUrl": amountDetails.redirectURL ? amountDetails.redirectURL : 'redirect URL',

                "BusinessName": amountDetails.businessName ? amountDetails.businessName : "",
    
                "callbackUrl": "Webhook url",
    
                "mobileNumber": formValue.phoneno ? formValue.phoneno : "9999999999",
    
                "paymentInstrument": {
                    "type": "PAY_PAGE"   
            }
        };
    
        const index = '1'
        const ENDPOINT     = "/api/pg/prod/v1/pay/"
        const SECRET_KEY   = merchantKeys.secret_key
        const base64String = btoa(JSON.stringify(MAINPAYLOAD))
        const mainString   = base64String + ENDPOINT + SECRET_KEY
        const sha256Val    = calculateSha256(mainString)
        const checkSum     = sha256Val + '****' + index
    
            axiosInstance.post(`${paymentURL}/api/pg/prod/v1/pay/?form_id=y1w`, {
                request: base64String
            }, {
                headers: {
                    'X-AUTH': checkSum
                }
            }).then((res)=> {
                const redirect_url = res.data.data.instrumentResponse.redirectInfo.url
                  // Redirect to the API response url
                window.location.href = redirect_url
    
            }).catch((error)=> {
                // console.log(error)
                // console.log(error)
                setDisableButton(false);
    
                if (error.response.data.error.message === 'No Active Acquirer available, Please contact administration') {
                    alert('No acquirer asigned please contact administrator')
                } else if (error.response.data.error.message === 'Invalid Currency: Only USD Accepted') {
                    alert('Invalid Currency Only USD accepted, Sorry for the Inconvinience')
                } else if (error.response.data.error.message === 'Amount should be greater than 0') {
                    alert('Amount should be greater than Zero')
                } else if (error.response.data.error.message == 'Invalid merchantPublicKey') {
                    alert('Invalid merchantPublicKey')
                } else if (error.response.data.error.message == 'Inactive key, Please contact administrations') {
                    alert("Inactive key, Please contact administrations")
                }
    
            })
        };
    };

    

    return (
        <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{style: {height: {xs: 400, sm: 600}, borderRadius: 10}}}>
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
                        <Typography variant="h6">{amountDetails.businessName}</Typography>
                    </Box>
                        {/* <label htmlFor="email">{amountDetails.emailLabel}</label> */}
                        <TextField 
                            margin="dense"
                            label={amountDetails.emailLabel}
                            type="email"
                            id='email'
                            name='email'
                            fullWidth
                            required
                            onChange={handleStepValueChange}
                            value={formValue.email}
                            error={!!emailError}
                            helperText={emailError}
                        />

                        {/* <label htmlFor="phoneno">{amountDetails.phoneNoLable}</label> */}
                        <TextField 
                            margin="dense"
                            label={amountDetails.phoneNoLable}
                            type="number"
                            fullWidth
                            required
                            id='phoneno'
                            name='phoneno'
                            onChange={handleStepValueChange}
                            value={formValue.phoneno}
                            error={!!phoneNumberError}
                            helperText={phoneNumberError}
                        />
                </Box>
                {<Typography variant='p' sx={{color:'red'}}>{error && error}</Typography>}

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="h6">{getStartDecorator(amountDetails.fixedAmountCurrency ? amountDetails.fixedAmountCurrency : amountDetails.customerAmountCurrency)} 
                        {parseInt(amountDetails.fixedAmount) + parseInt(formValue.customerAmt)}
                    </Typography>

                    {current === steps.length - 1 && (
                        <Button 
                            variant="contained" 
                            size='medium' 
                            color="primary" 
                            onClick={handlePaymentCheckout}
                            disabled={disableButton}
                            >
                            Proceed to Pay
                        </Button>
                    )}
                </Box>
            </Box>
            </DialogContent>
        </Dialog>
    );
};
import TextField from '@mui/material/TextField';
import { List, ListItem, Collapse, Box, Typography } from '@mui/material';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import QRCode from 'qrcode.react';
import React from 'react';
import TestFooterSection from './Footer';
import axiosInstance from '../Authentication/axios';



// UPI QR Code payment Processing
export default function TestUPIQRCOde ({...props}) {
    const upiID = 'sahooranjitkumar53@ybl'
    const qrValue = `upi://pay?pa=${upiID}&pn=Ranjit%20Kumar&am=1`;
    
    const [openMibileBox, setOpenMobileBox] = useState(false);   // Open UPI ID field state 
    const [checked, updateChecked]          = useState(false);  // Clcked the UPI button
    const [upiIDField, updateUPIIDField]    = useState('');    // UPI ID Value sate
    const [upiError, setUPIError]           =  useState('');  // Invalid UPI field state
    const [error, setError]                 = useState('');  // Error state


    // Clicked on the UPI box
    const handleUPIMobileNoClick = ()=> {
        setOpenMobileBox(!openMibileBox);
        updateChecked(!checked);
    };

    // UPI Pay button clicked
    const handleSubmitUPIPayment = ()=> {
        if (upiIDField === '') {
            setError('Please fill in the UPI ID')

        } else {
            setError('');
            props.setLoadingButton(true)

            const PAYLOAD = {
                upi_id: upiIDField,
                MerchantOrderId: props.merchantOrderID,
                paymentMode: 'UPI'
            }

            const encoded_base64 = btoa(JSON.stringify(PAYLOAD))

            // Call API to process the transaction
            axiosInstance.post(`/api/v1/pg/sandbox/merchant/process/transactions/`, {
                request: encoded_base64

            }).then(async (res)=> {
                // console.log(res.data)

                // If Success status received
                if (res.status === 200 && res.data.status === 'PAYMENT_SUCCESS') {
                    let redirectUrl = res.data.merchantRedirectURL

                    setTimeout(() => {
                        window.location.href = `/merchant/payment/success/?url=${redirectUrl}`
                    }, 2000);
                }

                // If failed status received
                else if (res.status === 200 && res.data.status === 'PAYMENT_FAILED') {
                    let redirectUrl = res.data.merchantRedirectURL

                    setTimeout(() => {
                        window.location.href = `/merchant/payment/fail/?url=${redirectUrl}`
                    }, 2000);
                }

            }).catch((error)=> {
                console.log(error)

                if (error.response) {
                    if (error.response.data.error === 'Transaction has been closed') {
                        setError('Transaction Closed')
                        props.setLoadingButton(false); 
                    } else if (error.response.data.error === 'Please initiate transaction') {
                        setError('Please reinitiate Transaction')
                    } else if (error.response.data.error === 'Merchant Public key not found') {
                        setError('Invalid merchantPublicKey')
                    } else {
                        setError('')
                    };
                };
            })
            // Finish API part
        }
    };

    // UPI ID capture
    const handleUPIChange = (e)=> {
        let upiValue =  e.target.value
        const upiIdRegex = /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/;

        // Validate the formt of the input as upi ID
        if (upiIdRegex.test(upiValue)) {
            updateUPIIDField(upiValue)
            props.setDisablePayButton(false);
            setUPIError('')

        } else {
            setUPIError('Invalid UPI ID')
        }
    };

    return (
        <>
        <div style={{marginBottom: '100px'}}>

           <small>Pay with UPI ID / Mobile Number</small>
           <List sx={{background: '#f5f5f5', marginBottom: '40px'}}>
                <ListItem button onClick={handleUPIMobileNoClick} sx={{display:'flex',justifyContent: 'space-around',alignItems: 'center'}}>
                   
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/bhim.svg' style={{ width: '25px', height: '25px' }}/>
                            <small style={{ marginLeft: '8px' }}>UPI ID / Mobile Number</small>
                        </div>
                        <Checkbox
                            checked={checked}
                            onChange={handleUPIMobileNoClick}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                </ListItem>
                <Collapse in={openMibileBox} timeout='auto' unmountOnExit>
                    <TextField 
                        size='small' 
                        id="upiID" 
                        label="UPI ID" 
                        variant="outlined" 
                        // value={upiIDField}
                        onChange={handleUPIChange}
                        fullWidth 
                        autoFocus
                        sx={{width: '80%', marginLeft: '10%'}}
                        error={Boolean(upiError)}
                        helperText={upiError}
                        />
                </Collapse>
                
            </List>

            <small>Pay with UPI QR</small>

            <Box sx={{border:'1px solid black'}}>
                <Box 
                    border={1} 
                    borderColor="grey.300" 
                    borderRadius={4} 
                    padding={2} 
                    display="flex" 
                    alignItems="center"
                    flexDirection={{ sm: 'row'}}
                >
                    <Box>
                        <QRCode value={qrValue} size={120} />
                    </Box>
                    <Box marginLeft={2}>
                        <small>Scan the QR using any UPI app on your phone.</small>

                        <Box display="flex" alignItems="center" marginTop={2} marginBottom={2}>
                            <img src="https://python-uat.oyefin.com/media/PaymentPics/googlepay.svg" alt="" style={{ height: 15, marginRight: 1 }} />
                            <img src="https://python-uat.oyefin.com/media/PaymentPics/phonepe.svg" alt="" style={{ height: 15, marginRight: 1 }} />
                            <img src="https://python-uat.oyefin.com/media/PaymentPics/bhim.svg" alt="" style={{ height: 15, marginRight: 1 }} />
                            <img src="https://python-uat.oyefin.com/media/PaymentPics/paytm.svg" alt="" style={{ height: 15, marginRight: 1 }} />
                            <img src="https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png" alt="" style={{ height: 15, marginRight: 1 }} />
                        </Box>

                        <Typography variant="body2" color="textSecondary">
                            QR Code is valid for <span style={{ color: 'red' }}>7:55</span> minutes
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>

        {error && 
                <p style={{color: 'red', display: 'flex', 
                            justifyContent: 'center', alignItems:'center'}}
                        >
                    {error}
                </p>
            }

            {/* Footer Section */}
            <TestFooterSection 
               merchantTransactionAmount={props.merchantTransactionAmount}
               merchantTransactionCurrency={props.merchantTransactionCurrency}
               disblePayButton={props.disblePayButton}
               handleSubmitUPIPayment={handleSubmitUPIPayment}
               loadingButton={props.loadingButton}
            />
            </>
    )
}
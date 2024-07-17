import TextField from '@mui/material/TextField';
import { List, ListItem, Collapse, Box, Typography } from '@mui/material';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import QRCode from 'qrcode.react';
import React from 'react';




export default function TestUPIQRCOde () {
    const upiID = 'sahooranjitkumar53@ybl'
    const qrValue = `upi://pay?pa=${upiID}&pn=Ranjit%20Kumar&am=1`;
    
    const [openMibileBox, setOpenMobileBox] = useState(false);
    const [checked, updateChecked] = useState(false);

    const handleUPIMobileNoClick = ()=> {
        setOpenMobileBox(!openMibileBox);
        updateChecked(!checked);
    };


    return (
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
                        id="upiID/MobileNo" 
                        label="UPI ID / MobileNo" 
                        variant="outlined" 
                        fullWidth 
                        autoFocus
                        sx={{width: '80%', marginLeft: '10%'}}
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
    )
}
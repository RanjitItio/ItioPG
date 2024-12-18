import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import { QrCode, CreditCard, AccountBalance, AccountBalanceWallet, Payment } from '@mui/icons-material';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import FooterSection from './Footer';





// All the payment options
export default  function AllPaymentPage({...props}) {
    const upiID = 'sahooranjitkumar53@ybl'  // default qr value
    const qrValue = `upi://pay?pa=${upiID}&pn=Ranjit%20Kumar&am=1`;

    const [upiPayment, setUPIPayment] = useState(false);
    const [cardPayment, setCardPayment] = useState(false);

    // Method to open UPI QR Page
    const handleUPIQRClick = ()=> {
        props.setUPIQRPage(true);
        props.setAllPayment(false);
    };

     // method to open Card page
    const handleCardClicked = ()=> {
        props.setCardDetails(true);
        props.setAllPayment(false);
    };


    // Check payment Modes of the pipes
    useEffect(() => {
        props.merchantPipes.forEach(pipe => {
            if (pipe.payment_medium === 'Card') {
                setCardPayment(true);
            }
            if (pipe.payment_medium === 'UPI') {
                setUPIPayment(true);
            }
        });
    }, [props.merchantPipes])
    


    return (
        <Card sx={{marginTop: -1.7}}>
            <CardContent>
                <Box sx={{maxHeight: '80vh', overflowY: 'auto'}}>

                    <Typography variant="p" component="div"  my={1}>
                        <b>Pay With UPI QR</b>
                    </Typography>
                    
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
                                QR Code is valid for <span style={{ color: 'red' }}>{props.formatTime(props.timer)}</span> minutes
                            </Typography>
                        </Box>
                    </Box>

                    <List>
                        {/* UPI Payment */}
                        {upiPayment ?
                            <> 
                                <ListItem button onClick={handleUPIQRClick}>
                                <ListItemIcon>
                                    <QrCode />
                                </ListItemIcon>
                                <ListItemText primary="UPI / QR" />
                                
                                <img src='https://python-uat.oyefin.com/media/PaymentPics/googlepay.svg' style={{width:'15px', height: '15px'}} />
                                <img src='https://python-uat.oyefin.com/media/PaymentPics/phonepe.svg' style={{width:'15px', height: '15px'}} />
                                <img src='https://python-uat.oyefin.com/media/PaymentPics/bhim.svg' style={{width:'15px', height: '15px'}} />
                                <img src='https://python-uat.oyefin.com/media/PaymentPics/paytm.svg' style={{width:'15px', height: '15px'}} />
                                <img src='https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png' style={{width:'15px', height: '15px'}} />
                    
                                </ListItem>
                                <Divider component="li" />
                        </>
                        : 
                        ''}
                        
                        {/* Card Payment */}
                        {cardPayment ? 
                            <>
                            <ListItem button onClick={handleCardClicked}>
                            <ListItemIcon>
                                <CreditCard />
                            </ListItemIcon>
                            <ListItemText primary="Card" />

                            <img src='https://python-uat.oyefin.com/media/PaymentPics/visa.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercardlogo.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercard.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/paytm.svg' style={{width:'15px', height: '15px'}} />

                            </ListItem>
                            <Divider component="li" />
                        </>
                            : 
                            ''
                        }
                        

                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalance />
                            </ListItemIcon>
                            <ListItemText primary="Netbanking" />

                            <img src='https://python-uat.oyefin.com/media/PaymentPics/visa.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercardlogo.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercard.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/paytm.svg' style={{width:'15px', height: '15px'}} />

                        </ListItem>
                        <Divider component="li" />

                        <ListItem button>
                            <ListItemIcon>
                                <AccountBalanceWallet />
                            </ListItemIcon>
                            <ListItemText primary="Wallet" />

                            <img src='https://python-uat.oyefin.com/media/PaymentPics/visa.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercardlogo.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercard.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/paytm.svg' style={{width:'15px', height: '15px'}} />

                        </ListItem>
                        <Divider component="li" />

                        <ListItem button>
                            <ListItemIcon>
                                <Payment />
                            </ListItemIcon>
                            <ListItemText primary="Pay Later" />

                            <img src='https://python-uat.oyefin.com/media/PaymentPics/visa.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercardlogo.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/mastercard.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/cred_circle.png' style={{width:'15px', height: '15px'}} />
                            <img src='https://python-uat.oyefin.com/media/PaymentPics/paytm.svg' style={{width:'15px', height: '15px'}} />


                        </ListItem>
                        <Divider component="li" />
                    </List>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="textSecondary">Account</Typography>
                    <Typography variant="body2" color="textSecondary">Secured by Itio</Typography>
                </Box>
            </CardContent>

            {/* Footer Section */}
            <FooterSection 
                merchantTransactionAmount={props.merchantTransactionAmount}
                merchantTransactionCurrency={props.merchantTransactionCurrency}
                disblePayButton={props.disblePayButton}
            />
      </Card>
      
    );
};
import React, { useEffect, useState } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentTestPage from './AllPayment';
import TestUPIQRCOde from './UPIQR';
import TestCardPayment from './Card';
import Lottie from 'lottie-react';
import animationData from '../Animations/Wallet.json';




// Sandbox Payment method
const TestPaymentCheckoutPage = () => {
    const query_params = new URLSearchParams(window.location.search)  // Get The data from query
    const token        = query_params.get('token')

    const [upiqrPage, setUPIQRPage] = useState(false);       // UPI Pay page state
    const [allPayment, setAllPayment] = useState(true);      // All payment state
    const [cardDetail, setCardDetails] = useState(false);    // Card payment page state       
    const [disblePayButton, setDisablePayButton] = useState(true);  // Disable pay button
    const [loadingButton, setLoadingButton] = useState(false);     // Loading button state
    const [showAnimation, setShowAnimation] = useState(true);   // Show animation during the start of the page


    let merchant_public_key  = '';
    let transaction_amount   = '';
    let merchant_order_id    = '';
    let transaction_currency = '';


    useEffect(()=> {
      // Turn off the animation after two second
       const animationTimeoutID = setTimeout(() => {
          setShowAnimation(false)
       }, 3000);

       return ()=> {
         clearTimeout(animationTimeoutID)
       };

    }, [])

  
    // If token present in query
    if (token) {
      let tokenValue = token.split(',')

      merchant_public_key  = tokenValue[0]
      transaction_amount   = tokenValue[1]
      merchant_order_id    = tokenValue[2]
      transaction_currency = tokenValue[3]
    };

    // Decode the base64 encoded value
    const merchantTransactionAmount   = parseFloat(atob(transaction_amount))
    const merchantTransactionCurrency = JSON.parse(atob(transaction_currency))
    const merchantOrderID             = JSON.parse(atob(merchant_order_id))

    
    // Page without any value in query
    if (!token) {
      return (
       
        <Stack sx={{ width: '50%', marginTop: '10%', padding: '6%', marginLeft: '24%'}}>
            <Alert severity="warning" variant='filled'>
              <AlertTitle>Warning</AlertTitle>
                Not Accessible
            </Alert>
        </Stack>
      
      );
    };


   return (
    <>
    {showAnimation ? 
        <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
          <Lottie 
              animationData={animationData} 
              loop={true} 
              style={{width: '300px', height: '300px', 
                      display:'flex', marginLeft: '10%'
                    }} />
          </Container>
        :

        <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
         <TopBar 
            setUPIQRPage={setUPIQRPage} 
            setAllPayment={setAllPayment} 
            setCardDetails={setCardDetails} 
            allPayment={allPayment}
         />

         <Box sx={{ flexGrow: 1 }}>
              {allPayment && <AllPaymentTestPage 
                                  setUPIQRPage={setUPIQRPage} 
                                  setAllPayment={setAllPayment} 
                                  setCardDetails={setCardDetails}
                                  merchantTransactionAmount={merchantTransactionAmount}
                                  merchantTransactionCurrency={merchantTransactionCurrency}
                                  disblePayButton={disblePayButton}
                                  loadingButton={loadingButton}
                                  setLoadingButton={setLoadingButton}
                                  />
                                  }
              {upiqrPage && <TestUPIQRCOde />}

              {/* {cardDetail && <CardPayment />} */}
              <Collapse in={cardDetail} timeout='auto' unmountOnExit>
                <TestCardPayment
                    merchantTransactionAmount={merchantTransactionAmount}
                    merchantTransactionCurrency={merchantTransactionCurrency}
                    merchantOrderID={merchantOrderID}
                    disblePayButton={disblePayButton}
                    setDisablePayButton={setDisablePayButton}
                    loadingButton={loadingButton}
                    setLoadingButton={setLoadingButton}
                 />
              </Collapse>
            </Box>
    </Container>
      
      }

     
    </>
  );
};


export default TestPaymentCheckoutPage;

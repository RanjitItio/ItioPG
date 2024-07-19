import React, { useState } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentTestPage from './AllPayment';
import TestFooterSection from './Footer';
import TestUPIQRCOde from './UPIQR';
import TestCardPayment from './Card';



const TestPaymentCheckoutPage = () => {
    const query_params = new URLSearchParams(window.location.search)
    const token        = query_params.get('token')

    const [upiqrPage, setUPIQRPage] = useState(false);
    const [allPayment, setAllPayment] = useState(true);
    const [cardDetail, setCardDetails] = useState(false);           
    const [disblePayButton, setDisablePayButton] = useState(true);  // Disable pay button

    let merchant_public_key  = '';
    let transaction_amount   = '';
    let merchant_order_id    = '';
    let transaction_currency = '';

    if (token) {
      let tokenValue = token.split(',')

      merchant_public_key  = tokenValue[0]
      transaction_amount   = tokenValue[1]
      merchant_order_id    = tokenValue[2]
      transaction_currency = tokenValue[3]
    };

    const merchantTransactionAmount   = parseFloat(atob(transaction_amount))
    const merchantTransactionCurrency = JSON.parse(atob(transaction_currency))
    const merchantOrderID             = JSON.parse(atob(merchant_order_id))

    
    // Page without any value
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
                 />
              </Collapse>
            </Box>

         {/* <TestFooterSection /> */}
    </Container>
  );
};

export default TestPaymentCheckoutPage;

import React, { useState } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentTestPage from './AllPayment';
import TestFooterSection from './Footer';
import TestUPIQRCOde from './UPIQR';
import TestCardPayment from './Card';



const TestPaymentCheckoutPage = () => {
    const [upiqrPage, setUPIQRPage] = useState(false);
    const [allPayment, setAllPayment] = useState(true);
    const [cardDetail, setCardDetails] = useState(false);


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
                                  />
                                  }
              {upiqrPage && <TestUPIQRCOde />}

              {/* {cardDetail && <CardPayment />} */}

              <Collapse in={cardDetail} timeout='auto' unmountOnExit>
                <TestCardPayment />
              </Collapse>
            </Box>

         <TestFooterSection />
    </Container>
  );
};

export default TestPaymentCheckoutPage;

import React, { useState } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentPage from './AllPayment';
import FooterSection from './Footer';
import UPIQRCOde from './UPIQR';
import CardPayment from './Card';



const PaymentCheckoutPage = () => {
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
              {allPayment && <AllPaymentPage 
                                  setUPIQRPage={setUPIQRPage} 
                                  setAllPayment={setAllPayment} 
                                  setCardDetails={setCardDetails}
                                  />
                                  }
              {upiqrPage && <UPIQRCOde />}

              {/* {cardDetail && <CardPayment />} */}

              <Collapse in={cardDetail} timeout='auto' unmountOnExit>
                <CardPayment />
              </Collapse>
            </Box>

         <FooterSection />
    </Container>
  );
};

export default PaymentCheckoutPage;

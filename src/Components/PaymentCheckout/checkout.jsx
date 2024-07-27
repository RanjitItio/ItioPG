import React, { useState } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentPage from './AllPayment';
import UPIQRCOde from './UPIQR';
import CardPayment from './Card';
import axiosInstance from '../Authentication/axios';
import { useEffect } from 'react';
import CheckoutErrorPopup from './Error';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Lottie from 'lottie-react';
import animationData from '../Animations/Wallet.json';





// Production payment checkout
const PaymentCheckoutPage = () => {
    const query_params = new URLSearchParams(window.location.search)
    const token        = query_params.get('token')

    const [upiqrPage, setUPIQRPage]         = useState(false);  // UPI Pay page state
    const [allPayment, setAllPayment]       = useState(true);    // All payment state
    const [cardDetail, setCardDetails]      = useState(false);   // Card payment page state
    const [merchantPipes, setMerchantPipes] = useState([]);       // Merchant available pipes state
    const [openError, setOpenError]         = useState(false);   // 
    const [error, setError]                 = useState('');      // 
    const [disblePayButton, setDisablePayButton] = useState(true);  // Disable button
    const [loadingButton, setLoadingButton] = useState(false);      // Loading button state
    const [showAnimation, setShowAnimation] = useState(true);   // Show animation during the start of the page
 

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


    // Get the available acquirer for the merchant
    useEffect(() => {
        axiosInstance.post(`api/v3/merchant/checkout/pipe/`, {
            merchant_public_key: merchant_public_key

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.data) {
                setMerchantPipes(res.data.data)
            };

        }).catch((error)=> {
          console.log(error)

          if (error.response.data.error === 'Invalid key') {
                setError('Invalid Key provided')
                setOpenError(true)

          } else if (error.response.data.error === 'No assigned pipe'){
               setError('No Acquirer assigned please contact Administration')
               setOpenError(true)

          } else if(error.response.data.error === 'No active pipe available') {
               setError('No active Acquirer found')
               setOpenError(true)

          } else {
              setError('')
              setOpenError(false)
          }

        })
    }, []);

    useEffect(()=> {
      // Turn off the animation after two second
       const animationTimeoutID = setTimeout(() => {
          setShowAnimation(false)
       }, 3000);

       return ()=> {
         clearTimeout(animationTimeoutID)
       };

    }, [])

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
              {allPayment && <AllPaymentPage 
                                  setUPIQRPage={setUPIQRPage} 
                                  setAllPayment={setAllPayment} 
                                  setCardDetails={setCardDetails}
                                  merchantPipes={merchantPipes}
                                  merchantTransactionAmount={merchantTransactionAmount}
                                  merchantTransactionCurrency={merchantTransactionCurrency}
                                  disblePayButton={disblePayButton}
                                  loadingButton={loadingButton}
                                  setLoadingButton={setLoadingButton}
                                  />
                                  }
              {upiqrPage && <UPIQRCOde />}

              {/* {cardDetail && <CardPayment />} */}

              <Collapse in={cardDetail} timeout='auto' unmountOnExit>
                <CardPayment 
                    merchantOrderID={merchantOrderID}
                    merchantTransactionAmount={merchantTransactionAmount}
                    merchantTransactionCurrency={merchantTransactionCurrency}
                    disblePayButton={disblePayButton}
                    setDisablePayButton={setDisablePayButton}
                    loadingButton={loadingButton}
                    setLoadingButton={setLoadingButton}
                />
              </Collapse>
            </Box>

    </Container>
        
            }

    <CheckoutErrorPopup open={openError} setOpen={setOpenError} error={error} />
      
    </>
  );
};

export default PaymentCheckoutPage;

import React, { useState, useEffect } from 'react';
import { Container, Collapse, Box } from '@mui/material';
import TopBar from './TopBar';
import AllPaymentPage from './AllPayment';
import UPIQRCOde from './UPIQR';
import CardPayment from './Card';
import axiosInstance from '../Authentication/axios';
import CheckoutErrorPopup from './Error';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Lottie from 'lottie-react';
import animationData from '../Animations/Wallet.json';
import ReportIcon from '@mui/icons-material/Report';




const formatTime = (time) => {
  const minute = Math.floor(time / 60);
  const second = time % 60;
  return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
};


// Production payment checkout
const PaymentCheckoutPage = () => {
    const query_params = new URLSearchParams(window.location.search)
    const token        = query_params.get('token') //  URL Data

    const [upiqrPage, setUPIQRPage]         = useState(false);  // UPI Pay page state
    const [allPayment, setAllPayment]       = useState(true);    // All payment state
    const [cardDetail, setCardDetails]      = useState(false);   // Card payment page state
    const [merchantPipes, setMerchantPipes] = useState([]);       // Merchant available pipes state
    const [openError, setOpenError]         = useState(false);   // 
    const [error, setError]                 = useState('');      // 
    const [disblePayButton, setDisablePayButton]    = useState(true);  // Disable button
    const [loadingButton, setLoadingButton]         = useState(false);      // Loading button state
    const [showAnimation, setShowAnimation]         = useState(true);   // Show animation during the start of the page
    const [base64DecodeError, setBase64DecodeError] = useState(false); // Decode error state
    const [timer, setTimer]                 = useState(5 * 60);
    const [paymentFailed, setPaymentFailed] = useState(false); // Timer stoppped or transaction has failed
    const [FailedToPay, setFailedToPay]     = useState(false); // API Call to fail a transaction


    //// Timer Configuration
    useEffect(() => { 
      if (timer <= 0) {
        setPaymentFailed(true);
        setFailedToPay(true);  //// For API Call to fail a transaction
      };

      const timerInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
      
    }, [timer]);    
 

    let merchant_public_key  = '';
    let transaction_amount   = '';
    let merchant_business_name = '';
    let merchant_transaction_id = '';
    let transaction_currency = '';
    let merchantBusinessName = '';


    ///// If token available in query else show an error message
    if (token) {
      let tokenValue = token.split(',')

      merchant_public_key     = tokenValue[0]
      transaction_amount      = tokenValue[1]
      merchant_transaction_id = tokenValue[2]
      transaction_currency    = tokenValue[3]
      merchant_business_name  = tokenValue[4]

    } else {
      return (
        <Container>
          <Alert severity="error">
            No payment token provided, please go back and provide the payment token.
          </Alert>
        </Container>
      )
    };

    //// Decode base64 value;
    let merchantTransactionAmount = '';
    let merchantTransactionCurrency = '';
    let merchatTransactionID = '';
    let merchantPublicKey = '';

    try {
      merchantTransactionAmount   = parseFloat(atob(transaction_amount))
      merchantTransactionCurrency = JSON.parse(atob(transaction_currency))
      merchatTransactionID        = JSON.parse(atob(merchant_transaction_id))
      merchantPublicKey            = JSON.parse(atob(merchant_public_key))

    } catch (e) { 
      // console.log(e);
      // Update the state only if it hasn't been updated already
      if (!base64DecodeError) {
        setBase64DecodeError(true);
      }
    };
    

    // Business Name
    try{
      const decodedBusinessName = atob(merchant_business_name)
      merchantBusinessName      = JSON.parse(decodedBusinessName)
    } catch(error) {
      merchantBusinessName      = 'Business Name'
    }
    

    //// Call API to Fail the transaction if unable to pay within timer interval.
    useEffect(() => {
      if (FailedToPay) {
          axiosInstance.get(`/api/v5/fail/prod/transaction/${merchatTransactionID}/${merchantPublicKey}`).then((res)=> {
            // console.log(res);

          }).catch((error)=> {
              // console.log(error);
          })
      }
    }, [FailedToPay]);
    

    // Get the available acquirer for the merchant
    useEffect(() => {
        axiosInstance.post(`api/v3/merchant/checkout/pipe/`, {
            merchant_public_key: merchant_public_key,
            transaction_id: merchatTransactionID

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.data) {
                setMerchantPipes(res.data.data)
            };

        }).catch((error)=> {
          // console.log(error)

          if (error.response.data.error === 'Invalid key') {
                setOpenError(true)
                setError('Invalid Key provided')

          } else if (error.response.data.error === 'Invalid Transaction') {
              setPaymentFailed(true);

          } else if (error.response.data.error === 'Transaction failed') {
              setPaymentFailed(true);

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


    // Animate the wallet before page starts
    useEffect(()=> {
      // Turn off the animation after two second
       const animationTimeoutID = setTimeout(() => {
          setShowAnimation(false)
       }, 3000);

       return ()=> {
         clearTimeout(animationTimeoutID)
       };

    }, []);


  // If the values are not present in URL
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

  /// Deocde Error
  if (base64DecodeError) {
    return (
      <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
        <Alert severity="error">
           Invalid Data Provided can not proceed.
        </Alert>
      </Container>
    )
  };

  //// If Payment Failed
  if (paymentFailed) {
    return (
      <>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'7rem'}}>
          <ReportIcon sx={{color:'red', fontSize:'10rem'}}/>
        </Box>

        <Container maxWidth="xs">
          <Alert severity="error">
            Payment Failed, please try again.
          </Alert>
        </Container>
      </>
    )
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
            merchantBusinessName={merchantBusinessName}
            timer={timer}
            formatTime={formatTime}
         />

         <Box sx={{ flexGrow: 1 }}>
              {allPayment && 
                  <AllPaymentPage 
                      setUPIQRPage={setUPIQRPage} 
                      setAllPayment={setAllPayment} 
                      setCardDetails={setCardDetails}
                      merchantPipes={merchantPipes}
                      merchantTransactionAmount={merchantTransactionAmount}
                      merchantTransactionCurrency={merchantTransactionCurrency}
                      disblePayButton={disblePayButton}
                      loadingButton={loadingButton}
                      setLoadingButton={setLoadingButton}
                      timer={timer}
                      formatTime={formatTime}
                      />
                  }
              {upiqrPage && <UPIQRCOde />}

              <Collapse in={cardDetail} timeout='auto' unmountOnExit>
                <CardPayment 
                    merchatTransactionID={merchatTransactionID}
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

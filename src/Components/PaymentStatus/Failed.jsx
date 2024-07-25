import { Box, Typography, Button, Container } from '@mui/material';
import Lottie from 'lottie-react';
import crossAnimation from './crossAnimation.json';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';




// Failed payment Page
const PaymentFailedPage = () => {
  const location  = useLocation();
  const navigate  =  useNavigate();


  const states = location?.state || '';
  let transaction_id = '';
  let redirect_url = '';

  if (states) {
    transaction_id = states.transaction_id
    redirect_url   = states.URL
  };

  console.log('redirect url', redirect_url)

  useEffect(() => {

    setTimeout(() => {

      if (redirect_url) {
        navigate(redirect_url)
      };

    }, 3000);
     
  }, []);



  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f5f5f5',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Payment Failed!
        </Typography>
        <Box
          sx={{
            width: '150px',
            height: '150px',
            margin: '0 auto',
          }}
        >
          <Lottie animationData={crossAnimation} loop={false} autoPlay={true} height="100%" width="100%" />
        </Box>
        <Typography variant="body1" gutterBottom>
           Please try after some time
        </Typography>
        <Typography variant="body1" gutterBottom>
           Transaction ID: {transaction_id}
        </Typography>
        <Button variant="contained" color="success" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentFailedPage;

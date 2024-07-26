// src/CongratulationsPage.js
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Lottie from 'lottie-react';
import tickAnimation from './tickAnimation.json'; 
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


// Payment success page
const PaymentSuccessPage = () => {
  const location = new useLocation();
  const query = new URLSearchParams(location.search); 
  const url = query.get('url');  // Get the url query params

  // Redirect to merchant redirect page
  useEffect(() => {
    if (url) {
      setTimeout(() => {
        window.location.href = url
      }, 3000);
    };

  }, [])
  

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
          Congratulations!
        </Typography>
        <Box
          sx={{
            width: '150px',
            height: '150px',
            margin: '0 auto',
          }}
        >

        <Lottie animationData={tickAnimation} loop={false} autoplay={true} />

        </Box>
        <Typography variant="body1" gutterBottom>
          Congatulations, Payment Successful
        </Typography>
        <Typography variant="body1" gutterBottom>
           Transaction ID: 
        </Typography>
        <Button variant="contained" color="success" sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    </Container>
  );
};


export default PaymentSuccessPage;

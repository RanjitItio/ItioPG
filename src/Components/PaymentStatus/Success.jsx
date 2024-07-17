// src/CongratulationsPage.js
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Lottie from 'react-lottie';
import tickAnimation from './tickAnimation.json'; // Ensure you have the tick animation JSON file



const PaymentSuccessPage = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: tickAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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
          <Lottie options={defaultOptions} height="100%" width="100%" />
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

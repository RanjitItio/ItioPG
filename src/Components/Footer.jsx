import React from 'react';
import { Box, Typography, Link } from '@mui/material';




const Footer = () => {

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#f5f5f5',
        mt:'auto'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2024 Itio. All Rights Reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Made by{' '}
        <Link target="_blank" href="https://itio.in/" color="primary" underline="hover">
          Itio
        </Link>
      </Typography>
    </Box>
  );
};


export default Footer;

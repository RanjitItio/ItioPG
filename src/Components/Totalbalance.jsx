import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Menu, MenuItem } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';




export default function TotalBalance() {

   const [anchorEl, setAnchorEl] = useState(null);
   
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };



   return (
      <Card className="shadow">
         <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Typography variant="h5" component="div">
                  <b>Total Balance</b>
               </Typography>

               <div>
                  <Button
                     aria-controls="simple-menu"
                     aria-haspopup="true"
                     onClick={handleClick}
                     endIcon={<CreditCardIcon style={{ color: "red" }} />}
                  >
                  ****7189
                  </Button>

                  <Menu
                     id="simple-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <MenuItem onClick={handleClose}>
                        <CreditCardIcon style={{ color: "red" }} />
                        ****9876
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        <CreditCardIcon style={{ color: "red" }} />
                        ****9876
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        <CreditCardIcon style={{ color: "red" }} />
                        ****9876
                     </MenuItem>
                  </Menu>

               </div>
            </div>

         <Typography variant="h4" component="div" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <b>$12,456,315</b>
         </Typography>

         <Box
            sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 1,  
            }}
         >
               <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowUpwardIcon />}
                  sx={{
                     flex: 1, 
                     margin: { xs: '0 0 5px 0', sm: '0' },
                  }}
               >
                  <b>Transfer</b>
               </Button>

               <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowDownwardIcon />}
                  sx={{
                     flex: 1, 
                  }}
               >
                  <b>Receive</b>
               </Button>

         </Box>

         </CardContent>
      </Card>

      );
};





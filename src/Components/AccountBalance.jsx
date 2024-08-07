import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Menu, MenuItem } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EuroIcon from '@mui/icons-material/Euro';
import { useEffect } from 'react';



// Available Total Balance
export default function AccountBalance() {

   const [anchorEl, setAnchorEl] = useState(null);
   
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   // Fetch Account balance of the user when the page loads
   useEffect(() => {
       
   }, []);
   


   return (
      <Card className="shadow">
         <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Typography variant="h6" component="div">
                  Account Balance
               </Typography>

               <div>
                  <Button
                     aria-controls="simple-menu"
                     aria-haspopup="true"
                     onClick={handleClick}
                     endIcon={<AttachMoneyIcon style={{ color: "red" }} />}
                  >
                    USD
                  </Button>

                  <Menu
                     id="simple-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <MenuItem onClick={handleClose}>
                        <AttachMoneyIcon style={{ color: "red" }} />
                           USD
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        <CurrencyRupeeIcon style={{ color: "red" }} />
                           INR
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        <EuroIcon style={{ color: "red" }} />
                           EUR
                     </MenuItem>
                     <MenuItem onClick={handleClose}>
                        <CreditCardIcon style={{ color: "red" }} />
                           GBP
                     </MenuItem>
                  </Menu>

               </div>
            </div>

         <Typography variant="h5" component="div" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            $12,456,315
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
                  <b>Withdraw</b>
               </Button>

               <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowDownwardIcon />}
                  sx={{
                     flex: 1, 
                  }}
               >
                  <b>Raise Refund</b>
               </Button>

         </Box>

         </CardContent>
      </Card>

      );
};





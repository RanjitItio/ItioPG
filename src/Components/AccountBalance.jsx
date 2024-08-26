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
import axiosInstance from './Authentication/axios';
import WithdrawalFrom from './Withdrawal/withdrawalForm';
// import RefundFrom from './Refund/RefundForm';




// Available Total Balance
export default function AccountBalance() {

   const [anchorEl, setAnchorEl]                = useState(null);
   const [accountBalance, updateAccountBalance] = useState([]); // Merchant Account balance state
   const [selctedCurrency, setSelectedCurrency] = useState('USD'); // Selcted Currency by the merchant
   const [openWithdrawl, setOpenWithdrawal]     = useState(false); // Withdrawal form state

   
   // Open Withdrawal Form
   const handleClickOpenWithdrawalForm = () => {
      setOpenWithdrawal(true);
    };

   // Close Withdrawal form
    const handleCloseWithdrawalForm = () => {
      setOpenWithdrawal(false);
    };

   
   // Open the currency dropdown
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   // Close the currency dropdown
   const handleClose = () => {
      setAnchorEl(null);
   };

   // Fetch Account balance of the user when the page loads
   useEffect(() => {
       axiosInstance.get(`/api/v5/merchant/account/balance/`).then((res)=> {
         // console.log(res)

         if (res.status === 200 && res.data.success === true) {
            updateAccountBalance(res.data.merchantAccountBalance)
         }
       }).catch((error)=> {
         console.log(error)
         
         if (error.response.data.error === 'No Merchant Balance availabel') {
            //  MerchantAccountBalance = 0
         };

       })
   }, []);

   // Assign selected currency value to the state
   const handleSelctedCurrency = (currency)=> {
      setSelectedCurrency(currency)
   };


   // Filter balance according to the currency
   const filteredBalance = accountBalance.find(balance => balance.currency === selctedCurrency)


   /// Assign Currency Icon according to the Currency
   const getCurrencyIcon = (currency) => {
      switch (currency) {
         case 'USD':
            return '$'
         case 'INR':
            return '₹'
         case 'EUR':
            return '€'
         case 'GBP':
            return '£'
         default:
            break;
      }
   };
   

   return (
      <>
      <Card sx={{ borderRadius: 3, boxShadow: '12px 16px 11px 3px rgba(209,202,209,0.96)' }}>
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
                    {selctedCurrency}
                  </Button>

                  <Menu
                     id="simple-menu"
                     anchorEl={anchorEl}
                     keepMounted
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <MenuItem onClick={()=> {handleClose(); handleSelctedCurrency('USD')}}>
                        <AttachMoneyIcon style={{ color: "red" }} />
                           USD
                     </MenuItem>
                     <MenuItem onClick={()=> {handleClose(); handleSelctedCurrency('INR')}}>
                        <CurrencyRupeeIcon style={{ color: "red" }} />
                           INR
                     </MenuItem>
                     <MenuItem onClick={()=> {handleClose(); handleSelctedCurrency('EUR')}}>
                        <EuroIcon style={{ color: "red" }} />
                           EUR
                     </MenuItem>
                     <MenuItem onClick={()=> {handleClose(); handleSelctedCurrency('GBP')}}>
                        <CreditCardIcon style={{ color: "red" }} />
                           GBP
                     </MenuItem>
                  </Menu>
               </div>
            </div>

         <Typography variant="h5" component="div" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
             {getCurrencyIcon(selctedCurrency)} {filteredBalance ? (filteredBalance.amount ? parseFloat(filteredBalance.amount).toFixed(3) : 0.00) : 0.00}
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
                  variant="outlined"
                  color="error"
                  startIcon={<ArrowUpwardIcon />}
                  onClick={()=> {handleClickOpenWithdrawalForm()}}
                  sx={{
                     flex: 1, 
                     margin: { xs: '0 0 5px 0', sm: '0' },
                     borderRadius: 10,
                     fontSize: '0.75rem',
                     padding: '4px 6px',
                  }}
               >
                  <b>Withdraw</b>
               </Button>

               <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ArrowDownwardIcon />}
                  sx={{
                     flex: 1, 
                     borderRadius: 10,
                     fontSize: '0.75rem',
                     padding: '4px 6px',
                  }}
               >
                  <b>Raise Refund</b>
               </Button>

         </Box>

         </CardContent>
      </Card>

      {/* // Withdrawal Form */}
      <WithdrawalFrom 
            open={openWithdrawl} 
            handleClickOpen={handleClickOpenWithdrawalForm} 
            handleClose={handleCloseWithdrawalForm}
            accountBalance={accountBalance}
            setOpen={setOpenWithdrawal}
         />
      </>
      );
};





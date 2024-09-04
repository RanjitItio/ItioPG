import React from 'react';
import { Box, Avatar, Typography, List, ListItem, SvgIcon, Button,
         ListItemAvatar, ListItemText, Chip, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';




const statusColors = {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_PENDING: 'warning',
  PAYMENT_FAILED: 'error',
  PAYMENT_INITIATED: 'info',
};



// Assign icon according to currency
const getCurrencyIcon = (currency)=> {
  switch(currency) {
    case 'USD':
      return PaidIcon;
    case 'INR':
      return CurrencyRupeeIcon;
    case 'EURO':
      return EuroIcon;
    case 'GBP':
      return CurrencyPoundIcon;
    case 'Rub':
      return CurrencyRubleIcon;
    default:
      return PaidIcon;
  };
};



// Get payment status Label 
const getPaymentStatusLabel = (status) => {
   switch (status) {
    case 'PAYMENT_INITIATED':
      return 'Initiated'
    case 'PAYMENT_SUCCESS':
      return 'Success'
    case 'PAYMENT_FAILED':
      return 'Failed'
    case 'PAYMENT_PENDING':
      return 'Pending'
   }
};



// Recent Transaction in Dashboard section
const RecentTransactions = () => {

  const navigate = useNavigate();
  const [recentTransactions, updateRecentTransaction] = useState([]); // Recent Transactions

  useEffect(() => {
    axiosInstance.get(`api/v6/merchant/recent/transactions/`).then((res)=> {
        // console.log(res);

        if (res.status === 200 && res.data.success === true) {
            updateRecentTransaction(res.data.recent_transactions);
        };

    }).catch((error)=> {
         console.log(error);
    })
  }, []);
  


  return (
    <Paper>

      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2, padding:1 }}>
            Recent Transactions
        </Typography>

        <Button onClick={()=> {navigate('/merchant/business/transactions/')}}  size='small' sx={{ marginBottom: 2, padding:1, color:'#0081cf' }}>
            see more
        </Button>
      </div>

    <Box
      sx={{
        borderRadius: 1,
        boxShadow: 1,
        padding: 2,
        backgroundColor: 'white',
        maxHeight: 280,
        overflowY: 'auto',
      }}
    >
      <List>
        {recentTransactions.map((transaction, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Avatar alt={transaction.name}> 
                  <SvgIcon sx={{color:'#cddc39'}} fontSize='large' component={getCurrencyIcon(transaction.currency)} inheritViewBox />
              </Avatar>

            </ListItemAvatar>
            <ListItemText
              primary={transaction.transaction_id.substring(0, 10) + "..."}
              secondary={transaction.createdAt.replace('T', " ")} 
              primaryTypographyProps={{ fontWeight: 'bold' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 2 }}>
              {transaction.status === 'PAYMENT_SUCCESS' ? '+' : (transaction.status === 'PAYMENT_FAILED' ? '-': '')}{transaction.transaction_amount}
            </Typography>
            <Chip
              label={getPaymentStatusLabel(transaction.status)} 
              color={statusColors[transaction.status]}
              sx={{ borderRadius: '4px', minWidth: '60px', textAlign: 'center' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
    </Paper>
  );
};



export default RecentTransactions;

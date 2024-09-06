import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Avatar, Chip, Typography,
  TableContainer, Paper, Box
} from '@mui/material';



const statusColors = {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_PENDING: 'warning',
  PAYMENT_FAILED: 'error',
  PAYMENT_INITIATED: 'info',
};

const orders = [
  {
    user: 'Dianne Russell',
    avatar: '/path/to/avatar1.jpg', // Replace with correct paths or icons
    invoice: '#6352148',
    item: 'iPhone 14 max',
    qty: 2,
    amount: '$5,000.00',
    status: 'Paid',
  },
  {
    user: 'Wade Warren',
    avatar: '/path/to/avatar2.jpg',
    invoice: '#6352148',
    item: 'Laptop HPH',
    qty: 3,
    amount: '$1,000.00',
    status: 'Pending',
  },
  {
    user: 'Albert Flores',
    avatar: '/path/to/avatar3.jpg',
    invoice: '#6352148',
    item: 'Smart Watch',
    qty: 7,
    amount: '$1,000.00',
    status: 'Shipped',
  },
  {
    user: 'Bessie Cooper',
    avatar: '/path/to/avatar4.jpg',
    invoice: '#6352148',
    item: 'Nike Air Shoe',
    qty: 1,
    amount: '$3,000.00',
    status: 'Canceled',
  },
  {
    user: 'Arlene McCoy',
    avatar: '/path/to/avatar5.jpg',
    invoice: '#6352148',
    item: 'New Headphone',
    qty: 5,
    amount: '$4,000.00',
    status: 'Canceled',
  },
];


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
       
    <Paper sx={{maxHeight:'25rem', overflow:'auto'}}>
      <Typography variant="h6" sx={{ padding: '16px', fontWeight: 'bold' }}>
          Recent Orders
      </Typography>

      <TableContainer component={Paper} sx={{ maxHeight: '20rem' }}>
          <Table stickyHeader>
            <TableHead sx={{backgroundColor:'#f6f7f9'}}>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Time</strong></TableCell>
                <TableCell><strong>Transaction Id</strong></TableCell>
                <TableCell><strong>Order Id</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Fee</strong></TableCell>
                <TableCell><strong>Payout</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar src={order.avatar} alt={order.user} sx={{ marginRight: 2 }} />
                    {order.user}
                  </TableCell>
                  <TableCell>{order.invoice}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.qty}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                        <Chip label={order.status} color="success" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
};



export default RecentTransactions;

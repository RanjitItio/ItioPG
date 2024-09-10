import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Avatar, Chip, Typography,
  TableContainer, Paper, Box
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
// import PaidIcon from '@mui/icons-material/Paid';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import EuroIcon from '@mui/icons-material/Euro';
// import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
// import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';



const statusColors = {
  PAYMENT_SUCCESS: 'success',
  PAYMENT_PENDING: 'warning',
  PAYMENT_FAILED: 'error',
  PAYMENT_INITIATED: 'info',
};

const orders = [
  {
    user: 'Dianne Russell',
    avatar: 'https://python-uat.oyefin.com/media/transaction.jpeg', // Replace with correct paths or icons
    invoice: '#6352148',
    item: 'iPhone 14 max',
    qty: 2,
    amount: '$5,000.00',
    status: 'Paid',
  },
  {
    user: 'Wade Warren',
    avatar: 'https://python-uat.oyefin.com/media/transaction.jpeg',
    invoice: '#6352148',
    item: 'Laptop HPH',
    qty: 3,
    amount: '$1,000.00',
    status: 'Pending',
  },
  {
    user: 'Albert Flores',
    avatar: 'https://python-uat.oyefin.com/media/transaction.jpeg',
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

  // Calculate payout balance
  const calculatePayoutBalance = (amount, fee)=> {
       let transaction_amount = amount
       let transaction_fee    = fee

       let payoutBalance = transaction_amount - ((transaction_amount / 100) * transaction_fee)

       return payoutBalance;
  };

  // For Empty data
  if (recentTransactions.length === 0) {
    return (

      <Paper sx={{maxHeight:'25rem', overflow:'auto'}}>
        <Typography variant="p" sx={{ padding: '18px', fontWeight: 'bold', mt:5 }}>
            Recent Transactions
        </Typography>

        <TableContainer component={Paper} sx={{ maxHeight: '20rem', marginTop:'18px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Date</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Time</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Transaction Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Order Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Amount</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Fee</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Payout</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
          </Table>

          <TableBody style={{display:'flex', justifyContent:'center', height:'14rem'}}>
              <InboxIcon sx={{mt:10, fontSize:'90px', color:'#e0e2e2'}} /> <br />
          </TableBody>

        </TableContainer>

      </Paper>

    );
  };
  


  return (
       
    <Paper sx={{height:'100%', overflow:'auto'}}>
      <Typography variant="p" sx={{ padding: '18px', fontWeight: 'bold', mt:5 }}>
          Recent Transactions
      </Typography>

      <TableContainer component={Paper} sx={{ height: '27rem', marginTop:'18px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Date</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Time</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Transaction Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Order Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Amount</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Fee</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Payout</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {recentTransactions.map((order, index) => (
               
                <TableRow key={index}>
                  <TableCell sx={{display:'flex', justifyContent:'center'}}>
                      <Avatar src='https://python-uat.oyefin.com/media/transaction.jpeg' alt='Date' sx={{ marginRight: 2 }} />
                      <b>{order.createdAt.split('T')[0]}</b>
                  </TableCell>
                  <TableCell>{order?.createdAt?.split('T')[1] || 'Date'}</TableCell>
                  <TableCell>{`${order.transaction_id?.substring(0, 15)}...`}</TableCell>
                  <TableCell>{`${order.merchantOrderID?.substring(0, 15)}...`}</TableCell>
                  <TableCell>{order?.transaction_amount || 0} {order.currency}</TableCell>
                  <TableCell>{order?.transaction_fee}%</TableCell>
                  <TableCell>{calculatePayoutBalance(order?.transaction_amount || 0, order?.transaction_fee || 0)} {order.currency || 'None'}</TableCell>
                  <TableCell>
                        <Chip label={getPaymentStatusLabel(order.status || 'NONE')} color={statusColors[order.status]} variant="outlined" />
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

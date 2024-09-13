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
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Business</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Order Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Amount</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Fee</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Payout</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
          

          <TableBody>
            <TableRow>
              <TableCell colSpan={8}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '14rem',
                  }}
                >
                  {/* Placeholder for empty state */}
                  <InboxIcon sx={{ mt: 2, fontSize: '90px', color: '#e0e2e2' }} />
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>

        </Table>
        </TableContainer>
      </Paper>

    );
  };
  


  return (
       
    <Paper sx={{height:'100%', overflow:'auto'}}>
      <Typography variant="p" sx={{ padding: '18px', fontWeight: 'bold', mt:5 }}>
          Recent Transactions
      </Typography>

      <TableContainer component={Paper} sx={{ height: '30rem', marginTop:'18px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Date</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Time</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Transaction Id</strong></TableCell>
                <TableCell sx={{ backgroundColor: '#eef0f5' }}><strong>Business</strong></TableCell>
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

                  <TableCell>
                      {order?.createdAt?.split('T')[1] || 'Date'}
                  </TableCell>

                  <TableCell>
                      {`${order.transaction_id?.substring(0, 15)}...`}
                  </TableCell>

                  <TableCell>
                      {order?.business_name || 'None'}
                  </TableCell>

                  <TableCell>
                      {`${order.merchantOrderID?.substring(0, 15)}...`}
                  </TableCell>

                  <TableCell>
                      {order?.transaction_amount || 0} {order.currency}
                  </TableCell>

                  <TableCell>
                      {order?.transaction_fee}%
                  </TableCell>

                  <TableCell>
                      {calculatePayoutBalance(order?.transaction_amount || 0, order?.transaction_fee || 0)} {order.currency || 'None'}
                  </TableCell>

                  <TableCell>
                        <Chip label={getPaymentStatusLabel(order.status || 'NONE')} color={statusColors[order.status]} variant="filled" />
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

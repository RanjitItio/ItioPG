import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { useRef } from 'react';


// Register the chart components (necessary from Chart.js v3 onwards)
ChartJS.register(ArcElement, Tooltip, Legend);



// Options for the chart
const options = {
  cutout: '10%',
  plugins: {
    legend: {
      display: false,
    },
  },
};


// Styled component for the percentage circles
const PercentageCircle = styled(Box)(({ top, left }) => ({
  position: 'absolute',
  top: top || '50%',
  left: left || '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  fontWeight: 'bold',
}));


// Merchant Dashboard Transaction, Withdrawal, Refund bar chart
export default function TransactionStatistics() {
  const [transactinData, updateTransactionData] = useState([]);
  const [currencies, updateCurrenies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  // get currency value
  const handleCurrencyChange = (e)=> {
      setSelectedCurrency(e.target.value);
  };

  // Fetch all the available currencies
  useEffect(() => {
    axiosInstance.get(`/api/v2/currency/`).then((res)=> {
        if (res.status === 200) {
          updateCurrenies(res.data.currencies)
        }

      }).catch((error)=> {
        console.log(error)

      });
  }, [])
  

  // Fetch transaction and withdrawal amount
  useEffect(() => {
    axiosInstance.get(`/api/v6/merchant/dash/transaction/withdrawal/refund/chart/`).then((res)=> {
           if (res.status === 200) {
              updateTransactionData(res.data)
           }
    }).catch((error)=> {
        console.log(error)
    });

  }, []);



  /// Fetch transaction and withdrawal amount currency wise
  useEffect(() => {
    if (selectedCurrency) {
      axiosInstance.get(`/api/v6/merchant/dash/transaction/withdrawal/refund/chart/?currency=${selectedCurrency}`).then((res)=> {
        // console.log(res.data)

          if (res.status === 200) {
            updateTransactionData(res.data)
          }
      }).catch((error)=> {
        console.log(error)
      });
    }
  }, [selectedCurrency])
  
     
  
  // Dougnut Chart
  const data = {
    labels: ['Success Transaction', 'Withdrawals', 'Refunds'],
  
    datasets: [
      {
        data: [transactinData?.success_transaction || 0, transactinData?.withdrawal_amount || 0, transactinData.refund_amount  || 0],
        backgroundColor: ['#4285F4', '#FBBC05', '#e02342'],
        hoverOffset: 4,
      },
    ],
  };
  

  const total             = parseInt(transactinData.success_transaction) + parseInt(transactinData.withdrawal_amount) + parseInt(transactinData.refund_amount);
  const successPercent    = total === 0 ? 0 : ((parseInt(transactinData.success_transaction) * 100) / total).toFixed(1);
  const withdrawalPercent = total === 0 ? 0 : ((parseInt(transactinData.withdrawal_amount) * 100) / total).toFixed(1);
  const refundPercent     = total === 0 ? 0 : ((parseInt(transactinData.refund_amount) * 100) / total).toFixed(1);


  return (
    <Box sx={{ p: 1, backgroundColor: '#f5f7fb', borderRadius: '10px', maxWidth: 400}}>
      {/* Title and dropdown */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
            Transaction Statistics
        </Typography>
        <Select
          value={selectedCurrency}
          onChange={(e) => {handleCurrencyChange(e);}}
          size="small"
        >
          {currencies.map((curr, index)=> {
            return (
              <MenuItem key={index} value={curr.name}>{curr.name}</MenuItem>
            )
          })}
          
        </Select>
      </Box>

      {/* Chart with percentage indicators */}
      <Box sx={{ position: 'relative', mt: 3, mb: 1, height:'16rem' }}>
        <Doughnut data={data} options={options} />

        <PercentageCircle top="13%" left="11%">
            {withdrawalPercent}%
        </PercentageCircle>

        <PercentageCircle top="75%" left="69%">
            {successPercent}%
        </PercentageCircle>

        <PercentageCircle top="-3%" left="39%">
            {refundPercent}%
        </PercentageCircle>
      </Box>

      {/* Legend with values */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, backgroundColor: '#4285F4', mr: 1 }} />
          <Typography variant="body2">
            Transactions: <strong>{transactinData.success_transaction}</strong>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, backgroundColor: '#FBBC05', mr: 1 }} />
          <Typography variant="body2">
            Withdrawals: <strong>{transactinData.withdrawal_amount}</strong>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, backgroundColor: '#FBBC05', mr: 1 }} />
          <Typography variant="body2">
            Refunds: <strong>{transactinData.refund_amount}</strong>
          </Typography>
        </Box>

      </Box>
    </Box>
  );
}

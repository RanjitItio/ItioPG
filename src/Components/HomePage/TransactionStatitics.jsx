import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';


// Register the chart components (necessary from Chart.js v3 onwards)
ChartJS.register(ArcElement, Tooltip, Legend);


// Dummy data for the chart
// const data = {
//   labels: ['Success Transaction', 'Withdrawals'],

//   datasets: [
//     {
//       data: [20000, 25000],
//       backgroundColor: ['#4285F4', '#FBBC05'],
//       hoverOffset: 4,
//     },
//   ],
// };


// Options for the chart
const options = {
  cutout: '70%',
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



export default function TransactionStatistics() {
  const [timeRange, setTimeRange] = useState('Yearly');
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
    axiosInstance.get(`/api/v6/merchant/dash/transaction/withdrawal/chart/`).then((res)=> {
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
      axiosInstance.get(`/api/v6/merchant/dash/transaction/withdrawal/chart/?currency=${selectedCurrency}`).then((res)=> {
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
    labels: ['Success Transaction', 'Withdrawals'],
  
    datasets: [
      {
        data: [transactinData?.success_transaction || 0, transactinData?.withdrawal_amount || 0],
        backgroundColor: ['#4285F4', '#FBBC05'],
        hoverOffset: 4,
      },
    ],
  };
  
  

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
      <Box sx={{ position: 'relative', mt: 1, mb: 1, height:'16rem' }}>
        <Doughnut data={data} options={options} />

        <PercentageCircle top="17%" left="10%">
            {((parseInt(transactinData.success_transaction) + parseInt(transactinData.withdrawal_amount)) === 0) ? 0 : (((parseInt(transactinData.withdrawal_amount) * 100) / (parseInt(transactinData.success_transaction) + parseInt(transactinData.withdrawal_amount))).toFixed(1))}%
        </PercentageCircle>


        <PercentageCircle top="75%" left="69%">
        {((parseInt(transactinData.success_transaction) + parseInt(transactinData.withdrawal_amount)) === 0) ? 0 : (((parseInt(transactinData.success_transaction) * 100) / (parseInt(transactinData.success_transaction) + parseInt(transactinData.withdrawal_amount))).toFixed(1))}%
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
      </Box>
    </Box>
  );
}

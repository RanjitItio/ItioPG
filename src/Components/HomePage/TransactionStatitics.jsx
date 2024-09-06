import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Typography, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the chart components (necessary from Chart.js v3 onwards)
ChartJS.register(ArcElement, Tooltip, Legend);


// Dummy data for the chart
const data = {
  labels: ['Male', 'Female'],
  datasets: [
    {
      data: [20000, 25000],
      backgroundColor: ['#4285F4', '#FBBC05'],
      hoverOffset: 4,
    },
  ],
};


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
  const [timeRange, setTimeRange] = React.useState('Yearly');

  return (
    <Box sx={{ p: 1, backgroundColor: '#f5f7fb', borderRadius: '10px', maxWidth: 400}}>
      {/* Title and dropdown */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
            Transaction Statistics
        </Typography>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          size="small"
        >
          <MenuItem value="Yearly">Yearly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
        </Select>
      </Box>

      {/* Chart with percentage indicators */}
      <Box sx={{ position: 'relative', mt: 1, mb: 1, height:'16rem' }}>
        <Doughnut data={data} options={options} />

        <PercentageCircle top="17%" left="10%">
          +25%
        </PercentageCircle>
        <PercentageCircle top="75%" left="69%">
          +30%
        </PercentageCircle>
      </Box>

      {/* Legend with values */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, backgroundColor: '#4285F4', mr: 1 }} />
          <Typography variant="body2">
            Transactions: <strong>20,000</strong>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, backgroundColor: '#FBBC05', mr: 1 }} />
          <Typography variant="body2">
            Withdrawals: <strong>25,000</strong>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Earning',
      data: [10000, 20000, 15000, 25000, 40000, 20000, 30000, 20000, 40000, 30000, 15000, 20000],
      backgroundColor: '#4285F4',
    },
    {
      label: 'Expense',
      data: [4000, 5000, 3000, 8000, 24000, 4000, 10000, 5000, 24000, 5000, 3000, 4000],
      backgroundColor: '#FF9900',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Revenue Report',
    },
  },
};

export default function MerchantMonthlyTransaction() {
  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Revenue Report</Typography>
        <FormControl>
          <Select defaultValue="Yearly">
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Bar data={data} options={options} height={400} />
    </Box>
  );
}

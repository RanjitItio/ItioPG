import React from 'react';
import { Grid, Paper, Typography, Box, 
        InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { AccountBalanceWallet, AttachMoney, TrendingDown } from '@mui/icons-material';

const stats = [
  { id: 1, label: 'Total Balance', value: 432568, icon: <AccountBalanceWallet />, color: 'blue' },
  { id: 2, label: 'Total WIthdrawal', value: 245860, icon: <AccountBalanceWallet />, color: 'red' },
  { id: 3, label: 'Current Rate', value: 25.35, icon: <AttachMoney />, color: 'green' },
  { id: 4, label: 'Total Refund', value: 22.56, icon: <TrendingDown />, color: 'red' },
];


const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'INR', label: 'INR' },
  ];

const StatCard = ({ label, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    }}
  >
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: '50%',
        padding: '10px',
        color: 'white',
        marginRight: '16px',
        fontSize: '1.5rem',
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>

      <Typography variant="subtitle1" color="textSecondary">
        {label}
      </Typography>
    </Box>
  </Paper>
);


// Dashboard stats component
export default function StatsComponent() {
    return (
        <Paper sx={{ padding: '20px', mb:3, height:{md:'21.4rem'} }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', mb:1}}>
                <Typography variant="h6" gutterBottom>
                    Stats
                </Typography>
           
                <FormControl size="small">
                    <InputLabel id="currency-label">Currency</InputLabel>
                    <Select labelId="currency-label" id="currency" label="Currency">
                    {currencies.map((currency) => (
                        <MenuItem key={currency.value} value={currency.value}>
                            {currency.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={4}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={12} md={6} key={stat.id}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
  




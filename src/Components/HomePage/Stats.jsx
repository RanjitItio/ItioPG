import React from 'react';
import { Grid, Paper, Typography, Box, 
        InputLabel, Select, FormControl, MenuItem } from '@mui/material';
import { AccountBalanceWallet, AttachMoney, TrendingDown } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';


const stats = [
  { id: 1, label: 'Total Balance', icon: <AccountBalanceWallet />, color: 'blue' },
  { id: 2, label: 'Total Withdrawal', icon: <AccountBalanceWallet />, color: 'red' },
  { id: 3, label: 'Pending Withdrawals', icon: <AttachMoney />, color: 'green' },
  { id: 4, label: 'Total Refund', icon: <TrendingDown />, color: 'red' },
];





const StatCard = ({ label, icon, color, currency }) => {

       const [statsData, updateStatsData] = useState([]); // stats data state

        // Fetch all the dashboard stat value according to selected currency
        useEffect(() => {
            if (currency) {
            axiosInstance.get(`api/v6/merchant/dash/stats/${currency}/`).then((res) => {
                // console.log(res.data.stats_data)

                if (res.status === 200 && res.data.success) {
                    updateStatsData(res.data.stats_data);
                }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }, [currency]);


    // Assign amount according to the label
    const getAmount = (label) => {
        switch (label) {
            case 'Total Balance':
                return parseInt(statsData[0]?.merchant_account_balance[0]?.amount).toFixed(2) ?? 0;
            case 'Total Withdrawal':
                return parseInt(statsData[0]?.merchant_withdrawals[0]?.amount).toFixed(2) || 0;
            case 'Pending Withdrawals':
                return parseInt(statsData[0]?.merchant_pending_withdrawals[0].amount).toFixed(2) || 0;
            case 'Total Refund':
                return parseInt(statsData[0]?.merchant_refunds[0]?.amount).toFixed(2) ?? 0;
            default:
                return 0;
            }
        };


    return(
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
                    {getAmount(label)}
                </Typography>

                <Typography variant="subtitle2" color="textSecondary">
                    {label}
                </Typography>
            </Box>
        </Paper>
    );
};



// Dashboard stats component
export default function StatsComponent() {
    const [currencies, updateCurrencies] = useState([]);
    const [currency, setCurrency]        = useState('USD');

    // Get selected currecncy value
    const handleSelectedCurrency = (e)=> {
        setCurrency(e.target.value)
    };


// console.log('statsData', statsData)
    useEffect(() => {
        // Fetch all the available currencies
        axiosInstance.get(`api/v2/currency/`).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                updateCurrencies(res.data.currencies)
            }

        }).catch((error)=> {
            console.log(error)

        })
    }, []);

    
    return (
        <Paper sx={{ padding: '20px', mb:3, height:{md:'21.4rem'} }}>
            <Box sx={{ display:'flex', justifyContent:'space-between', mb:1}}>
                <Typography variant="h6" gutterBottom>
                    Stats
                </Typography>

                <FormControl size="small">
                    <InputLabel id="currency-label">Currency</InputLabel>
                    <Select 
                        labelId="currency-label" 
                        id="currency" 
                        label="Currency"
                        value={currency}
                        onChange={handleSelectedCurrency}
                        >
                    {currencies.map((currency) => (
                        <MenuItem key={currency.id} value={currency?.name || 'USD'}>
                            {currency.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Box>

            <Grid container spacing={4}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={12} md={6} key={stat.id}>
                        <StatCard {...stat} currency={currency}/>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};
  




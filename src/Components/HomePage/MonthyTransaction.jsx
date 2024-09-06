import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import axiosInstance from '../Authentication/axios';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Jan', Earning: 10000, Expense: 4000 },
  { name: 'Feb', Earning: 20000, Expense: 5000 },
  { name: 'Mar', Earning: 15000, Expense: 3000 },
  { name: 'Apr', Earning: 25000, Expense: 8000 },
  { name: 'May', Earning: 40000, Expense: 24000 },
  { name: 'Jun', Earning: 20000, Expense: 4000 },
  { name: 'Jul', Earning: 30000, Expense: 10000 },
  { name: 'Aug', Earning: 20000, Expense: 5000 },
  { name: 'Sep', Earning: 40000, Expense: 24000 },
  { name: 'Oct', Earning: 30000, Expense: 5000 },
  { name: 'Nov', Earning: 15000, Expense: 3000 },
  { name: 'Dec', Earning: 20000, Expense: 4000 },
];



// Merchant Pending Withdrawals 
export default function MerchantMonthlyTransaction() {

    const [pendingWithdrawal, updatePendingWithdrawal] = useState([]);    // Withdrawal data

    // Fetch all the pending withdrawals from API
    useEffect(() => {
        axiosInstance.get(`api/v3/merchant/pg/pending/withdrawal/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                const dataWithKeys = res.data.merchantPendingWithdrawals.map((item, index) => ({
                  ...item,
                  key: index,
                }));
                updatePendingWithdrawal(dataWithKeys);
            };
    
        }).catch((error)=> {
            console.log(error)

        })
    }, []);
    

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

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Earning" fill="#4285F4" />
                  <Bar dataKey="Expense" fill="#FF9900" />
                </BarChart>
              </ResponsiveContainer>
        </Box>
    );
};
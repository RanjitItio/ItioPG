import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, 
        Box, MenuItem, FormControl, 
        InputLabel, Select } from '@mui/material';
import RefundTransactionLineChart from './RefundLineChart';
import axiosInstance from '../Authentication/axios';



export default function MerchantTotalRefunds(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [currency, setCurrency] = useState('');
    const [allSuccessRefunds, updateAllSuccessRefunds] = useState([]);

    // Current month
   const now =  new Date();
   const month = now.getMonth();
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const currentMonthName = monthNames[month]


    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    // Fetch all success refunds
    useEffect(()=> {
        axiosInstance.get(`api/merchant/dash/refund/chart/`).then((res)=> {
            updateAllSuccessRefunds(res.data.merchant_refunds)

        }).catch((error)=> {
            console.log(error)

        });
    }, []);

    // Calculte amount datas
    const amounts     = allSuccessRefunds.map(transactions => Number(transactions.amount));
    const totalAmount = amounts.reduce((accumulator, currentValue)=> accumulator + currentValue, 0)
    

    return (
        <Card 
           sx={{ 
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", 
                "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" 
                },
                border: '1px solid black'
            }}>
            <CardContent sx={{ overflow: 'auto', maxHeight: '18rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
                        <b>Total Refunds</b>
                    </Typography>


                    <Box>
                    <FormControl sx={{ m: 0, minWidth: 90 }} size="small">
                            <InputLabel id="demo-select-small-label">Currency</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={currency}
                                label="Currency"
                                onChange={handleCurrencyChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'USD'}>USD</MenuItem>
                                <MenuItem value={'INR'}>INR</MenuItem>
                                <MenuItem value={'EUR'}>EUR</MenuItem>
                                <MenuItem value={'GBP'}>GBP</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Typography>{currentMonthName} Month Refunds ${totalAmount}</Typography>

                <Box sx={{ marginTop: 0 }}>
                    <RefundTransactionLineChart allMerchantTransactions={allSuccessRefunds} />
                </Box>

            </CardContent>
        </Card>

    );
};





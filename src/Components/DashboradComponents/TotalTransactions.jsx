import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Select, Box,
        MenuItem, FormControl, InputLabel } from '@mui/material';
import TransactionLineChart from './LineChart';
import axiosInstance from '../Authentication/axios';





// Total Transaction Chart
export default function TotalTransactions() {

   const [allMerchantTransactions, updateAllMerchantTransactions] = useState([]);
   const [duration, setDuration] = useState('');

   // Current month
   const now =  new Date();
   const month = now.getMonth();

   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const currentMonthName = monthNames[month]

    useEffect(()=> {
        axiosInstance.get(`api/v2/merchant/all/prod/transactions/`).then((res)=> {
            // console.log(res.data.merchant_all_prod_trasactions)
            updateAllMerchantTransactions(res.data.merchant_all_prod_trasactions)

        }).catch((error)=> {
            console.log(error.response)

        })
    }, [])

    const amounts     = allMerchantTransactions.map(transactions => Number(transactions.amount));
    const totalAmount = amounts.reduce((accumulator, currentValue)=> accumulator + currentValue, 0)

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <>
        <Card 
            style={{ 
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", 
                "&:hover": {
                boxShadow: "0px 1px 20px rgba(0,0,0,0.3)" 
                },
                border: '1px solid black'
            }}>
        <CardContent style={{ overflow: "auto", maxHeight: "18rem" }}>
               
            <Grid container>
                    <Grid item xs={10}>
                        <Typography variant="h5" component="div">Total Transactions</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                            <InputLabel id="demo-select-small-label">Duration</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={duration}
                                label="Duration"
                                onChange={handleDurationChange}
                            >
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Today</MenuItem>
                                <MenuItem value={20}>Last 7 Days</MenuItem>
                                <MenuItem value={30}>This Month</MenuItem>
                                <MenuItem value={30}>Last Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            
            <Typography>{currentMonthName} Month Transaction Amount ${totalAmount}</Typography>

            <TransactionLineChart allMerchantTransactions={allMerchantTransactions}/>
            
        </CardContent>
    </Card>
    </>
    );
};
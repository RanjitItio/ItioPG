import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Select, Box,
        MenuItem, FormControl, InputLabel } from '@mui/material';
import TransactionLineChart from './LineChart';
import axiosInstance from '../Authentication/axios';





// Total Transaction Chart
export default function TotalTransactions() {
    
    // Current month
    const now =  new Date();
    const month = now.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[month]
    const currentMonthList = monthNames.slice(0, month + 1);


    const [allMerchantTransactions, updateAllMerchantTransactions] = useState([]);
    const [currency, setCurrency] = useState('');  // Selected Currecny
    const [selectedMonth, updateSelectedMonth] = useState(currentMonthList[month]);  // Selected Month
   
   
   // Mechant Production Transaction
    useEffect(()=> {
        axiosInstance.get(`api/v2/merchant/month/prod/transactions/`).then((res)=> {
            // console.log(res.data.merchant_all_prod_trasactions)
            if (res.status === 200) {
                updateAllMerchantTransactions(res.data.merchant_all_prod_trasactions)
            };

        }).catch((error)=> {
            console.log(error)

        });
    }, []);


    // Calculte amount datas
    const amounts     = allMerchantTransactions.map(transactions => Number(transactions.amount));
    const totalAmount = amounts.reduce((accumulator, currentValue)=> accumulator + currentValue, 0)

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };


    // Get selecetd month value
    const handleSelectedMonthChange = (e)=> {
        updateSelectedMonth(e.target.value);
    };


    // Call the Filtered data API
    useEffect(() => {
        handleFiteredData();
    }, [selectedMonth])
    


    // Get filtered Data
    const handleFiteredData = ()=> {
        axiosInstance.get(`api/v2/merchant/month/prod/transactions/?month=${selectedMonth}&currency=${currency}`).then((res)=> {
            // console.log(res.data.merchant_all_prod_trasactions)
            if (res.status === 200) {
                updateAllMerchantTransactions(res.data.merchant_all_prod_trasactions)
            };

        }).catch((error)=> {
            console.log(error)

        });
    };


    return (
        <>
        <Card 
            style={{ 
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", 
                "&:hover": {
                boxShadow: "0px 1px 20px rgba(0,0,0,0.3)" 
                }
            }}>
        <CardContent style={{ overflow: "auto", maxHeight: "18rem" }}>
               
            <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Typography variant="h5" component="div">Total Transactions</Typography>
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                            <InputLabel id="demo-select-small-label">Curency</InputLabel>
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
                    </Grid>

                    <Grid item xs={6} sm={3} md={2}>
                        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                            <InputLabel id="demo-select-month-label">Month</InputLabel>
                            <Select
                                labelId="demo-select-month-label"
                                id="demo-select-month"
                                label="Month"
                                name='month'
                                onChange={handleSelectedMonthChange}
                                value={selectedMonth}
                            >
                                {currentMonthList.map((month, index)=> {
                                    return (
                                        <MenuItem key={index} value={month}>{month}</MenuItem>
                                    )})}
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
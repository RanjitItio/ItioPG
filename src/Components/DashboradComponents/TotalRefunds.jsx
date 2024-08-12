import React, { useState } from 'react';
import { Card, CardContent, Typography, 
        Box, MenuItem, FormControl, 
        InputLabel, Select } from '@mui/material';
import TransactionLineChart from './LineChart';



export default function MerchantTotalRefunds(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [currency, setCurrency] = useState('');

    // Current month
   const now =  new Date();
   const month = now.getMonth();
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const currentMonthName = monthNames[month]


    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };
    
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

                <Typography>{currentMonthName} Month Refunds</Typography>

                <Box sx={{ marginTop: 0 }}>
                    <TransactionLineChart />
                </Box>
                
            </CardContent>
        </Card>

    );
};





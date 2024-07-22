import React, { useState } from 'react';
import { Card, CardContent, Typography, 
        Box, Button, Menu, MenuItem, FormControl, 
        InputLabel, Select } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TransactionLineChart from './LineChart';



export default function MerchantTotalRefunds(){

    const [anchorEl, setAnchorEl] = useState(null);
    const [duration, setDuration] = useState('');

    // Current month
   const now =  new Date();
   const month = now.getMonth();

   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

   const currentMonthName = monthNames[month]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
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





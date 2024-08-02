import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
        AppBar, Tabs, Tab, Box, 
        TextField, MenuItem, Button,
        Table, TableBody, TableCell, 
        TableContainer, TableHead, 
        TableRow, Paper, Link, Chip, 
        Typography, Grid
    } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import PaymentButtonCode from './ButtonCode';



const statuses = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
];



// All Payment form pages
export default function AllPaymentForms() {
    const navigate = useNavigate();
    const [buttonData, updateButtonData] = useState([]);  // All payment button data
    const [open, setOpen]         = useState(false);      // Open popup
    const [buttonID, setButtonID] = useState('');   // Unique Button ID

    // Method to open the popup
    const handleOpen = (button_id) => {
        setOpen(true);
        setButtonID(button_id)
    };

    // Fetch all the user created payment Button when the page loads
    useEffect(() => {
        axiosInstance.get(`api/merchant/payment/button/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                updateButtonData(res.data.merchant_payment_buttons)
            };

        }).catch((error)=> {
            console.log(error)

        })
    }, []);
    

    return (
        <>
        <Box sx={{ p: 3 }}>
            <AppBar position='static' color='transparent'>
                <Tabs value={0} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <Tab label="Payment Forms" />
                <Tab label='Documentation' sx={{ marginLeft: '60.5%' }} />
                <Tab 
                    label='Create Payment Button' 
                    sx={{
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    }}
                    onClick={()=> {navigate('/merchant/payment/form/steps/')}}
                />
                </Tabs>
            </AppBar>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField label="Title" variant="outlined" size="small" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Status"
                        select
                        variant="outlined"
                        size="small"
                        value="All"
                        fullWidth
                    >
                        {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField label="Count" variant="outlined" size="small" type="number" defaultValue={25} fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="contained" color="primary" fullWidth>Search</Button>
                </Grid>

            </Grid>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Total Sales</TableCell>
                            <TableCell>Business Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                         {buttonData.map((button, index)=> (
                        <TableRow key={index}>
                            <>
                            
                                <TableCell>
                                    <Link href="#">{button.button_title}</Link>
                                </TableCell>

                                <TableCell></TableCell>

                                <TableCell>{button.businessName}</TableCell>

                                <TableCell>{button.fixedAmount + button.customerAmount}</TableCell>

                                <TableCell>25 Jul 2024, 02:29:48 pm</TableCell>

                                <TableCell>
                                    <Chip label="Active" color="primary" />
                                </TableCell>

                                <TableCell>
                                    <Button onClick={()=> {handleOpen(button.button_id)}}>GET BUTTON CODE</Button>
                                </TableCell>
                            </>

                        </TableRow>
                         ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Showing 1 - 1
            </Typography>

        </Box>

        <PaymentButtonCode 
            open={open}
            setOpen={setOpen}
            buttonID={buttonID}
        />
        </>
    );
}



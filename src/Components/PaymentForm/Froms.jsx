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
import Footer from '../Footer';



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

    // Fetch all the user created payment Forms
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


    // Convert date time format
    const ConverDateTime = (dateTime)=> {
        const date = new Date(dateTime);

        const formatedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        })

        return formatedDate;
    };
    

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

            {/* <Grid container spacing={2} mt={2}>
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

            </Grid> */}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead style={{backgroundColor:'#dcf5ff'}}>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Total Sales</b></TableCell>
                            <TableCell><b>Business Name</b></TableCell>
                            <TableCell><b>Form Amount</b></TableCell>
                            <TableCell><b>Created At</b></TableCell>
                            <TableCell><b>Status</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                         {buttonData.map((button, index)=> (
                        <TableRow key={index}>
                            <>
                            
                                <TableCell>
                                    <Link href="#">{button.button_title}</Link>
                                </TableCell>

                                <TableCell>{button.total_sales} {button?.form_currency}</TableCell>

                                <TableCell>{button.businessName}</TableCell>

                                <TableCell>{button.fixedAmount + button.customerAmount} {button?.form_currency}</TableCell>

                                <TableCell>{button.cretedAt ? ConverDateTime(button.cretedAt) : ''}</TableCell>

                                <TableCell>
                                    <Chip label={button.status ? (button.status === true ? 'Active' : 'Inactive') : 'Active'} color="primary" />
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

        <Footer />
        </>
    );
}



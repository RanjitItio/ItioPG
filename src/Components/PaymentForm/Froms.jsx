import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
        AppBar, Tabs, Tab, Box, Button,
        Table, TableBody, TableCell, 
        TableContainer, TableHead, 
        TableRow, Paper, Link, Chip, 
        Typography, useMediaQuery
    } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import PaymentButtonCode from './ButtonCode';
import Footer from '../Footer';
import MenuIcon from '@mui/icons-material/Menu';



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
    const isSmallScreen = useMediaQuery('(max-width:600px)');  // Adjust breakpoint as needed

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
            // console.log(error)

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
            
            <AppBar position="static" color="transparent">
                {isSmallScreen ? (
                    // For small screens, show a menu button
                    <Tabs value={0} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Tab label='Buttons'>
                            <MenuIcon />
                        </Tab>

                        <Tab
                            label="Create Payment Button"
                            sx={{
                                backgroundColor: '#0081cf',
                                color: '#ffff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                },
                            }}
                            onClick={() => {
                            navigate('/merchant/payment/form/steps/');
                            }}
                        />
                    </Tabs>
                ) : (
                    // For larger screens, show the full tab layout
                    <Tabs value={0} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                        <Tab label="Payment Buttons" />
                        <Tab label="Documentation" sx={{ marginLeft: 'auto', marginRight: '16px' }} />
                        <Tab
                            label="Create Payment Button"
                            sx={{
                            backgroundColor: 'primary.main',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                            }}
                            onClick={() => {
                            navigate('/merchant/payment/form/steps/');
                            }}
                        />
                    </Tabs>
                )}
            </AppBar>


            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead style={{backgroundColor:'#dcf5ff'}}>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Total Sales</b></TableCell>
                            <TableCell><b>Business Name</b></TableCell>
                            <TableCell><b>Button Amount</b></TableCell>
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



import React, { useState, useEffect} from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, MenuItem, Select, InputLabel, FormControl, Collapse, Box, Grid,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FilterListIcon from '@mui/icons-material/FilterList';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';







// All Business Transaction Data
export default function BusinessTransactionTable () {
  
  const [filterOpen, setFilterOpen] = useState(false);  // Open filter fields state
  const [businessTransactionData, updateBusinessTransactionData] = useState([])  // Transaction data state
  const [loader, setLoader] = useState(true);
  const [emptyData, setEmptyData] = useState(false);

  // Method to open Filter fields
  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };


  useEffect(() => {
    axiosInstance.get(`api/v4/merchant/business/transactions/`).then((res)=> {
        // console.log(res.data.data)
        if (res.status === 200) {
            const sortedData = res.data.data.sort((a, b) => new Date(b.business_transaction.id) - new Date(a.business_transaction.id));
            updateBusinessTransactionData(sortedData);
            setLoader(false);

            if (sortedData.length === 0) {
                setEmptyData(true);
                setLoader(false);
            };
        }

    }).catch((error)=> {
        console.log(error)

    })
}, []);

// Status Colur according to the status type
const getStatusColor = (status)=> {
    switch (status) {
        case 'Success':
            return 'success'
        case 'Cancelled':
            return 'danger' 
        case 'Pending':
            return 'warning' 
        default:
            return 'defaultColor';
    }
};

// API response witing component
if (loader) {
    return (
        <>
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
            <div className="d-flex justify-content-start">
                <p>
                    <b><span className='fs-3'>PAYMENTS</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
            </div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
            <CircularProgress />
        </Box>
        </>
    )
};


// If the response data is empty
if (emptyData) {
    return (
        <>

        <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
            {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
            <div className="d-flex justify-content-start">
                <p>
                    <b><span className='fs-3'>PAYMENTS</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
            </div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
            <DeleteOutlineIcon sx={{ fontSize: 90 }} />
        </Box>
        <p style={{display:'flex', justifyContent: 'center'}}>Nothing to show</p>

        </>
    )
};


return (

    <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
    <Card>

      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
        <div className="d-flex justify-content-start">
            <p>
                <b><span className='fs-3'>PAYMENTS</span></b> <br />
                <small>List of all payments received from customers</small>
            </p>
        </div>
            
        <Box>
          <Button variant="contained" onClick={handleFilterClick} startIcon={<FilterListIcon />}>
            Filter
          </Button>

          <Button variant="contained" style={{ marginLeft: 10 }}>
            Export
          </Button>

        </Box>
      </Box>
     
        <Collapse in={filterOpen}>
            <Box p={1}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-currency-label">Currency</InputLabel>
                        <Select
                          labelId="demo-simple-select-currency-label"
                          id="demo-simple-select-currency"
                          value={'USD'}
                          // onChange={handleChange}
                        >
                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                        <FormHelperText>Select Currency</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-helper-label">Business Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={'Business 1'}
                          // onChange={handleChange}
                        >
                            <MenuItem value={'Business 1'}>Business 1</MenuItem>
                            <MenuItem value={'Business 2'}>Business 2</MenuItem>
                            <MenuItem value={'Business 3'}>Business 3</MenuItem>
                        </Select>
                        <FormHelperText>Select Business</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                          type="date" 
                          label="Date" 
                          variant="outlined" 
                          size="medium" 
                          InputLabelProps={{ shrink: true }} 
                          sx={{width: {xs: '100%', sm: '95%',md:'80%'}, marginBottom: {xs: 2}}}
                          />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                          type="text" 
                          label="Order ID" 
                          variant="outlined" 
                          size="medium" 
                          sx={{width: {xs: '100%', sm: '95%',md:'80%'}, marginBottom: {xs: 2}}}
                          />
                </Grid>
                
            </Grid>
            </Box>
        </Collapse>

        <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Sl No.</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Business Name</b></TableCell>
                        <TableCell><b>Payer</b></TableCell>
                        <TableCell><b>Method</b></TableCell>
                        <TableCell><b>Order ID</b></TableCell>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Fee</b></TableCell>
                        <TableCell><b>Total</b></TableCell>
                        <TableCell><b>Currency</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {businessTransactionData.map((transaction, index) => (
                    <TableRow key={index}>

                        {/* Sl No. Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.id : '-'}</TableCell>

                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.date : '-'}</TableCell>

                        <TableCell>
                            <Box display="flex" alignItems="center">
                                {/* <img src={`/path/to/logo/${transaction.business_transaction.merchant}.png`} alt={transaction.name} style={{ width: 24, height: 24, marginRight: 8 }} /> */}
                                <Box>
                                    <div>{transaction.business_transaction ? transaction.business_transaction.merchant : '-'}</div>
                                    {/* <div style={{ color: 'gray', fontSize: 'small' }}>{transaction.business_transaction.merchant}</div> */}
                                </Box>
                            </Box>
                        </TableCell>

                        {/* Payer Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.payer : '-'}</TableCell>

                        {/* Payment Method Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.pay_mode : '-'}</TableCell>

                         {/* Order ID Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.order_id : '-'}</TableCell>

                        {/* Amount Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.amount : '-'}</TableCell>

                        {/* Fee Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.fee : '-'}</TableCell>

                        {/* Total Amount Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.total_amount : '-'}</TableCell>
  
                         {/* Currency Column */}
                        <TableCell>{transaction.business_transaction ? transaction.business_transaction.currency : '-'}</TableCell>

                        <TableCell>
                            <span className={`text-${getStatusColor(transaction.business_transaction?.status)}`}>
                                {transaction.business_transaction ? transaction.business_transaction.status : '-'}
                            </span>
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Pagination count={10} color="primary" sx={{margin: 3}}/>

    </Card>
    </Box>
  );
};



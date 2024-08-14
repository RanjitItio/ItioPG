import React, { useState, useEffect, useRef} from 'react';
import {
  Card,Button,TextField, MenuItem, Select, InputLabel, FormControl, Collapse, Box, Grid,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FilterListIcon from '@mui/icons-material/FilterList';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import SandBoxProductionTransactionSwitch from './Switch';
import SandBoxTransactionTable from './SandBoxTransactions';
import ProductionTransactionTable from './ProductionTransactions';
import animationData from '../Animations/EmptyAnimation.json';
import Lottie from 'lottie-react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IconButton from '@mui/material/IconButton';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';





// All Business Transaction Data
export default function BusinessTransactionTable () {

  const [filterOpen, setFilterOpen] = useState(false);  // Open filter fields state
  const [businessTransactionData, updateBusinessTransactionData] = useState([])  // Production Transaction data state
  const [businessSandboxTransactionData, updateBusinessSandboxTransactionData] = useState([])  // Production Transaction data state
  const [isLoading, setIsLoading] = useState(true);
  const [emptyData, setEmptyData] = useState(false);
  const [paginationValue, setPaginationValue] = useState(0);   // Pagination Value state
  const [SwitchTransaction, setSwitchTransaction] = useState(true);
  const [transactionModeName, setTransactionModeName] = useState('');
  const [exportData, updateExportData] = useState([]); // Excel Data
  const [searchText, updateSearchText] = useState();    // User searched text
  const [error, setError] = useState('');


  
   
  // Method to open Filter fields
  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  // Uppdate Pagination value
  const handlePaginationChange = (event, value)=> {
    setPaginationValue(value);

    handlePaginationTransactionData();
};

//   Method to accept transaction type of user
  const handleSwitchTransactions = (event)=> {
      setSwitchTransaction(event.target.checked)

  };

  // Set transaction mode
  useEffect(() => {
    if (SwitchTransaction) {
        setTransactionModeName('Production Mode')
    } else if (!SwitchTransaction) {
        setTransactionModeName('Test Mode')
    };
  }, [SwitchTransaction])
  

  


  // Call API for all sandBox transaction data
  useEffect(() => {

    if (!SwitchTransaction) {

        axiosInstance.get(`api/v2/merchant/sandbox/transactions/?limit=${10}&offset=${0}`).then((res)=> {

            if (res.status === 200) {
                const sandBoxData = res.data.merchant_sandbox_trasactions
                updateBusinessSandboxTransactionData(sandBoxData);
                setIsLoading(false);
    
                if (sandBoxData.length === 0) {
                    setEmptyData(true);
                    setIsLoading(false);
                };
            }

        }).catch((error)=> {
            console.log(error)

            if (error.response.data.error === 'No transaction available') {
                setEmptyData(true);
                setIsLoading(false);
            };

        })
    }
  }, [SwitchTransaction])
  


// Method to fetch pagination Data
const handlePaginationTransactionData = ()=> {
    let offsetValue = 0

    if (paginationValue === 1) {
        offsetValue = 0
    } else if (paginationValue >= 1) {
        offsetValue = 10 * paginationValue
    };

    // console.log(paginationValue)
    axiosInstance.get(`api/v2/merchant/prod/transactions/?limit=${10}&offset=${offsetValue}`).then((res)=> {

        if (res.status === 200) {
            const paginationProdData = res.data.merchant_prod_trasactions
            updateBusinessTransactionData(paginationProdData);
            setIsLoading(false);

            if (paginationProdData.length === 0) {
                // setEmptyData(true);
                setIsLoading(false);
            };
        };

    }).catch((error)=> {
        console.log(error)

        if (error.response.data.error === 'No transaction available') {
            // setEmptyData(true);
            setIsLoading(false);
        };
    });
};


  // Fetch all the production transaction data of merchant
  useEffect(() => {

    axiosInstance.get(`api/v2/merchant/prod/transactions/?limit=${10}&offset=${0}`).then((res)=> {

        if (res.status === 200) {
          
            const prodData = res.data.merchant_prod_trasactions
            updateBusinessTransactionData(prodData);
            setIsLoading(false);

            if (prodData.length === 0) {
                setEmptyData(true);
                setIsLoading(false);
            };
        }

    }).catch((error)=> {
        console.log(error)

        if (error.response.data.error === 'No transaction available') {
            setEmptyData(true);
            setIsLoading(false);
        };
    })

}, []);



// Export to Excel
const exportToExcel = async ()=> {
    if (exportData && exportData.length > 0) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('sheet1')

        const headers = Object.keys(exportData[0])

        worksheet.addRow(headers)

        exportData.forEach((item)=> {
            worksheet.addRow(Object.values(item))
        })

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'transactions.xlsx');
    } else {
        console.log('No Data available to Download')
    }
};


// Download Transactions
const handleDownloadTransactions = ()=> {
    axiosInstance.get(`api/v2/merchant/export/transactions/`).then((res)=> {
        // console.log(res)
        if (res.status === 200 && res.data.success === true) {
            updateExportData(res.data.export_merchant_all_prod_trasactions);
            exportToExcel();
        }

      }).catch((error)=> {
        console.log(error)

      })
};

// Searched text value
const handleSearchedText = (e)=> {
    updateSearchText(e.target.value);
};

// Fetch all the searched transactions
const handleFetchSearchedTransaction = ()=> {
    // If mode is Production Mode
    if (transactionModeName === 'Production Mode') {
        axiosInstance.get(`api/v2/merchant/search/prod/transactions/?query=${searchText}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateBusinessTransactionData(res.data.merchant_searched_transactions)
            };
    
         }).catch((error)=> {
            console.log(error)
    
            if (error.response.data.message === 'No transaction found') {
                setEmptyData(true);
            }
         });

         // If Mode is Test Mode
    } else if (transactionModeName === 'Test Mode') {
        axiosInstance.get(`/api/v2/merchant/search/sb/transactions/?query=${searchText}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateBusinessSandboxTransactionData(res.data.merchant_searched_sb_transactions)
            };
    
        }).catch((error)=> {
            console.log(error)
    
            if (error.response.data.message === 'No transaction found') {
                setEmptyData(true);
            }
        })
    }
};


// API response witing component
if (isLoading) {
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
       
       <Grid container p={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <div className="d-flex justify-content-start">
                <p>
                    <b><span className='fs-3'>PAYMENTS</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
                </div>
            </Grid>

            <Grid item xs={6} sm={8} md={9} lg={9} textAlign="right">
                <Grid container justifyContent="flex-end">

                <Grid item>
                    <TextField
                        id="standard-basic" 
                        label="Search Transactions" 
                        variant="standard"
                        onChange={(e)=> handleSearchedText(e)}
                        />

                    <IconButton aria-label="delete" size="large" onClick={handleFetchSearchedTransaction}>
                        <ContentPasteSearchIcon fontSize="inherit" color='primary' />
                    </IconButton>
                </Grid>

                <Grid item>
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={handleDownloadTransactions}>
                        Export
                    </Button>
                </Grid>

                </Grid>
            </Grid>
        </Grid>
        
        

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0%'}}>
            <Lottie animationData={animationData} loop={true} style={{width:'200px', height: '200px'}} />
        </Box>
        <p style={{display:'flex', justifyContent: 'center'}}>Nothing to show</p>

        </>
    )
};




return (

    <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
    <Card sx={{borderRadius:'20px', boxShadow:'-28px -8px 9px 0px rgba(0,0,0,0.75)'}}>
        <Grid container p={2} justifyContent="space-between" alignItems="center">
            <Grid item xs={6} sm={4} md={3} lg={3}>
                <div className="d-flex justify-content-start">
                <p>
                    <b><span className='fs-3'>PAYMENTS</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
                </div>
            </Grid>

            <Grid item xs={6} sm={8} md={9} lg={9} textAlign="right">
                <Grid container justifyContent="flex-end">

                <Grid item>
                    <TextField
                        id="standard-basic" 
                        label="Search Transactions" 
                        variant="standard"
                        onChange={(e)=> handleSearchedText(e)}
                        />

                    <IconButton aria-label="delete" size="large" onClick={handleFetchSearchedTransaction}>
                        <ContentPasteSearchIcon fontSize="inherit" color='primary' />
                    </IconButton>
                </Grid>

                <Grid item>
                    <Button variant="contained" style={{ marginLeft: 10 }} onClick={handleDownloadTransactions}>
                        Export
                    </Button>
                </Grid>

                </Grid>
            </Grid>
        </Grid>

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

        {/* Production and Sandbox Transaction table */}
        {SwitchTransaction ? 
          <ProductionTransactionTable businessTransactionData={businessTransactionData} /> 
        : 
        <SandBoxTransactionTable businessSandboxTransactionData={businessSandboxTransactionData} />}

        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            <Pagination 
                count={10} 
                color="primary" 
                sx={{margin: 3}}
                onChange={handlePaginationChange}
                />

            <SandBoxProductionTransactionSwitch 
                handleSwitchTransactions={handleSwitchTransactions} 
                transactionModeName={transactionModeName}
            />
        </Box>

    </Card>
    </Box>
  );
};



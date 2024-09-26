import React, { useState, useEffect, useRef} from 'react';
import {
  Card,Button,TextField, Box, Grid,
} from '@mui/material';
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
import { useTheme } from '@mui/material/styles';
import Footer from '../Footer';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import {Button as JoyButton} from '@mui/joy';





// All Business Transaction Data
export default function BusinessTransactionTable () {

  const theme = useTheme();

  const [businessTransactionData, updateBusinessTransactionData] = useState([])  // Production Transaction data state
  const [businessSandboxTransactionData, updateBusinessSandboxTransactionData] = useState([])  // Production Transaction data state
  const [isLoading, setIsLoading] = useState(true);
  const [emptyData, setEmptyData] = useState(false);
  const [SwitchTransaction, setSwitchTransaction] = useState(true);
  const [transactionModeName, setTransactionModeName] = useState('');
  const [exportData, updateExportData] = useState([]); // Excel Data
  const [searchText, updateSearchText] = useState();    // User searched text
  const [rowCount, setRowCount] = useState(0);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);  // Filter fileds state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectOrderID, setSelectOrderID] = useState('');
  const [selectTransactionID, setSelectTransactionID] = useState('');
  const [selectBusinessname, setSelectBusinessName] = useState('');
  const [filterError, setFilterError] = useState('');  // Error message of filter
  


  /// Open close Filter fields
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

  let countPagination = Math.ceil(rowCount);

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
  // ##########################################
  useEffect(() => {

    if (!SwitchTransaction) {

        axiosInstance.get(`api/v2/merchant/sandbox/transactions/?limit=${10}&offset=${0}`).then((res)=> {

            if (res.status === 200) {
                const sandBoxData = res.data.merchant_sandbox_trasactions
                updateBusinessSandboxTransactionData(sandBoxData);
                setRowCount(res.data.total_rows)
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
  

  // Fetch all the production transaction data of merchant //
  //########################################################
  useEffect(() => {

    axiosInstance.get(`api/v2/merchant/prod/transactions/?limit=${10}&offset=${0}`).then((res)=> {

        if (res.status === 200) {
          
            const prodData = res.data.merchant_prod_trasactions
            updateBusinessTransactionData(prodData);
            setRowCount(res.data.total_rows)
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



// Uppdate Pagination value
const handlePaginationChange = (event, value)=> {
   
    let limit = 10
    let offset = (value - 1) * limit

    if (transactionModeName === 'Production Mode') {

        axiosInstance.get(`api/v2/merchant/prod/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
    
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
        })

    } else if (transactionModeName === 'Test Mode') {
        axiosInstance.get(`api/v2/merchant/sandbox/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {

            if (res.status === 200) {
                const sandBoxData = res.data.merchant_sandbox_trasactions
                updateBusinessSandboxTransactionData(sandBoxData);
                setRowCount(res.data.total_rows)
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
    };
};



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
                // setEmptyData(true);
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
                // setEmptyData(true);
            }
        })
    }
};

    // Get selected date
    const handleSelctedDate = (e, newValue)=> {
        setSelectedDate(newValue)
    };

    // Get selected Order ID
    const handleSelctedOrderID = (e)=> {
        const value = e.target.value;
        setSelectOrderID(value);
    };
    // Get selected Transaction ID
    const handleSelctedTransactionID = (e)=> {
        const value = e.target.value;
        setSelectTransactionID(value);
    };
    // Get selected Business Name
    const handleSelctedBusinessName = (e)=> {
        const value = e.target.value;
        setSelectBusinessName(value);
    };


  // Filter Transaction Method
  const handleFilterTransaction = ()=> {
    if (selectedDate === '' || selectedDate === null) {
        setFilterError('Please select date range')
    } else if (selectOrderID === '') {
        setFilterError('Please type order ID')
    } else if(selectTransactionID === '') {
        setFilterError('Please select transaction ID')
    } else if (selectBusinessname === '') {
        setFilterError('Please select Business Name')
    }
    else {

        axiosInstance.post(`/api/v2/filter/merchant/transaction/`, {
            date: selectedDate,
            order_id: selectOrderID,
            transaction_id: selectTransactionID,
            business_name: selectBusinessname
    
        }).then((res)=> {
    
            if (res.status === 200) {
              
                const prodData = res.data.merchant_prod_trasactions
                updateBusinessTransactionData(prodData);
    
                if (prodData.length === 0) {
                    setFilterError('No data found')
                };
            }
    
        }).catch((error)=> {
            console.log(error)
    
            if (error.response.data.message === 'No transaction available') {
                setFilterError('No Data Found');
            };
        });
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
                    <b><span className='fs-3'>PAYMENT</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
            </div>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
            <CircularProgress />
        </Box>

        <Footer />
        </>
    )
};



// If the response data is empty
if (emptyData) {
    return (
        <>
       
       <Grid container p={2} justifyContent="space-between" alignItems="center">

            <Grid item xs={12} sm={4} md={3} lg={3}>
                <div className="d-flex justify-content-start">
                <p>
                    <b><span className='fs-3'>PAYMENT</span></b> <br />
                    <small>List of all payments received from customers</small>
                </p>
                </div>
            </Grid>

            <Grid item xs={12} sm={8} md={9} lg={9} textAlign="right">
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

        <Footer />
        </>
    )
};



return (
    <>
    <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
        <Card sx={{borderRadius:'20px', height:'100%'}}>
            <Grid container p={2} justifyContent="space-between" alignItems="center">

                <Grid item xs={12} sm={4} md={3}>
                    <div className="d-flex justify-content-start">
                    <p>
                        <b><span className='fs-3'>PAYMENT</span></b> <br />
                        <small>List of all payments received from customers</small>
                    </p>
                    </div>
                </Grid>

                <Grid item xs={12} sm={8} md={9} textAlign="right">
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
                            <Button variant="contained" onClick={handleDownloadTransactions}>
                                Export
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                            variant="contained"
                            style={{ marginLeft: 10 }}
                            onClick={handleToggleFilters}
                            >
                            Filters
                            </Button>
                        </Grid>
                    </Grid> 
                </Grid>

                {/* Hidden Drop Down */}
                {showFilters && (
                    <>
                    <Grid container p={2} justifyContent="flex-end" spacing={2}>
                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                            <Select
                                label="date"
                                placeholder='Date'
                                id="date"
                                value={selectedDate}
                                name="date"
                                onChange={handleSelctedDate}
                            >
                                <Option value="Today">Today</Option>
                                <Option value="Yesterday">Yesterday</Option>
                                <Option value="ThisWeek">This Week</Option>
                                <Option value="ThisMonth">This Month</Option>
                                <Option value="PreviousMonth">Previous Month</Option>
                            </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input placeholder="Order ID" onChange={(e)=> handleSelctedOrderID(e)} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <Input placeholder="Transaction ID" onChange={(e)=> handleSelctedTransactionID(e)} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <Input placeholder="Business Name" onChange={(e)=> handleSelctedBusinessName(e)} />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={1}>
                            <FormControl fullWidth>
                                <JoyButton onClick={handleFilterTransaction}>Submit</JoyButton>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <small style={{color:'red'}}>{filterError && filterError}</small>
                    </>
                )}
            </Grid>

            {/* Production and Sandbox Transaction table */}
            {SwitchTransaction ? 
            <ProductionTransactionTable 
                    businessTransactionData={businessTransactionData} 
                    /> 
            : 
            <SandBoxTransactionTable businessSandboxTransactionData={businessSandboxTransactionData} />}


            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap', 
                gap: 2, 
                margin: '20px 0'
                }}>
                <Pagination
                    count={countPagination ? countPagination : 10}
                    color="primary"
                    sx={{
                    [theme.breakpoints.down('sm')]: {
                        margin: 2, 
                        width: '100%', 
                    }
                    }}
                    onChange={(e, value)=> {handlePaginationChange(e, value)}}
                />

                <SandBoxProductionTransactionSwitch
                    handleSwitchTransactions={handleSwitchTransactions}
                    transactionModeName={transactionModeName}
                    sx={{
                    [theme.breakpoints.down('sm')]: {
                        marginBottom: 2,
                    }
                    }}
                />
                </Box>

        </Card>
    </Box>

    <Footer />
    </>
  );
};



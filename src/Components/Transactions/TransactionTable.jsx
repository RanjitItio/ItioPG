import React, { useState, useEffect, useRef} from 'react';
import {
  Card,Button, TextField, Box, Grid,
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
import { useTheme } from '@mui/material/styles';
import Footer from '../Footer';
import FormControl from '@mui/material/FormControl';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import { Button as JoyButton } from '@mui/joy';
import { DatePicker } from 'antd';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery } from '@mui/material';


const { RangePicker } = DatePicker;





// All Business Transaction Data
export default function BusinessTransactionTable () {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [businessTransactionData, updateBusinessTransactionData] = useState([])  // Production Transaction data state
  const [businessSandboxTransactionData, updateBusinessSandboxTransactionData] = useState([])  // Production Transaction data state
  const [isLoading, setIsLoading] = useState(true);
  const [emptyData, setEmptyData] = useState(false);
  const [SwitchTransaction, setSwitchTransaction] = useState(true);   // Switch between transaction Mode
  const [transactionModeName, setTransactionModeName] = useState(''); // Test and Prod mode
  const [exportData, updateExportData] = useState([]); // Excel Data
  const [searchText, updateSearchText] = useState();    // User searched text
  const [rowCount, setRowCount] = useState(0);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState("");
  const [selectOrderID, setSelectOrderID] = useState('');
  const [selectTransactionID, setSelectTransactionID] = useState('');
  const [selectBusinessname, setSelectBusinessName] = useState('');

  const [showFilters, setShowFilters] = useState(false);  // Filter fileds state
  const [filterError, setFilterError] = useState('');  // Error message of filter
  const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
  const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
  const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date 
  const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
  const [filterActive, setFilterActive]         = useState(false);      //// Filter Active Status


  let countPagination = Math.ceil(rowCount);

    /// Filter Date Range Selected in Large Screen
    const handelLargeScreenCustomDateRange = (date, dateString)=> {
        setLgStartDateRange(dateString[0])
        setLgEndDateRange(dateString[1])
    };


    /// Filter Small Screen Start date range
    const handleSmallScreenStartDateRange = (date, dateString)=> {
        setShStartDateRange(dateString)
    };


    /// Filter Small Screen End Date Range
    const handleSmallScreenEndDateRange = (date, dateString)=> {
        setShEndDateRange(dateString)
    };


    //   Method to get transaction type of user
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
    }, [SwitchTransaction]);
  

  
  // Call API for all sandBox transaction data
  // ##########################################
    useEffect(() => {

        if (!SwitchTransaction) {

            axiosInstance.get(`api/v2/merchant/sandbox/transactions/`).then((res)=> {

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
    }, [SwitchTransaction]);

  

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
        // console.log(error)

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

    
    if (filterActive) {
        //// Get filter paginated data
        if (isSmallScreen && selectedDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilteredPaginatedData(ShStartDateRange, ShEndDateRange, limit, offset);
            }

        } else if (!isSmallScreen && selectedDate === 'CustomRange') {
            if (!LgStartDateRange) {
                setFilterError('Please Select Date Range');

            } else if (!LgEndDateRange) {
                setFilterError('Please Select Date Range');

            } else {
                setFilterError('');
                GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
            }

        } else {
            setFilterError('');
            GetFilteredPaginatedData(LgStartDateRange, LgEndDateRange, limit, offset);
        }

    } else {

        //// Get paginated data of Prod Transaction
        if (transactionModeName === 'Production Mode') {
    
            axiosInstance.get(`api/v2/merchant/prod/transactions/?limit=${limit}&offset=${offset}`).then((res)=> {
        
                if (res.status === 200) {
                    const paginationProdData = res.data.merchant_prod_trasactions
                    updateBusinessTransactionData(paginationProdData);
                    setIsLoading(false);
                    setRowCount(res.data.total_rows)
        
                    if (paginationProdData.length === 0) {
                        // setEmptyData(true);
                        setIsLoading(false);
                    };
                };
        
            }).catch((error)=> {
                // console.log(error)
        
                if (error.response.data.error === 'No transaction available') {
                    // setEmptyData(true);
                    setIsLoading(false);
                };
            })

            //// Get paginated data of Test Transaction
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
                // console.log(error)
    
                if (error.response.data.error === 'No transaction available') {
                    setEmptyData(true);
                    setIsLoading(false);
                };
    
            })
        };
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



    // Filter Transaction Method
    const handleFilterTransaction = ()=> {
        if (isSmallScreen && selectedDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilteredData(ShStartDateRange, ShEndDateRange);
            }

        } else if (!isSmallScreen && selectedDate === 'CustomRange') {
            if (!LgStartDateRange) {
                setFilterError('Please Select Date Range');

            } else if (!LgEndDateRange) {
                setFilterError('Please Select Date Range');

            } else {
                setFilterError('');
                GetFilteredData(LgStartDateRange, LgEndDateRange);
            }

        } else {
            setFilterError('')
            GetFilteredData()
        }
        
    };


    //// Get filtered data from API
    const GetFilteredData = (startDate, endDate)=> {
        axiosInstance.post(`/api/v2/filter/merchant/transaction/`, {
            date: selectedDate,
            order_id: selectOrderID,
            transaction_id: selectTransactionID,
            business_name: selectBusinessname,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const prodData = res.data.merchant_prod_trasactions
                updateBusinessTransactionData(prodData);
                setFilterError('')
                setRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);

            setTimeout(() => {
                setFilterError('');
            }, 2000);

            if (error.response.data.message === 'No transaction available') {
                setFilterError('No Data Found');
            } else {
                setFilterError('')
            }
        })
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v2/filter/merchant/transaction/?limit=${limit}&offset=${offset}`, {
            date: selectedDate,
            order_id: selectOrderID,
            transaction_id: selectTransactionID,
            business_name: selectBusinessname,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                const prodData = res.data.merchant_prod_trasactions
                updateBusinessTransactionData(prodData);
                setFilterError('')
                setRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 2000);

            if (error.response.data.message === 'No transaction available') {
                setFilterError('No Data Found');
            } else {
                setFilterError('')
            }
        })
    };


    // Filter Reset method
    const handleFilterReset = ()=> {
        setSelectedDate('');
        setSelectOrderID('');
        setSelectTransactionID('');
        setSelectBusinessName('');

        setFilterActive(false);
        setLgStartDateRange('');
        setLgEndDateRange('');
        setShStartDateRange('');
        setShEndDateRange('');
    };

    //// Call default pagination after filter mode off
    useEffect(() => {
        if (!filterActive) {
            handlePaginationChange('e', 1);
        }
    }, [!filterActive]);



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
        // const [transactionModeName, setTransactionModeName] = useState(''); // Test and Prod mode
        // const [SwitchTransaction, setSwitchTransaction] = useState(true);

        //   Method to get transaction type of user
        // const handleSwitchTransactions = (event)=> {
        //     setSwitchTransaction(event.target.checked)
        // };

         // Set transaction mode
        // useEffect(() => {
        //     if (SwitchTransaction) {
        //         setTransactionModeName('Production Mode')
        //     } else if (!SwitchTransaction) {
        //         setTransactionModeName('Test Mode')
        //     };
        // }, [SwitchTransaction]);


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

            <Box sx={{display:'flex', justifyContent:'end'}}>
                <SandBoxProductionTransactionSwitch
                        handleSwitchTransactions={(event)=> setSwitchTransaction(!event.target.checked)}
                        transactionModeName={transactionModeName}
                        sx={{
                        [theme.breakpoints.down('sm')]: {
                            marginBottom: 2,
                        }
                        }}
                    />
            </Box>
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
                            <Button variant="contained" onClick={handleDownloadTransactions}>
                                Export
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                            variant="contained"
                            style={{ marginLeft: 10 }}
                            onClick={()=> setShowFilters(!showFilters)}
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
                                    onChange={(e, newValue)=> setSelectedDate(newValue)}
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        [`& .${selectClasses.indicator}`]: {
                                        transition: '0.2s',
                                        [`&.${selectClasses.expanded}`]: {
                                            transform: 'rotate(-180deg)',
                                        },
                                        },
                                    }}
                                >
                                    <Option value="Today">Today</Option>
                                    <Option value="Yesterday">Yesterday</Option>
                                    <Option value="ThisWeek">This Week</Option>
                                    <Option value="ThisMonth">This Month</Option>
                                    <Option value="PreviousMonth">Previous Month</Option>
                                    <Option value="CustomRange">Custom Range</Option>
                                </Select>
                            </FormControl>

                            {selectedDate === "CustomRange" && (
                                isSmallScreen ? (
                                    <>
                                        <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenStartDateRange} />
                                        <DatePicker style={{ width: '100%', marginTop:5 }} onChange={handleSmallScreenEndDateRange} />
                                    </>
                                ) : (
                                    <RangePicker 
                                        style={{ width: '100%', marginTop:5 }} onChange={handelLargeScreenCustomDateRange} 
                                        />
                                )
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input value={selectOrderID} placeholder="Order ID" onChange={(e)=> setSelectOrderID(e.target.value)} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input value={selectTransactionID} placeholder="Transaction ID" onChange={(e)=> setSelectTransactionID(e.target.value)} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={2.5}>
                            <FormControl fullWidth>
                                <Input value={selectBusinessname} placeholder="Business Name" onChange={(e)=> setSelectBusinessName(e.target.value)} />
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={6} sm={6} md={1}>
                            <FormControl fullWidth>
                                <JoyButton  onClick={handleFilterTransaction}>Submit</JoyButton>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} sm={6} md={1}>
                            <FormControl fullWidth>
                                <JoyButton onClick={handleFilterReset}>Reset</JoyButton>
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



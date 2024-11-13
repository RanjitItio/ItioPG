import React, { useState, useEffect } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import Footer from '../Footer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormControl from '@mui/material/FormControl';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import {Button as JoyButton} from '@mui/joy';
import { DatePicker } from 'antd';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const { RangePicker } = DatePicker;





// Get all the Merchant requested refunds
export default function AllMerchantRefundRequests() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [refundRequests, updateRefundRequests] = useState([]);   // All withdrawal request data
    const [exportData, updateExportData]         = useState([]); // Excel Data
    const [totalRowCount, setTotalRowCount]      = useState(0);
    const [searchQuery, updateSearchQuery]       = useState('');  // Search Query state

    const [showFilters, setShowFilters]          = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]            = useState('');
    const [filterError, setFilterError]          = useState('');  // Error message of filter
    const [LgStartDateRange, setLgStartDateRange] = useState('');  // Large Screen Start date
    const [LgEndDateRange, setLgEndDateRange]     = useState('');  // Large Screen End Date
    const [ShStartDateRange, setShStartDateRange] = useState('');  // Small screen Start date 
    const [ShEndDateRange, setShEndDateRange]     = useState('');  // Small Screen End date
    const [filterActive, setFilterActive]         = useState(false);      //// Filter Active Status
    const [filterStatus, setFilterStatus]         = useState('');    //// Filter selected status
    const [filterData, updateFilterData]         = useState({
        transactionId: '',
        refundAmount: '',
        status: ''
    })
    
    let countPagination = Math.ceil(totalRowCount)

    
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


    // Get all the Refund requests raised by merchant
    useEffect(() => {
        axiosInstance.get(`api/v6/merchant/refund/`).then((res)=> {
          // console.log(res)
  
          if (res.status === 200 && res.data.success === true) {
            updateRefundRequests(res.data.merchant_refunds)
            setTotalRowCount(res.data.total_count)
          }
  
        }).catch((error)=> {
        //   console.log(error)

          if (error.response.data.message === 'No refund requests available') {
               
          }
  
        })
      }, []);
  
  
      //  Status color according to the input
      const getStatusColor = (status) => {
          switch(status){
              case 'Approved':
                  return 'success'
              case 'Rejected':
                  return 'error'
              case 'Pending':
                  return 'warning'
              case 'Hold':
                  return 'info'
          }
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
              saveAs(blob, 'refunds.xlsx');

          } else {
              console.log('No Data available to Download')
          }
          
      };
  
      
      // Download all withdrawal requests
      const handleDownloadRefunds = ()=> {
          axiosInstance.get(`/api/v6/merchant/download/refunds/`).then((res)=> {
              // console.log(res)
      
              if (res.status === 200 && res.data.success === true) {
                  updateExportData(res.data.export_merchant_refunds);
  
                  setTimeout(() => {    
                      exportToExcel();
                  }, 1000);
              }
      
            }).catch((error)=> {
              console.log(error)
      
            })
      };

      
      // Set pagination Data
      const handlePaginationCount = (e, value)=> {
            
            let limit = 10;
            let offset = (value - 1) * limit;

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
                //// Get paginated data
                axiosInstance.get(`api/v6/merchant/refund/?limit=${limit}&offset=${offset}`).then((res) => {
                    if (res.status === 200 && res.data.success === true) {
                        updateRefundRequests(res.data.merchant_refunds);
                        setTotalRowCount(res.data.total_count)
                    }
                }).catch((error) => {
                    // console.log(error);
    
                    // if (error.response?.data?.message === 'No refund requests available') {
                    //     // Handle case when no refund requests are available
                    // }
                })
            }
      };


    // Get filter fileds data
    const handleFilterFieldsChange = (e)=> {
        const {name, value} = e.target;
        updateFilterData({
            ...filterData,
            [name]: value
        })
    };

    
    // Get Filtered data
    const handleGetFlterData = ()=> {
        if (isSmallScreen && filterDate === 'CustomRange') {
            if (!ShStartDateRange) {
                setFilterError('Please Select Start Date');

            } else if (!ShEndDateRange) {
                setFilterError('Please Select End Date');

            } else {
                setFilterError('');
                GetFilteredData(ShStartDateRange, ShEndDateRange);
            }

        } else if (!isSmallScreen && filterDate === 'CustomRange') {
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
        axiosInstance.post(`/api/v6/filter/merchant/pg/refund/`, {
            date: filterDate,
            transaction_id: filterData.transactionId,
            refund_amount: filterData.refundAmount,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateRefundRequests(res.data.merchant_refunds)
                setFilterError('')
                setTotalRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 3000);

            if (error.response.data.message === 'No refund requests available') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid Transaction ID') {
                setFilterError('Invalid Transaction ID')
            } else {
                setFilterError('')
            };
        })
    };


    
    //// Get filtered data from API
    const GetFilteredPaginatedData = (startDate, endDate, limit, offset)=> {
        axiosInstance.post(`/api/v6/filter/merchant/pg/refund/?limit=${limit}&offset=${offset}`, {
            date: filterDate,
            transaction_id: filterData.transactionId,
            refund_amount: filterData.refundAmount,
            status: filterStatus,
            start_date: startDate ? startDate : LgStartDateRange,
            end_date: endDate ? endDate : LgEndDateRange

        }).then((res)=> {
            // console.log(res);
            if (res.status === 200 && res.data.success === true) {
                updateRefundRequests(res.data.merchant_refunds)
                setFilterError('')
                setTotalRowCount(res.data.paginated_count)
                setFilterActive(true)
            }

        }).catch((error)=> {
            // console.log(error);
            setTimeout(() => {
                setFilterError('');
            }, 3000);

            if (error.response.data.message === 'No refund requests available') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid Transaction ID') {
                setFilterError('Invalid Transaction ID')
            } else {
                setFilterError('')
            };
        })
    };


     // Reset Filter
     const handleFilterReset = ()=> {
        setFilterDate('');
        setFilterStatus('');
        updateFilterData({
            transactionId:'',
            refundAmount: ''
        })
        setFilterActive(false);
        setLgStartDateRange('');
        setLgEndDateRange('');
        setShStartDateRange('');
        setShEndDateRange('');
    };


    //// Call default pagination after filter mode off
    useEffect(() => {
        if (!filterActive) {
            handlePaginationCount('e', 1);
        }
    }, [!filterActive]);



    return (
        <>
        <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
            <Card sx={{borderRadius:'20px'}}>
                <Grid container p={2} justifyContent="space-between" alignItems="center">

                    <Grid item xs={12} sm={4} md={3}>
                        <div className="d-flex justify-content-start">
                        <p>
                            <b><span className='fs-3'>All Refunds</span></b> <br />
                            <small>List of all your refund requests</small>
                        </p>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={8} md={9} textAlign="right">
                        <Grid container justifyContent="flex-end" spacing={1}>
                            
                            {isSmallScreen ? (
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <IconButton onClick={handleDownloadRefunds} style={{marginTop: -90 ,fontSize:'10px', color:'#0089ba' }} >
                                        <DownloadIcon />
                                    </IconButton>

                                    <IconButton onClick={()=> setShowFilters(!showFilters)} style={{ marginTop: -90, fontSize:'10px', color:'#0089ba' }} >
                                        <FilterAltIcon />
                                    </IconButton>
                                </div>
                            ) : (
                                <>
                                <Grid item>
                                    <Button onClick={handleDownloadRefunds} variant="contained" style={{ marginLeft: 10 }} startIcon={<DownloadIcon />}>
                                        Download
                                    </Button>
                                </Grid>

                                <Grid item>
                                    <Button onClick={()=> setShowFilters(!showFilters)} variant="contained" style={{ marginLeft: 10, marginTop:3}} startIcon={<FilterAltIcon />}>
                                        Filter
                                    </Button>
                                </Grid>
                                </>
                            )}
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
                                            value={filterDate}
                                            name="date"
                                            onChange={(e, newValue)=> setFilterDate(newValue)}
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
                                    {filterDate === "CustomRange" && (
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
                                        <Input 
                                            name="transactionId"
                                            value={filterData.transactionId}
                                            onChange={handleFilterFieldsChange}
                                            placeholder="Transaction ID" 
                                            />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2.5}>
                                    <FormControl fullWidth>
                                        <Input 
                                            name='refundAmount'
                                            value={filterData.refundAmount}
                                            onChange={handleFilterFieldsChange}
                                            placeholder="Refund Amount" 
                                            />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6} md={2.5}>
                                    <FormControl fullWidth>
                                        <Select
                                            placeholder='Status'
                                            id="status"
                                            value={filterStatus}
                                            name="status"
                                            onChange={(e, newValue)=> setFilterStatus(newValue)}
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
                                            <Option value="Approved">Approved</Option>
                                            <Option value="Pending">Pending</Option>
                                            <Option value="Hold">Hold</Option>
                                            <Option value="Rejected">Rejected</Option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={6} sm={6} md={1}>
                                    <FormControl fullWidth>
                                        <JoyButton onClick={handleGetFlterData}>Submit</JoyButton>
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

            {/* <Grid container p={2} justifyContent="space-between" alignItems="center">
                <Grid item xs={12} sm={4} md={3} lg={3}>
                    <div className="d-flex justify-content-start">
                    <p>
                        <b><span className='fs-3'>All Refunds</span></b> <br />
                        <small>List of all your Refunds Requests in one place</small>
                    </p>
                    </div>
                </Grid>

                <Grid item xs={12} sm={8} md={9} lg={9} textAlign="right">

                        {isSmallScreen ? (
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={7}>
                                <TextField
                                    id="standard-basic" 
                                    label="Search Transactions" 
                                    variant="standard"
                                    onChange={(e)=> handleSearchedText(e)}
                                    />
                            </Grid>

                            <Grid item xs={3}>
                                <IconButton aria-label="delete" size="large" onClick={handleSearch}>
                                    <ContentPasteSearchIcon fontSize="inherit" color='primary' />
                                </IconButton>
                            </Grid>

                            <Grid item xs={2}>
                                <IconButton style={{ marginLeft: 0 }} onClick={handleDownloadRefunds}>
                                    <DownloadIcon fontSize='small' />
                                </IconButton>
                            </Grid>

                            <Grid item xs={2}>
                                <IconButton style={{ marginLeft: 0 }}>
                                    <DownloadIcon fontSize='small' />
                                </IconButton>
                            </Grid>

                        </Grid>
                    ) : (
                        <>
                        <TextField
                            id="standard-basic" 
                            label="Search Transactions" 
                            variant="standard"
                            onChange={(e)=> handleSearchedText(e)}
                            />

                        <IconButton aria-label="delete" size="large" onClick={handleSearch}>
                            <ContentPasteSearchIcon fontSize="inherit" color='primary' />
                        </IconButton>

                        <Button onClick={handleDownloadRefunds} variant="contained" style={{ marginLeft: 10 }} startIcon={<IosShareIcon />}>
                            Download
                        </Button>
                        </>
                    )}
                </Grid> 
            </Grid> */}

                <TableContainer style={{ overflowX: 'auto', maxHeight: '55rem', overflowY: 'auto'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Sl No.</b></TableCell>
                                <TableCell><b>Date</b></TableCell>
                                <TableCell><b>Time</b></TableCell>
                                <TableCell><b>Transaction ID</b></TableCell>
                                <TableCell><b>Transaction Amount</b></TableCell>
                                <TableCell><b>Refund Amount</b></TableCell>
                                {/* <TableCell><b>Instant Refund</b></TableCell> */}
                                <TableCell><b>Status</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {refundRequests.map((refunds, index) => (
                            <TableRow key={index}>

                                {/* Serial No. Column */}
                                <TableCell>{refunds.id}</TableCell>

                                {/* Date Column */}
                                <TableCell>{refunds.createdAt.split('T')[0]}</TableCell>

                                {/* Time Column */}
                                <TableCell>
                                  {refunds.createdAt.split('T')[1]}
                                </TableCell>

                                {/* Transaction ID Column */}
                                <TableCell>{refunds.transaction_id}</TableCell>

                                {/* Refund amount Column */}
                                <TableCell>{refunds.transaction_amount} {refunds.transaction_currency}</TableCell>
                                
                                {/* Transaction Amount Column */}
                                <TableCell>{refunds.amount} {refunds.currency}</TableCell>

                                {/* Status Column */}
                                <TableCell>
                                    <Chip label={refunds.status} 
                                        color={getStatusColor(refunds.status)}
                                    />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Pagination 
                    count={countPagination} 
                    onChange={(e, value)=> {handlePaginationCount(e, value);}} 
                    color="primary" 
                    sx={{margin: 3}}
                    />

            </Card>
        </Box>

        <Footer />
        
        </>
    );
};
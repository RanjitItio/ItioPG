import React, { useState, useEffect } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery, Typography, Grid, TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Chip from '@mui/material/Chip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import WithdrawalFrom from './withdrawalForm';
import Footer from '../Footer';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import {Button as JoyButton} from '@mui/joy';
import FormControl from '@mui/material/FormControl';





// All the Merchant Withdrawal requests
export default function MerchantWithdrawalRequests() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [withdrawalRequests, updateWithdrawalRequests] = useState([]);   // All withdrawal request data
    const [exportData, updateExportData]         = useState([]); // Excel Data
    const [totalRows, updateTotalRows]           = useState(0);
    const [openWithdrawl, setOpenWithdrawal]     = useState(false); // Withdrawal form state
    const [accountBalance, updateAccountBalance] = useState([]); // Merchant Account balance state
    const [selctedCurrency, setSelectedCurrency] = useState('USD'); // Selcted Currency by the merchant
    const [showFilters, setShowFilters]          = useState(false);  // Filter fileds state
    const [filterDate, setFilterDate]            = useState('');  // Filter date state field
    const [filterError, setFilterError]          = useState('');  // Error message of filter
    const [filterData, updateFilterData]         = useState({
        bank_name: '',
        WithdrawalCurrency: '',
        withdrawalAmount: ''
    });  // Filter filed data state

    const countPagination = Math.floor(totalRows);

    // Get the selected date of filter fields
    const handleFilterDateChange = (e, newValue)=> {
        setFilterDate(newValue)
    };

    
    /// Open close Filter fields
    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    // Assign selected currency value to the state
    const handleSelctedCurrency = (event, newValue)=> {
        setSelectedCurrency(newValue)
    };

    // Filter balance according to the currency
    const filteredBalance = accountBalance.find(balance => balance.currency === selctedCurrency)
    

    // Get all the Withdrawal requests raised by merchant
    useEffect(() => {
      axiosInstance.get(`/api/v3/merchant/withdrawal/`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.success === true) {
            updateWithdrawalRequests(res.data.merchantWithdrawalRequests)
            updateTotalRows(res.data.total_row_count)
        }

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    // Fetch Account balance of the user when the page loads
   useEffect(() => {
        axiosInstance.get(`/api/v5/merchant/account/balance/`).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                updateAccountBalance(res.data.merchantAccountBalance)
             }

            }).catch((error)=> {
                console.log(error)
                
                if (error.response.data.error === 'No Merchant Balance availabel') {
                    //  MerchantAccountBalance = 0
            };
        })
    }, []);


    // Get the account balance of merchant according to the selected currency
    const handleGetMerchantAccountBalance = ()=> {
        axiosInstance.get(`/api/v5/merchant/account/balance/`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateAccountBalance(res.data.merchantAccountBalance)
             };

            }).catch((error)=> {
                console.log(error)
                
                if (error.response.data.error === 'No Merchant Balance availabel') {
                    //  MerchantAccountBalance = 0
            };

        });
    };

    // Open Withdrawal Form
    const handleClickOpenWithdrawalForm = () => {
        setOpenWithdrawal(true);
    };


    // Close Withdrawal form
    const handleCloseWithdrawalForm = () => {
        setOpenWithdrawal(false);
     };


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
            saveAs(blob, 'withdrawals.xlsx');
        } else {
            console.log('No Data available to Download')
        }

        
    };

    
    // Download all withdrawal requests
    const handleDownloadWithdrawals = ()=> {
        axiosInstance.get(`/api/v3/merchant/export/withdrawals/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.ExportmerchantWithdrawalRequests);

                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            }
    
          }).catch((error)=> {
            console.log(error)
    
          })
    };


    // Fetch paginated data
    const handlePaginationData = (e, value)=> {
            
        let limit = 10;
        let offset = (value - 1) * limit;

        axiosInstance.get(`/api/v3/merchant/withdrawal/?limit=${limit}&offset=${offset}`).then((res) => {

            if (res.status === 200 && res.data.success === true) {
                updateWithdrawalRequests(res.data.merchantWithdrawalRequests);
            }

        }).catch((error) => {
            console.log(error);

            if (error.response?.data?.message === 'No refund requests available') {
                // Handle case when no refund requests are available
            }
        })
  };


  // Get all filter field data
  const handleFilterDataChange = (e)=> {
        const {name, value} = e.target;

        updateFilterData({
            ...filterData, 
            [name]: value
        })
    };


    // Get Filtered data
    const handleGetFlterData = ()=> {
        
        axiosInstance.post(`/api/v3/filter/merchant/pg/withdrawals/`, {
            date: filterDate,
            bank_name: filterData.bank_name,
            withdrawal_currency: filterData.WithdrawalCurrency,
            withdrawal_amount: filterData.withdrawalAmount

        }).then((res)=> {
            // console.log(res)

            if (res.status === 200 && res.data.success === true) {
                updateWithdrawalRequests(res.data.merchantWithdrawalRequests)
                setFilterError('')
            }   
        }).catch((error)=> {
            // console.log(error)

            if (error.response.data.error === 'No withdrawal request found') {
                setFilterError('No data found')
            } else if (error.response.data.message === 'Invalid Bank Name') {
                setFilterError('Invalid Bank Name')
            } else if (error.response.data.message === 'Invalid Currency') {
                setFilterError('Invalid Currency')
            } else {
                setFilterError('')
            };
        })
    };



    return (
        <>
        <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
            <Card sx={{borderRadius:'20px'}}>
            <Grid container p={2} justifyContent="space-between" alignItems="center">

                <Grid item xs={12} sm={4} md={3}>
                    <div className="d-flex justify-content-start">
                    <p>
                        <b><span className='fs-3'>All Withdrawals</span></b> <br />
                        <small>List of all your withdrawal requests</small>
                    </p>
                    </div>
                </Grid>

                <Grid item xs={12} sm={8} md={9} textAlign="right">
                    <Grid container justifyContent="flex-end" spacing={1}>
                     
                        {isSmallScreen ? (
                                <>
                                </>
                        ) : (
                            <>
                            <Grid item>
                                <Button onClick={handleDownloadWithdrawals} variant="contained" style={{ marginLeft: 10 }} startIcon={<FileDownloadIcon />}>
                                    Download
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button onClick={handleClickOpenWithdrawalForm} variant="contained" style={{ marginLeft: 10, marginTop:3}} startIcon={<IosShareIcon />}>
                                    Withdrawal
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button onClick={handleToggleFilters} variant="contained" style={{ marginLeft: 10, marginTop:3}} startIcon={<FilterAltIcon />}>
                                    Filter
                                </Button>
                            </Grid>
                            </>
                        )}
                    </Grid> 
                </Grid>

                {isSmallScreen && (
                    <Grid item xs={12} style={{ textAlign: 'left', marginTop: '0px' }}>
                    
                        <IconButton onClick={handleDownloadWithdrawals} style={{color:'#0089ba' }} >
                            <FileDownloadIcon fontSize='medium' />
                        </IconButton>
                 
                        <IconButton onClick={handleClickOpenWithdrawalForm} style={{ color:'#0089ba' }} >
                            <IosShareIcon fontSize='medium' />
                        </IconButton>

                        <IconButton onClick={handleToggleFilters} style={{ color:'#0089ba' }} >
                            <FilterAltIcon fontSize='medium'/>
                        </IconButton>
                    </Grid>
                )}
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
                                    name="date"
                                    value={filterDate}
                                    onChange={(e, newValue) => handleFilterDateChange(e, newValue)}
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
                                    <Input 
                                    placeholder="Bank Name" 
                                    name='bank_name'
                                    value={filterData.bank_name}
                                    onChange={handleFilterDataChange}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <Input 
                                        name='WithdrawalCurrency'
                                        value={filterData.WithdrawalCurrency}
                                        onChange={handleFilterDataChange}
                                        placeholder="Withdrawal Currency" 
                                        />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <FormControl fullWidth>
                                    <Input 
                                        placeholder="Withdrawal Amount"
                                        name='withdrawalAmount'
                                        value={filterData.withdrawalAmount} 
                                        onChange={handleFilterDataChange}
                                        />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={1}>
                                <FormControl fullWidth>
                                    <JoyButton onClick={handleGetFlterData}>Submit</JoyButton>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <small style={{color:'red'}}>{filterError && filterError}</small>
                    </>
                    )}
            </Grid>
            
                <TableContainer style={{ overflowX: 'auto', maxHeight: '85rem', overflowY: 'auto'}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Sl No.</b></TableCell>
                                <TableCell><b>Bank</b></TableCell>
                                <TableCell><b>Bank Currency</b></TableCell>
                                <TableCell><b>Withdrawal Amount</b></TableCell>
                                <TableCell><b>Withdrawal Currency</b></TableCell>
                                <TableCell><b>Created Date</b></TableCell>
                                <TableCell><b>Created Time</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {withdrawalRequests.map((withdrawal, index) => (
                            <TableRow key={index}>

                            {/* Serial No. Column */}
                                <TableCell>{withdrawal.id}</TableCell>

                                {/* Bank Name */}
                                <TableCell>{withdrawal.bank_account}</TableCell>

                                {/* Bank Currency Column */}
                                <TableCell>
                                  {withdrawal.bankCurrency}
                                </TableCell>

                                {/* Withdrawal Column */}
                                <TableCell>{withdrawal.withdrawalAmount}</TableCell>

                                {/* Withdrawal Currency Column */}
                                <TableCell>{withdrawal.withdrawalCurrency}</TableCell>

                                {/* Date Column */}
                                <TableCell>{withdrawal.createdAt.split('T')[0]}</TableCell>

                                {/* Time Column */}
                                <TableCell>
                                    {withdrawal.createdAt.split('T')[1]}
                                </TableCell>

                                {/* Status Column */}
                                <TableCell>
                                    <Chip label={withdrawal.status} color={getStatusColor(withdrawal.status)} />
                                </TableCell>

                            </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <Pagination 
                    count={countPagination} 
                    onChange={(e, value)=> {handlePaginationData(e, value);}} 
                    color="primary" 
                    sx={{margin: 3}}
                    />
            </Card>
        </Box>

        {/* // Withdrawal Form */}
            <WithdrawalFrom 
                open={openWithdrawl} 
                handleClickOpen={handleClickOpenWithdrawalForm} 
                handleClose={handleCloseWithdrawalForm}
                accountBalance={accountBalance}
                setOpen={setOpenWithdrawal}
            />

        <Footer />
    </>
    );
};
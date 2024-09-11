import React, { useState, useEffect } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery, Typography
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
import {Select as JoySelect, Option as JoyOption} from '@mui/joy';





// All the Merchant Withdrawal requests
export default function MerchantWithdrawalRequests() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [withdrawalRequests, updateWithdrawalRequests] = useState([]);   // All withdrawal request data
    const [exportData, updateExportData] = useState([]); // Excel Data
    const [totalRows, updateTotalRows]   = useState(0);
    const [openWithdrawl, setOpenWithdrawal]     = useState(false); // Withdrawal form state
    const [accountBalance, updateAccountBalance] = useState([]); // Merchant Account balance state
    const [selctedCurrency, setSelectedCurrency] = useState('USD'); // Selcted Currency by the merchant

    const countPagination = Math.ceil(totalRows);
    

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


    
    return (
        <>
        <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
            <Card sx={{borderRadius:'20px', boxShadow:'-28px -8px 9px 0px rgba(0,0,0,0.25)'}}>
            <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
                <div className="d-flex justify-content-start">
                    <div>
                        <b><span className='fs-3'>All Withdrawals</span></b> <br />
                        <p>List of all your withdrawal requests</p>
                    </div>
                </div>

                <Typography variant='p' sx={{ ml: 2, display: {xs:'none', sm:'none', md:'flex'} }}>
                    <b>Total Balance: {filteredBalance ? (filteredBalance.amount ? parseFloat(filteredBalance.amount).toFixed(3) : 0.00) : 0.00}</b>
                    <JoySelect defaultValue="USD" variant='plain' sx={{mt:-1}} onChange={(event, newValue)=> {handleSelctedCurrency(event, newValue); handleGetMerchantAccountBalance(); }}>
                        <JoyOption value="USD">USD</JoyOption>
                        <JoyOption value="EUR">EUR</JoyOption>
                        <JoyOption value="INR">INR</JoyOption>
                        <JoyOption value="GBP">GBP</JoyOption>
                    </JoySelect>
                </Typography>   


                <Box>
                    {/* If Small screen */}
                    {isSmallScreen ? (
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <IconButton style={{marginTop: -30 ,fontSize:'10px', color:'#0089ba' }} >
                                <FileDownloadIcon />
                            </IconButton>

                            <IconButton style={{ marginTop: -30, fontSize:'10px', color:'#0089ba' }} >
                                <IosShareIcon />
                            </IconButton>
                        </div>
                    ) : (
                        <>
                        {/* Large Screen */}
                        <Button onClick={handleDownloadWithdrawals} variant="contained" style={{ marginLeft: 10 }} startIcon={<FileDownloadIcon />}>
                            Download
                        </Button>

                        <Button onClick={handleClickOpenWithdrawalForm} variant="contained" style={{ marginLeft: 10, marginTop:3}} startIcon={<IosShareIcon />}>
                            Withdrawal
                        </Button>
                        </>
                    )}
                </Box>
            </Box>

                <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
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
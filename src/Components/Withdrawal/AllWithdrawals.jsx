import React, { useState, useEffect } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';






// All the Merchant Withdrawal requests
export default function MerchantWithdrawalRequests() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [withdrawalRequests, updateWithdrawalRequests] = useState([]);   // All withdrawal request data
    const [exportData, updateExportData] = useState([]); // Excel Data

    
    // Get all the Withdrawal requests raised by merchant
    useEffect(() => {
      axiosInstance.get(`/api/v3/merchant/withdrawal/`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.success === true) {
            updateWithdrawalRequests(res.data.merchantWithdrawalRequests)
        }

      }).catch((error)=> {
        console.log(error)

      })
    }, []);


    //  Status color according to the input
    const getStatusColor = (status) => {
        switch(status){
            case 'Approved':
                return 'success'
            case 'Rejected':
                return 'danger'
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
        axiosInstance.get(`/api/v3/merchant/withdrawal/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                updateExportData(res.data.merchantWithdrawalRequests);

                setTimeout(() => {
                    exportToExcel();
                }, 1000);
            }
    
          }).catch((error)=> {
            console.log(error)
    
          })
    };

    
    return (
        <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
            <Card sx={{borderRadius:'20px', boxShadow:'-28px -8px 9px 0px rgba(0,0,0,0.75)'}}>
            <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                {/* <TextField placeholder="Search for transaction here" variant="outlined" size="small" /> */}
                <div className="d-flex justify-content-start">
                    <p>
                        <b><span className='fs-3'>All Withdrawals</span></b> <br />
                        <small>List of all your Withdrawal Requests in one place</small>
                    </p>
                </div>

                <Box>
                {isSmallScreen ? (
                    <>

                    <IconButton style={{ marginLeft: 0 }}>
                        <FileUploadOutlinedIcon />
                    </IconButton>
                    </>
                ) : (
                    <>

                    <Button onClick={handleDownloadWithdrawals} variant="contained" style={{ marginLeft: 10 }} startIcon={<IosShareIcon />}>
                        Download
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
                                    <p className={`text-${getStatusColor(withdrawal.status)}`}>{withdrawal.status}</p>
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
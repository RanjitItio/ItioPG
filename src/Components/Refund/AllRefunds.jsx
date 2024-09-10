import React, { useState, useEffect } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Box, useMediaQuery, TextField, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '../Authentication/axios';
import Pagination from '@mui/material/Pagination';
import IosShareIcon from '@mui/icons-material/IosShare';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Chip from '@mui/material/Chip';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DownloadIcon from '@mui/icons-material/Download';
import Footer from '../Footer';





// Get all the Merchant requested refunds
export default function AllMerchantRefundRequests() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [refundRequests, updateRefundRequests] = useState([]);   // All withdrawal request data
    const [exportData, updateExportData] = useState([]); // Excel Data
    const [totalRowCount, setTotalRowCount] = useState(0);
    const [searchQuery, updateSearchQuery] = useState('');  // Search Query state
    
    let countPagination = Math.ceil(totalRowCount)
   

    // Get all the Refund requests raised by merchant
    useEffect(() => {
        axiosInstance.get(`api/v6/merchant/refund/`).then((res)=> {
          // console.log(res)
  
          if (res.status === 200 && res.data.success === true) {
            updateRefundRequests(res.data.merchant_refunds)
            setTotalRowCount(res.data.total_count)
          }
  
        }).catch((error)=> {
          console.log(error)

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

            axiosInstance.get(`api/v6/merchant/refund/?limit=${limit}&offset=${offset}`).then((res) => {
                if (res.status === 200 && res.data.success === true) {
                    updateRefundRequests(res.data.merchant_refunds);
                }
            }).catch((error) => {
                console.log(error);

                if (error.response?.data?.message === 'No refund requests available') {
                    // Handle case when no refund requests are available
                }
            })
      };

      // Get merchant input search text
      const handleSearchedText = (e)=> {
        updateSearchQuery(e.target.value);
      };

      // Search Withdrawal Transactions
    const handleSearch = ()=> {
        axiosInstance.get(`api/v6/merchant/search/refunds/?query=${searchQuery}`).then((res)=> {
            // console.log(res)
            if (res.status === 200 && res.data.success === true) {
                updateRefundRequests(res.data.searched_merchant_refunds)
            };

        }).catch((error)=> {
            console.log(error)

        })
    };



    return (
        <>
        <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
            <Card sx={{borderRadius:'20px', boxShadow:'-28px -8px 9px 0px rgba(0,0,0,0.25)'}}>
            <Grid container p={2} justifyContent="space-between" alignItems="center">
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
            </Grid>

                <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
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
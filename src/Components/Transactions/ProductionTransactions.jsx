import { Suspense, useState, lazy } from 'react';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/joy/CircularProgress';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const RefundFrom = lazy(()=> import('../Refund/RefundForm'));



// Production Transaction Table
export default function ProductionTransactionTable({businessTransactionData}) {
    const [openRefund, setOpenRefund] = useState(false);  // Refund form state
    const [refundTransactionData, updateRefundTransactionData] = useState([]);


    // Open Refund Form
   const handleClickOpenRefundForm = () => {
        setOpenRefund(true);
    };


    // Close Refund form
   const handleCloseRefundForm = () => {
        setOpenRefund(false);
    };

    const handleRefundTransactionData = (transaction)=> {
        updateRefundTransactionData(transaction)
    };


    const statusMap = {
        PAYMENT_INITIATED: 'PAYMENT INITIATED',
        PAYMENT_FAILED: 'PAYMENT FAILED',
        PAYMENT_SUCCESS: 'PAYMENT SUCCESS',
        PAYMENT_PENDING: 'PAYMENT PENDING'
      };

    // Status Colur according to the status type
    const getStatusColor = (status)=> {
        switch (status) {
            case 'PAYMENT_INITIATED':
                return 'warning'
            case 'PAYMENT_FAILED':
                return 'danger' 
            case 'PAYMENT_SUCCESS':
                return 'success' 
            case 'PAYMENT_PENDING':
                return 'warning' 
            default:
                return 'defaultColor';
        }
    };


    const formatDate = (dateString)=> {
        let date = new Date(dateString)

        const formatter = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        return formatter.format(date);
    };


    return (
        <>
        <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Sl No.</b></TableCell>
                        <TableCell><b>Created At</b></TableCell>
                        <TableCell><b>Order ID</b></TableCell>
                        <TableCell><b>Itio Transaction ID</b></TableCell>
                        <TableCell><b>MOP</b></TableCell>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Fee</b></TableCell>
                        <TableCell><b>Payout Balance</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell><b>Initiate Refund</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {businessTransactionData.map((transaction, index) => (
                    <TableRow key={index}>

                        {/* Sl No. Column */}
                        <TableCell>{transaction.id}</TableCell>
                        {/* <TableCell>{transaction.id ? transaction.id : '-'}</TableCell> */}

                        {/* Date Column */}
                        <TableCell>
                            <small>{formatDate(transaction.createdAt ? transaction.createdAt.split('T')[0] : '')} &ensp; {transaction.createdAt ? transaction.createdAt.split('T')[1] : ''}</small>
                        </TableCell>

                        {/* Merchant Order ID */}
                        <TableCell>
                            <Box display="flex" alignItems="center">
                                <Box>
                                    <div><small>{transaction?.merchantOrderId || ''}</small></div>
                                </Box>
                            </Box>
                        </TableCell>

                        {/* Transaction ID Column */}
                        <TableCell>
                            <small>{transaction?.transaction_id || ''}</small>
                        </TableCell>

                        {/* Payment Mode Column */}
                        <TableCell>
                            <small>{transaction?.payment_mode || ''}</small>
                        </TableCell>

                        {/* Amount Column */}
                        <TableCell>
                            <small>{transaction?.amount || ''} {transaction?.currency || ''}</small>
                        </TableCell>

                        {/* Fee Column */}
                        <TableCell>
                            <small>{transaction?.amount || ''} {transaction?.currency || ''}</small>
                        </TableCell>

                        {/* Payout Balance */}
                        <TableCell>
                            <small>{transaction?.amount || ''} {transaction?.currency || ''}</small>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                            <span className={`text-${getStatusColor(transaction.status)}` }>
                                <small>{statusMap[transaction.status] || 'UNKNOWN STATUS'}</small>
                            </span>
                        </TableCell>

                        <TableCell>
                            {transaction.status === 'PAYMENT_SUCCESS' ?
                            <Tooltip title="Initiate Refund" arrow>
                                <IconButton onClick={()=> {handleClickOpenRefundForm(); handleRefundTransactionData(transaction);}}>
                                    <ReplayIcon color='primary' />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title={transaction.status} arrow>
                                <CheckBoxOutlineBlankIcon color='disabled' />
                            </Tooltip>
                            }
                            
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Suspense fallback={<CircularProgress sx={{display:'flex', justifyContent:'center', alignItems:'center'}}/>}>
            <RefundFrom 
                open={openRefund} 
                handleClickOpen={handleClickOpenRefundForm} 
                handleClose={handleCloseRefundForm}
                refundTransactionData={refundTransactionData}
            />
        </Suspense>

        </>
        
    );
};
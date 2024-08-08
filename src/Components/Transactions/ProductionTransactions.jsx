import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box} from '@mui/material';






export default function ProductionTransactionTable({businessTransactionData}) {
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
                        <TableCell><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {businessTransactionData.map((transaction, index) => (
                    <TableRow key={index}>

                        {/* Sl No. Column */}
                        <TableCell>{index + 1}</TableCell>
                        {/* <TableCell>{transaction.id ? transaction.id : '-'}</TableCell> */}

                        {/* Date Column */}
                        <TableCell>
                            {formatDate(transaction.createdAt.split('T')[0])} &ensp; {transaction.createdAt.split('T')[1]}
                        </TableCell>

                        {/* Merchant Order ID */}
                        <TableCell>
                            <Box display="flex" alignItems="center">
                                <Box>
                                    <div>{transaction.merchantOrderId}</div>
                                </Box>
                            </Box>
                        </TableCell>

                        {/* Transaction ID Column */}
                        <TableCell>{transaction.transaction_id}</TableCell>

                        {/* Payment Mode Column */}
                        <TableCell>{transaction.payment_mode}</TableCell>

                        {/* Amount Column */}
                        <TableCell>{transaction.amount} {transaction.currency}</TableCell>

                        {/* Status */}
                        <TableCell>
                            <span className={`text-${getStatusColor(transaction.status)}` }>
                                {statusMap[transaction.status] || 'UNKNOWN STATUS'}
                            </span>
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        </>
        
    );
};
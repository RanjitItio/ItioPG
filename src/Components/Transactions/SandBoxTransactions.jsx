import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box} from '@mui/material';
import Chip from '@mui/material/Chip';


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
            return 'primary'
        case 'PAYMENT_FAILED':
            return 'error' 
        case 'PAYMENT_SUCCESS':
            return 'success' 
        case 'PAYMENT_PENDING':
            return 'warning' 
        case 'PAYMENT_HOLD':
            return 'primary' 
        default:
            return 'primary';
    };
};


// Sandbox Transactions
export default function SandBoxTransactionTable({businessSandboxTransactionData}) {

    // Format Date type
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
        <TableContainer style={{ overflowX: 'auto',  height: '51rem', overflowY: 'auto'}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Sl No.</b></TableCell>
                        <TableCell><b>Created At</b></TableCell>
                        <TableCell><b>Order ID</b></TableCell>
                        <TableCell><b>Itio Transaction ID</b></TableCell>
                        <TableCell><b>Business</b></TableCell>
                        <TableCell><b>MOP</b></TableCell>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {businessSandboxTransactionData.map((transaction, index) => (
                    <TableRow key={index}>

                        {/* Sl No. Column */}
                        <TableCell>{transaction.id ? transaction.id : '-'}</TableCell>

                        {/* Date Column */}
                        <TableCell>
                            <small>{transaction.createdAt ? formatDate(transaction.createdAt.split('T')[0]) : ''} &ensp; {transaction.createdAt ? transaction.createdAt.split('T')[1] : ''}</small>
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
                            <small>{transaction?.business_name || ''}</small>
                        </TableCell>

                        <TableCell>
                            <small>{transaction?.payment_mode || ''}</small>
                        </TableCell>

                        {/* Amount Column */}
                        <TableCell>
                            <small>{transaction?.currency || ''} {transaction?.amount || ''}</small>
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                            <Chip label={statusMap[transaction.status] || 'UNKNOWN STATUS'} color={getStatusColor(transaction.status)} />
                        </TableCell>

                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

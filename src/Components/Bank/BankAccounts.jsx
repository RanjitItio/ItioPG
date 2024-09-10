import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography, IconButton, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import axiosInstance from "../Authentication/axios";
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import BankAccountDelete from "./BankDelete";
import Footer from "../Footer";




// All available Merchant bank accounts
export default function MerchantBankAccounts() {
    const navigate = useNavigate();

    const [bankAccount, updateBankAccounts] = useState([]);      // State to update all banks after API call
    const [deleteOpen, setDeleteOpen]       = useState(false);  //State to open Popup for Delete bank account
    const [bankAccountId, setBankAccountId] = useState(0);

    //Navigate to Add bank account page
    const handelAddBankAccountClicked = ()=> {
        navigate('/add/merchant/bank/account/')
    };

    //Navigate to Account update Page
    const handelUpdateBankAccountClicked = (accountID)=> {
        const Account = bankAccount.find(Account => Account.id == accountID)

        navigate('/update/merchant/bank/accounts/', {state: {accountDetails: Account}})
    };

    // Fetch all created bank accounts of user
    useEffect(() => {
        axiosInstance.get(`api/v4/merchant/bank/`).then((res)=> {
            // console.log(res.data.data)

            if (res.status === 200 && res.data.data) {
                const sortedData = res.data.data.sort((a,b) => b.id - a.id)
                updateBankAccounts(sortedData)
            }

        }).catch((error)=> {
            console.log(error)

        })
    }, []);

    // Show only two number from first and two number from last of Account number
    const formatAccountNumber = (acc_no) => {
        if (acc_no.length < 4) {
            return acc_no; 
          }
        
          const firstTwo = acc_no.slice(0, 2);
          const lastTwo   = acc_no.slice(-2);

          return `${firstTwo}****${lastTwo}`
    };

    const handleBankAccountDelete = (accountID)=> {
        setDeleteOpen(true);
        setBankAccountId(accountID)
    };

    return (
        <>
        <Card>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceIcon fontSize="large" />
                    <Typography variant="h5" style={{ marginLeft: '8px' }}>
                    My Bank Accounts
                    </Typography>
                </div>
                <Tooltip title="Add New Bank Account" placement="top">
                    <IconButton color="primary" style={{ cursor: 'pointer' }} onClick={handelAddBankAccountClicked}>
                    <AddToDriveIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                </div>
                <Box sx={{ overflowX: 'scroll', marginTop: 2 }}>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Sl No</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Account Holder Name</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Account Number</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Bank Name</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Currency</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Document</TableCell>
                        <TableCell style={{ backgroundColor: '#0089BA', color: 'white' }}>Action</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                    {bankAccount.map((row, index) => (
                        <TableRow key={index}>

                            {/* Sl No. Cell */}
                            <TableCell>{row.id}</TableCell>

                            {/* Account Holder Name Column */}
                            <TableCell>{row.acc_hold_name}</TableCell>

                            {/* Account Number Column */}
                            <TableCell>{formatAccountNumber(row.acc_no)}</TableCell>

                            {/* Bank Name Column */}
                            <TableCell>{row.bank_name}</TableCell>

                            {/* Currency Column */}
                            <TableCell>{row.currency.name}</TableCell>

                            {/* Document Column */}
                            <TableCell>
                                <a href={row.doc? row.doc : 'NA'}>DOC</a>
                            </TableCell>

                            {/* Action Cell */}
                            <TableCell>
                                {row.is_active ? 
                                    <Tooltip title="Verified">
                                        <DoneAllIcon style={{ color: 'green', cursor: 'pointer', marginRight: '8px' }} />
                                    </Tooltip>
                                    : 
                                    <Tooltip title="Not Verified">
                                        <CancelIcon style={{ color: 'red', cursor: 'pointer', marginRight: '8px' }} />
                                    </Tooltip>
                                }

                                <Tooltip title="Edit">
                                    <BorderColorIcon 
                                            color="primary" 
                                            style={{ cursor: 'pointer', marginRight: '8px' }} 
                                            onClick={()=> {handelUpdateBankAccountClicked(row.id)}} 
                                            /> 
                                </Tooltip>
                                    
                                <Tooltip title="Delete">
                                    <DeleteForeverIcon 
                                            color="error" 
                                            style={{ cursor: 'pointer' }} 
                                            onClick={()=> {handleBankAccountDelete(row.id)}}
                                            />
                                </Tooltip>

                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Box>
            </CardContent>
        </Card>

        {/*  Delete Bank Account Component */}
        <BankAccountDelete open={deleteOpen} setOpen={setDeleteOpen} accountID={bankAccountId} />

        <Footer />
        </>
    );
};
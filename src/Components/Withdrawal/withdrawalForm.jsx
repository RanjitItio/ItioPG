import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, Fragment } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Slider, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import axiosInstance from '../Authentication/axios';
import { Link } from 'react-router-dom';
import {Input as JoyInput} from '@mui/joy';
import { AccountBalanceWallet } from '@mui/icons-material';
import PaymentsIcon from '@mui/icons-material/Payments';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';




const WithdrawButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(to right, #373b44, #4286f4);',
    borderRadius: '30px',
    padding: theme.spacing(1.5),
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'none',
    marginTop: theme.spacing(2),
    '&:hover': {
      background: 'linear-gradient(to right, #373b44, #4286f4);',
    },
  }));
  
  const AmountButton = styled(Button)(({ theme, selected }) => ({
    backgroundColor: selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    color: selected ? '#FF5F6D' : '#FFFFFF',
    borderRadius: '15px',
    fontWeight: 'bold',
    textTransform: 'none',
    minWidth: '64px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }));


const getCurrencyIcon = (currency) => {
    switch (currency) {
       case 'USD':
          return '$'
       case 'INR':
          return '₹'
       case 'EUR':
          return '€'
       case 'GBP':
          return '£'
       default:
          break;
    }
 };



// Merchant Withdrawal Form
export default function WithdrawalFrom({open, handleClose, accountBalance, setOpen}) {
    const theme      = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const isSmallScreen                           = useMediaQuery('(max-width:600px)');
    const [balanceCurrency, setBalanceCurrency]   = useState('USD');  // Account Balance Currency
    const [merchantAccounts, setMerchantAccounts] = useState([]);     // Merchant Bank Accounts
    const [currencies, SetCurrencies]             = useState([]);     // Currncies
    const [error, setError]                       = useState('');     // Error Message
    const [successMessage, setSuccessMessage]     = useState('');     // Success Message
    const [InputAmount, setInputAmount]           = useState(0.00);      // Input Amount
    const [formData, updateFormData]              = useState({       // Form Values to send in API
        bankAccount: '', bankCurrency: ''
    });
    const [merchantBalance, setMerchantBalance]   = useState([]);

   
    // Get the account balance of the merchant according to the selected currency
    const Balance = accountBalance.find(balance => balance.currency === balanceCurrency)

    // Input amount value
    const handleInputAmountChange = (event) => {
        const value = event.target.value;

        if (parseInt(event.target.value) > Balance?.mature_balance || 0) {
            setError('Amount is greater than Mature Balance')
        } else if (parseInt(event.target.value) === 0) {
            setError('Amount must be greater than 0')
        } else if (isNaN(Number(value))) {
            setError('Please type valid number')
        } else {
            setError('')
            setInputAmount(event.target.value);
        }
    };


    // Capture the Account balance currency Value
    const handleAccountBalanceCurrencyChange = (e)=> {
        setBalanceCurrency(e.target.value);
    };
    

    // User selcted Bank and Currency value
    const handleFormDataChange = (e)=> {
        const {name, value} = e.target
        if (name === 'bankAccount') {
            const MerchantSelectedBank = value;
            const bankAccount = merchantAccounts.find(bankAccount => bankAccount.bank_name === MerchantSelectedBank)
            
            if (bankAccount.is_active === false) {
                setError('Bank Account not active, Please contact administrator.')
            } else {
                setError('')
                updateFormData({...formData,
                    [e.target.name]: e.target.value
                })
            }
        };

        updateFormData({...formData,
            [e.target.name]: e.target.value
        })
    };

    // Fetch all created bank accounts of user
    useEffect(() => {
        axiosInstance.get(`api/v4/merchant/bank/`).then((res)=> {
            // console.log(res.data.data)

            if (res.status === 200 && res.data.data) {
                setMerchantAccounts(res.data.data)
            };

        }).catch((error)=> {
            console.log(error)

        })

        // Fetch all the available currencies
        axiosInstance.get(`/api/v2/currency`).then((res)=> {
            // console.log(res)
            
            if (res.status === 200) {
                SetCurrencies(res.data.currencies)
            };

        }).catch((error)=> {
            console.log(error)

        })
    }, []);




   // Method to raise an withdrawal request for merchant
    const handleRaiseWithDrawalRequest = ()=> {
        if (formData.bankAccount === '') {
            setError('Please select bank Account')
        } else if (formData.bankCurrency === '') {
            setError('Please select Bank Accepted Currency')
        } else if (InputAmount === 0 || InputAmount == '') {
            setError('Amount should be Greater than 1')
        } else {
            setError('')
            // Call API
            const merchantBank   = merchantAccounts.find(account => account.bank_name === formData.bankAccount)
            const merchantBankID = merchantBank.id

            const BankCurrency         = formData.bankCurrency
            const merchantBankCurrency = currencies.find(currency => currency.name === BankCurrency)
            const BankcurrencyID       = merchantBankCurrency.id

            axiosInstance.post(`/api/v3/merchant/withdrawal/`, {
                bank_id:          merchantBankID,
                bank_currency_id: BankcurrencyID,
                account_currency: balanceCurrency,
                withdrawal_amount: parseFloat(InputAmount)

            }).then((res)=> {
                // console.log(res)

                if (res.status === 200 && res.data.success === true){ 
                    setSuccessMessage('Withdrawal Request has been raised Successfully, Please wait for Admin Approval')

                    setTimeout(() => {
                        setOpen(false);
                        setSuccessMessage('')
                    }, 2000)
                };

            }).catch((error)=> {
                console.log(error)

                if (error.response.data.error === 'Bank account not active') {
                    setError('Selected Bank account is not active yet')
                } else if (error.response.data.error === 'Do not have any active account in the currency'){
                    setError('Do not have any active bank account')
                } else if(error.response.data.error === 'Donot have sufficient balance in Account') {
                    setError('Do not have suffiecient balance to make the transaction')
                } else if (error.response.data.message === 'Withdrawal amount must be greater than minimum withdrawal amount') {
                    setError('Withdrawal amount must be greater than minimum withdrawal amount')
                } else {
                    setError('')
                };
            });
        }
    };


    // Fetch all the account balance
    useEffect(() => {
        if (balanceCurrency) {
        axiosInstance.get(`api/v6/merchant/dash/stats/${balanceCurrency}/`).then((res) => {
            // console.log(res.data.stats_data)
            if (res.status === 200 && res.data.success) {
                setMerchantBalance(res.data.stats_data);
            }

            }).catch((error) => {
                console.log(error);
            });
        }
    }, [balanceCurrency]);



    return (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          
        >
          <DialogContent sx={{scrollbarWidth:'none',  '&::-webkit-scrollbar': {display:'none'}, overflow:'auto'}}>
            <Box
                sx={{
                width: isSmallScreen ? '100%' : '400px',
                backgroundColor: '#eae6e8',
                borderRadius: '25px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'auto',
                padding:3
                }}
            >
                <Box sx={{ padding: 1}}>

                    {/* Bank Account Dropdown */}
                    <FormControl sx={{ m: 1}} fullWidth size="small">
                        <InputLabel id="demo-select-small-label">Select Bank Account</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name='bankAccount'
                            value={formData.bankAccount}
                            label="Select Bank Account"
                            onChange={handleFormDataChange}
                        >
                        {merchantAccounts.map((bank, index)=> (
                                <MenuItem key={index} value={bank.bank_name}>{bank.bank_name}</MenuItem>
                            ))}
                            <MenuItem>
                                <Link to={'/add/merchant/bank/account/'}>Create Bank Account</Link>
                            </MenuItem>
                           
                        </Select>
                    </FormControl>

                    {/* Currency Dropdown */}
                    <FormControl sx={{ m: 1}} fullWidth size="small">
                        
                        <InputLabel id="demo-select-small-label">Select Bank Currency</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name='bankCurrency'
                            value={formData.bankCurrency}
                            label="Select Bank Currency"
                            onChange={handleFormDataChange}
                        >
                            {currencies.map((currency, index)=> (
                                <MenuItem key={index} value={currency.name}>{currency.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Total Amount Section */}
                    <Paper
                        elevation={3}
                        sx={{
                        padding: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        mt:1
                        }}
                    >
                        <Box
                        sx={{
                            backgroundColor: 'green',
                            borderRadius: '50%',
                            padding: '8px',
                            color: 'white',
                            marginRight: '16px',
                            fontSize: '1.5rem',
                        }}
                        >
                        <PaymentsIcon />
                        </Box>

                        <Box sx={{flexGrow:1, minWidth:0}}>
                            <Typography 
                                variant="h6" 
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis', 
                                }}>
                              
                              {getCurrencyIcon(balanceCurrency)} {(merchantBalance[0]?.merchant_account_balance[0]?.amount || 0).toFixed(3) ?? 0}
                            </Typography>

                            <Typography 
                                variant="subtitle2" 
                                color="textSecondary"
                                sx={{
                                    whiteSpace:'nowrap',
                                    overflow:'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                >
                                Total Amount
                            </Typography>
                        </Box>
                    </Paper>

                    {/* Withdrawal Amount Section */}
                    <Paper
                        elevation={3}
                        sx={{
                        padding: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        mt:1,
                        width:'100%'
                        }}
                    >
                        <Box
                        sx={{
                            backgroundColor: 'orange',
                            borderRadius: '50%',
                            padding: '10px',
                            color: 'white',
                            marginRight: '16px',
                            fontSize: '1.5rem',
                        }}
                        >
                            <PointOfSaleIcon />
                        </Box>

                        <Box sx={{flexGrow:1, minWidth:0}}>
                            <Typography 
                                variant="h6" 
                                fontWeight="bold"
                                sx={{
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis', 
                                }}>
                              
                              {getCurrencyIcon(balanceCurrency)} {(merchantBalance[0]?.merchant_mature_balance[0]?.amount || 0).toFixed(3) ?? 0}
                            </Typography>

                            <Typography 
                                variant="subtitle2" 
                                color="textSecondary"
                                sx={{
                                    whiteSpace:'nowrap',
                                    overflow:'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                                >
                                Withdrawable Amount
                            </Typography>
                        </Box>
                    </Paper>
                    {/* Ends */}


                    {/* Amount Display */}
                    <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Amount
                        </Typography>

                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Typography variant="h4" color="textPrimary">
                               {getCurrencyIcon(balanceCurrency)}{Balance ? (Balance.mature_balance ? Balance.mature_balance.toFixed(3) : 0.00) : 0.00}
                            </Typography>

                            <FormControl>
                                <NativeSelect
                                    onChange={(e)=> {handleAccountBalanceCurrencyChange(e);}}
                                    defaultValue={balanceCurrency}
                                    size='small'
                                    inputProps={{
                                        name: 'Currency',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                <option value='USD'>USD</option>
                                <option value='INR'>INR</option>
                                <option value='EUR'>EUR</option>
                                <option value='GBP'>GBP</option>
                                </NativeSelect>
                            </FormControl>
                        </div>
                    </Box>

                    <JoyInput 
                        placeholder="Type withdrawal amount"
                        type='number'
                        value={InputAmount}
                        onChange={handleInputAmountChange}
                        />

                <p style={{color:'red'}}>{error && error}</p>
                <p style={{color:'green'}}>{successMessage && successMessage}</p>
                <WithdrawButton fullWidth onClick={handleRaiseWithDrawalRequest}>Withdraw</WithdrawButton>
                </Box>
            </Box>
          </DialogContent>
        </Dialog>
    
    );
  }
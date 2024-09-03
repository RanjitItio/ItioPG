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
    const [currencies, SetCurrencies]             = useState([]);
    const [sliderAmount, setSliderAmount]         = useState(10);     // Slider Amount
    const [error, setError]                       = useState('');     // Error Message
    const [filteredBalance, setFilteredBalance]   = useState(0.00);   // Account balance of Merchant According to currency
    const [successMessage, setSuccessMessage]     = useState('');
    const [formData, updateFormData]              = useState({       // Form Values to send in API
        bankAccount: '', bankCurrency: ''
    });


   
    // Get the account balance of the merchant according to the selected currency
    useEffect(() => {
        const Balance = accountBalance.find(balance => balance.currency === balanceCurrency)
        if (Balance){ 
            setFilteredBalance(Balance.amount)
            setSliderAmount(Balance.amount)
        } else {
            setFilteredBalance(0.00)
            setSliderAmount(0.00)
        };
        
    }, [balanceCurrency]);
    
    // Assign slider value
    const handleSliderChange = (newValue) => {
        if (typeof newValue === 'number') {
            setSliderAmount(newValue);
        } else {
            setSliderAmount(parseInt(newValue));
        }
        
    };

    // Capture the Account balance currency Value
    const handleAccountBalanceCurrencyChange = (e)=> {
        setBalanceCurrency(e.target.value);
        console.log(e.target.value)
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
        } else if (sliderAmount === 0 || sliderAmount < 10) {
            setError('Amount should be Greater than 10')
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
                withdrawal_amount: sliderAmount

            }).then((res)=> {
                console.log(res)

                if (res.status === 200 && res.data.success === true){ 
                    setSuccessMessage('Withdrawal Request has been raised Successfully, Please wait for Admin Approval')

                    setTimeout(() => {
                        setOpen(false);
                        setSuccessMessage('')
                    }, 2000);
                };

            }).catch((error)=> {
                console.log(error)

                if (error.response.data.error === 'Bank account not active') {
                    setError('Selected Bank account is not active yet')
                } else if (error.response.data.error === 'Amount should be greater than 10') {
                    setError('Amount should be greater than 10')
                } else if (error.response.data.error === 'Do not have any active account in the currency'){
                    setError('Do not have any active bank account')
                } else if(error.response.data.error === 'Donot have sufficient balance in Account') {
                    setError('Do not have suffiecient balance to make the transaction')
                };
            });
        }

    };


    // Method to handle select fixed amount
    const handleFixedAmount = (value)=> {
        if (value > filteredBalance) {
            setError('Amount is greater than Account Balance')
        } else {
            setError('')
        }
    };

 

    return (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <Box
                sx={{
                width: isSmallScreen ? '100%' : '400px',
                backgroundColor: '#eae6e8',
                borderRadius: '25px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                padding:3
                }}
            >
                <Box sx={{ padding: 1 }}>

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

                    {/* Amount Display */}
                    <Box sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Amount
                        </Typography>

                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Typography variant="h4" color="textPrimary">
                               {getCurrencyIcon(balanceCurrency)}{filteredBalance ? filteredBalance.toFixed(3) : 0.00}
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

                    {/* Slider */}
                    <Slider
                        value={sliderAmount}
                        max={filteredBalance ? (filteredBalance >= 10 ? filteredBalance : 0) : 0}
                        onChange={(e, newValue) => handleSliderChange(newValue)}
                        min={filteredBalance === undefined ? 0 : (filteredBalance ? (filteredBalance >= 10 ? 10 : 0) : 0)}
                        aria-label="Medium"
                        valueLabelDisplay="auto"
                    />


                    {/* Amount Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        {[0, 10, 100, 1000, 10000].map((value) => (
                        <AmountButton
                            key={value}
                            onClick={() => {setSliderAmount(value); handleFixedAmount(value);}}
                            selected={sliderAmount === value}
                        >
                            {getCurrencyIcon(balanceCurrency)}{value}
                        </AmountButton>
                        ))}
                    </Box>

                {/* Withdraw Button */}
                <p style={{color:'red'}}>{error && error}</p>
                <p style={{color:'green'}}>{successMessage && successMessage}</p>
                <WithdrawButton fullWidth onClick={handleRaiseWithDrawalRequest}>Withdraw</WithdrawButton>
                </Box>
            </Box>
          </DialogContent>
        </Dialog>
    
    );
  }
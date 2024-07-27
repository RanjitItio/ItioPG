import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import Typography from '@mui/material/Typography';





// Update Merchant Bank Accounts
export default function UpdateMerchantBankAccount() {

    const navigate = useNavigate();
    const location = useLocation();

    // Get data from previous page
    const bankDetails = location.state?.accountDetails || '';

// console.log(bankDetails)
    //Initial form Value
    const initialFormData = Object.freeze({
        acc_holder_name: bankDetails?.acc_hold_name  || '',
        acc_holder_add:  bankDetails?.acc_hold_add   || '',
        acc_no:          bankDetails?.acc_no         || '',
        short_code:      bankDetails?.short_code     || '',
        ifsc_code:       bankDetails?.ifsc_code      || '',
        bank_name:       bankDetails?.bank_name      || '',
        bank_add:        bankDetails?.bank_add       || '',
        add_info:        bankDetails?.add_info       || '',
        currency:        '',
        bank_doc:        null,
        merch_bnk_id:    bankDetails?.id             || '',
    })

    const [currency, setCurrency] = useState('');
    const [currencies, updateCurrencies]      = useState([]);                // State to Store Currencies fetched from API
    const [formData, updateFormData]          = useState(initialFormData);   //Add Bank Account Form State
    const [ImageError, setImageError]         = useState('');                // Image Error state
    const [fileName, setFileName]             = useState('');                // File name 
    const [errorMessage, setErrorMessage]     = useState('');              // Error Message State
    const [successMessage, setSuccessMessage] = useState('');              // Success Message State
    const [disableButton, setDisableButton]   = useState(false);           // Disbale the button after clicked\

    
    // Capture currency value
    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
      };


    //Capture form value and validate every field value
    const handleFormChange = (event)=> {
        const { name, value, files } = event.target;

        if (name === 'bank_doc') {
            const file = files[0];
            const validFormats = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/svg+xml', 'application/pdf'];

            if (!validFormats.includes(file.type)) {
                setImageError('Unsupported file format. Please upload a jpeg, png, bmp, gif, pdf or svg file.')
                setFileName('')

            } else if (file.size > 1024 * 1024) {
                setImageError('File size exceeds 1MB. Please upload a smaller file.');
                setFileName('')

            } else {
                setImageError('');

                setFileName(file.name)

                updateFormData({
                    ...formData, 
                    [event.target.name]: files[0]
                });
            }

        } else {

            updateFormData({
                ...formData, 
                [event.target.name]: value
            });

        };
    };


    //Fetch all the Available currency
    useEffect(() => {
        axiosInstance.get(`api/v2/currency/`).then((res)=> {
            // console.log(res.data.currencies)

            if (res.status === 200 && res.data.currencies) {
                updateCurrencies(res.data.currencies)

                //Update the currency value after fetching the currency to avoid MUI Warning
                updateFormData(prevState => ({
                    ...prevState,
                    currency: bankDetails?.currency?.name || ''
                }))
            }

        }).catch((error)=> {
            console.log(error)

        })
    }, []);


    // Method to update Merchant Bank Account 
    const handleFormSubmit = ()=> {
        if (formData.acc_holder_name === '') {
           setErrorMessage('Please type Account holder name')
        } else if (formData.acc_holder_add === '') {
           setErrorMessage('Please type Account holder Address')
        } else if (formData.acc_no === '') {
           setErrorMessage('Please type Account Number')
        } else if (formData.short_code === '') {
           setErrorMessage('Please type Short Code')
        } else if (formData.ifsc_code === '') {
           setErrorMessage('Please type IFSC Code')
        } else if (formData.bank_name === ''){
           setErrorMessage('Please type Bank name')
        } else if (formData.bank_add === '') {
           setErrorMessage('Please type Bank Address')
        }else if (formData.currency === '') {
           setErrorMessage('Please select Currency')
        } else if (ImageError) {
           setErrorMessage('Please select valid document')
        } else {
           setErrorMessage('');

         const FormDataObj = new FormData();

         FormDataObj.append('hldr_name', formData.acc_holder_name);
         FormDataObj.append('hldr_add',  formData.acc_holder_add);
         FormDataObj.append('acc_no',    formData.acc_no);
         FormDataObj.append('srt_code',  formData.short_code);
         FormDataObj.append('ifsc_code', formData.ifsc_code);
         FormDataObj.append('bnk_name',  formData.bank_name);
         FormDataObj.append('bnk_add',   formData.bank_add);
         FormDataObj.append('curr',      formData.currency);
         FormDataObj.append('add_info',  formData.add_info);
         FormDataObj.append('doc',       formData.bank_doc);
         FormDataObj.append('mrc_bnk_id', formData.merch_bnk_id);

         axiosInstance.put(`api/v4/merchant/bank/`, FormDataObj, {
           headers: {
               'Content-Type': 'multipart/form-data'
             }

         }).then((res)=> {
           //  console.log(res)

            if (res.status === 200) {
               setSuccessMessage('Updated Successfully')
               setDisableButton(true)

               setTimeout(() => {
                   navigate('/merchant/bank/accounts/')
               }, 1500);
            }

         }).catch((error)=> {
           console.log(error)

         })
        }
   };


    
    return (
            <Box sx={{ flexGrow: 1 }}>
                <Paper 
                    elevation={3} 
                    sx={{
                           height: {xs: '62rem', sm: '38rem', md:'35rem'}, 
                           padding:'20px', 
                           borderRadius: '20px',
                           marginTop: '10px'
                        }}
                    >
                <p className='fs-4'><b>Update Bank Account</b></p>
                <Grid container spacing={3} sx={{marginTop: '8px', marginBottom: '30px'}}>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='acc_holder_name'
                            value={formData.acc_holder_name}
                            onChange={handleFormChange}
                            label="Account Holder Name" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            name='acc_holder_add'
                            value={formData.acc_holder_add}
                            onChange={handleFormChange} 
                            label="Account Holder Address" 
                            variant="outlined" 
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='acc_no'
                            value={formData.acc_no}
                            onChange={handleFormChange}
                            label="Account Number/ IBAN No" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='short_code'
                            value={formData.short_code}
                            onChange={handleFormChange}
                            label="Short Code" 
                            variant="outlined"
                            fullWidth
                            // size="small" 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='ifsc_code'
                            value={formData.ifsc_code}
                            onChange={handleFormChange}
                            label="IFSC Code" 
                            variant="outlined" 
                            fullWidth
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                name='bank_name'
                                value={formData.bank_name}
                                onChange={handleFormChange}
                                label="Bank Name" 
                                variant="outlined" 
                                fullWidth
                                // size="small"
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic"
                                name='bank_add'
                                value={formData.bank_add}
                                onChange={handleFormChange} 
                                label="Bank Address" 
                                variant="outlined"
                                fullWidth
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                name='add_info'
                                value={formData.add_info}
                                onChange={handleFormChange}
                                label="Additional Information" 
                                variant="outlined"
                                fullWidth
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Requested Currency</InputLabel>
                            <Select
                            labelId="requested-currency"
                            id="requested-currency"
                            name='currency'
                            value={formData.currency}
                            label="Requested Currency"
                            onChange={(event)=> {handleChangeCurrency(event); handleFormChange(event)}}
                            >
                                {currencies.map((currency, index)=> (
                                    <MenuItem value={currency.name} key={index}>{currency.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                    <FormControl sx={{marginBottom: '2px'}}>
                        <input
                            style={{ display: 'none' }}
                            accept="*"
                            id="bank_doc"
                            name='bank_doc'
                            onChange={handleFormChange}
                            type="file"
                            hidden
                        />
                        <label htmlFor="bank_doc">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component="span" 
                                sx={{ ml: 2 }}
                                htmlFor='bank_doc'
                                >
                                Upload Doc
                            </Button>
                        </label>

                        {fileName && <Typography variant="body2" sx={{ ml: 2 }}>{fileName}</Typography>}
                        <FormHelperText><i>Max upload size 1MB</i></FormHelperText>
                        <FormHelperText><i>Supported format:jpeg, png, bmp, gif, pdf or svg</i></FormHelperText>

                        {/* Show Image error if exists */}
                        {ImageError && (
                            <Typography variant="caption" color="error">{ImageError}</Typography>
                            )}

                        </FormControl>
                    </Grid>
                </Grid>

                <Stack 
                    direction="row" 
                    spacing={4} 
                    sx={{
                        display: 'flex', 
                        justifyContent: 'center',
                        }} >
                    <Button 
                         variant="outlined" 
                         startIcon={<CheckRoundedIcon />} 
                         onClick={handleFormSubmit}
                         disabled={disableButton}
                        >
                        Submit
                    </Button>

                    <Button 
                         variant="contained" 
                         endIcon={<FirstPageRoundedIcon/>}
                         onClick={()=> {navigate('/merchant/bank/accounts/')}}
                         >
                        Back
                    </Button>
                </Stack>

                {/* Show Success and Error Message if any */}
                {errorMessage && <Typography variant="body2" sx={{ ml: 2, color:'red' }}>{errorMessage}</Typography>}
                {successMessage && <Typography variant="body2" sx={{ ml: 2, color: 'green' }}>{successMessage}</Typography>}

                </Paper>
            </Box>
        
      );
};
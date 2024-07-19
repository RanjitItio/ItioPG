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
import axiosInstance from '../Authentication/axios';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';




// Add new bank Accounts
export default function AddMerchantBankAccount() {

    //Initial form Value
    const initialFormData = Object.freeze({
        acc_holder_name: '',
        acc_holder_add: '',
        acc_no:         '',
        short_code:     '',
        ifsc_code:      '',
        bank_name:      '',
        bank_add:       '',
        add_info:       '',
        bank_doc:      null
    })

    const navigate = useNavigate();
    const [currency, setCurrency]             = useState('');                // Currency State
    const [currencies, updateCurrencies]      = useState([]);                // State to Store Currencies fetched from API
    const [formData, updateFormData]          = useState(initialFormData);   //Add Bank Account Form State
    const [ImageError, setImageError]         = useState('');                // Image Error state
    const [fileName, setFileName]             = useState('');                // File name 
    const [errorMessage, setErrorMessage]     = useState('');              // Error Message State
    const [successMessage, setSuccessMessage] = useState('');              // Success Message State
    const [disableButton, setDisableButton]   = useState(false);


    // Update Currency value
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
                    [event.target.name]: files[0],
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
            }

        }).catch((error)=> {
            console.log(error)

        })
    }, []);

// console.log(formData.bank_doc)

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
         }else if (currency === '') {
            setErrorMessage('Please select Currency')
         } else if (ImageError) {
            setErrorMessage('Please select valid document')
         } else {
            setErrorMessage('');
            setDisableButton(true)

          const FormDataObj = new FormData();

          FormDataObj.append('hldr_name', formData.acc_holder_name);
          FormDataObj.append('hldr_add',  formData.acc_holder_add);
          FormDataObj.append('acc_no',    formData.acc_no);
          FormDataObj.append('srt_code',  formData.short_code);
          FormDataObj.append('ifsc_code', formData.ifsc_code);
          FormDataObj.append('bnk_name',  formData.bank_name);
          FormDataObj.append('bnk_add',   formData.bank_add);
          FormDataObj.append('curr',      currency);
          FormDataObj.append('add_info',  formData.add_info);
          FormDataObj.append('doc',       formData.bank_doc);

          axiosInstance.post(`api/v4/merchant/bank/`, FormDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }

          }).then((res)=> {
            //  console.log(res)

             if (res.status === 200) {
                setSuccessMessage('Bank Account Added successfully please wait for Admin Approval')
                

                setTimeout(() => {
                    navigate('/merchant/bank/accounts/')
                }, 1500);
             }

          }).catch((error)=> {
            console.log(error.reponse)

          })
         }
    };
    
    
      return (
            <Box sx={{ flexGrow: 1 }}>
                <Paper 
                    elevation={3} 
                    sx={{
                           height: {xs: '65rem', sm: '40rem', md:'40rem'}, 
                           padding:'20px', 
                           borderRadius: '20px',
                           marginTop: '10px'
                        }}
                    >
                <p className='fs-4'><b>Add Bank Account</b></p>
                <Grid container spacing={3} sx={{marginTop: '8px', marginBottom: '30px'}}>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='acc_holder_name'
                            label="Account Holder Name" 
                            variant="outlined" 
                            fullWidth
                            onChange={handleFormChange}
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            fullWidth 
                            id="outlined-basic" 
                            name='acc_holder_add'
                            label="Account Holder Address" 
                            variant="outlined"
                            onChange={handleFormChange} 
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='acc_no'
                            label="Account Number/ IBAN No" 
                            variant="outlined" 
                            fullWidth
                            onChange={handleFormChange}
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='short_code'
                            label="Short Code" 
                            variant="outlined"
                            fullWidth
                            onChange={handleFormChange}
                            // size="small" 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            id="outlined-basic" 
                            name='ifsc_code'
                            label="IFSC Code" 
                            variant="outlined" 
                            fullWidth
                            onChange={handleFormChange}
                            // size="small"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                name='bank_name'
                                label="Bank Name" 
                                variant="outlined" 
                                fullWidth
                                onChange={handleFormChange}
                                // size="small"
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                name='bank_add'
                                label="Bank Address" 
                                variant="outlined"
                                fullWidth
                                onChange={handleFormChange}
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                                id="outlined-basic" 
                                name='add_info'
                                label="Additional Information" 
                                variant="outlined"
                                fullWidth
                                onChange={handleFormChange}
                                // size="small" 
                                />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Requested Currency</InputLabel>
                            <Select
                                labelId="requested-currency"
                                id="requested-currency"
                                value={currency}
                                label="Requested Currency"
                                onChange={(event)=> {handleChangeCurrency(event); handleFormChange(event); }}
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
                    
                    <Button variant="contained" onClick={()=> {navigate('/merchant/bank/accounts/')}} endIcon={<FirstPageRoundedIcon />}>
                        Back
                    </Button>

                </Stack>
                {errorMessage && <Typography variant="body2" sx={{ ml: 2, color:'red' }}>{errorMessage}</Typography>}
                {successMessage && <Typography variant="body2" sx={{ ml: 2, color: 'green' }}>{successMessage}</Typography>}

                </Paper>
            </Box>
        
      );
};
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';




// Add new business for merchant
export default function AddNewBusines() {

    const navigate = useNavigate();

    const initialFormData = {
        business_name: '',
        site_url:      '',
        currency:      '',
        message:       '',
        img:           null
    }

    const [currencies, setCurrencies]             = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [formData, updateFormData]              = useState(initialFormData);
    const [error, setError]                       = useState('');
    const [ImageError, setImageError]             = useState('');
    const [successMessage, setSuccessMessage]     = useState('');
    const [urlError, setUrlError]                 = useState('');
    const [selectedImage, setSelectedImage]       = useState(null);
    const [disableButton, setDisableButton]       = useState(false);


    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value);
    };

    // Load Currencies when page loads
    useEffect(() => {
      axiosInstance.get(`api/v2/currency/`).then((res)=> {
            // console.log(res.data.currencies)
            if (res.data && res.data.currencies){
                setCurrencies(res.data.currencies)

            };
      }).catch((error) => {
        console.log(error)

      })
    }, []);


    const validateURL = (url) => {
        const urlPattern = /^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return urlPattern.test(url);
    };

    //Handle Form value change
    // console.log(formData.img)
    const handleFormValueChange = (event)=> {
        const { name, value, files } = event.target;

        if (name == 'img') {
            const file = files[0];
            const validFormats = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/svg+xml'];

            if (!validFormats.includes(file.type)) {
                setImageError('Unsupported file format. Please upload a jpeg, png, bmp, gif, or svg file.')
                // return;
            }

            const img_reader = new FileReader()

            img_reader.onload = (e)=> {
                const img = new Image();

                img.onload = ()=> {

                    if (img.width != 100 || img.height != 100) {
                        setImageError('Image dimensions must be 100px by 100px.')
                    } else {
                        setImageError('')
                        setSelectedImage(e.target.result)
                    }
                }
                img.src = e.target.result;
            };
            img_reader.readAsDataURL(file)

            updateFormData({
                ...formData,
                [name]: files[0],
            });

        } else {
            if (name == 'site_url') {
                if (!validateURL(value)) {
                    setUrlError('Please provide a valid url')

                } else {
                    setUrlError('')
                }
            }
            updateFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    // Method to Submit the data
    const handleFormSubmit = (event) => {

        if(formData.img) {
            const file = formData.img
            const validFormats = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/svg+xml'];

            if (!validFormats.includes(file.type)) {
                setImageError('Unsupported file format. Please upload a jpeg, png, bmp, gif, or svg file.')

            } else {
                const img_reader = new FileReader()

                img_reader.onload = (e)=> {
                    const img = new Image();

                    img.onload = ()=> {

                        if (img.width != 100 || img.height != 100) {
                            setImageError('Image dimensions must be 100px by 100px.')
                        } 
                        else {
                            setImageError('')
                            submitFormData()
                        }
                    }
                    img.src = e.target.result;
                };
                img_reader.readAsDataURL(file)
            }

        } else {
            submitFormData()
        } 
    };


    // API call to submit data through API
    const submitFormData = () => {

        if (formData.business_name === '') {
          setError('Please type your Business Name');
        } else if (formData.site_url === '') {
          setError('Please type your URL');
        } else if (formData.currency === '') {
          setError('Please select your transaction Currency');
        } else {
          setError(''); 
          
          const FormDataObj = new FormData();
          FormDataObj.append('bsn_name', formData.business_name);
          FormDataObj.append('bsn_url', formData.site_url);
          FormDataObj.append('currency', formData.currency);
          FormDataObj.append('bsn_msg', formData.message);
          FormDataObj.append('logo', formData.img);
      
          // Create new business
          axiosInstance.post(`api/v4/user/merchant/`, FormDataObj, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
            setDisableButton(true)

            if (res.status === 200) {
              setSuccessMessage('Business created successfully. Please wait for admin approval.');

              setTimeout(() => {
                navigate('/merchant/businesses/');
              }, 2000);
            }

          }).catch((error) => {
            console.log(error);

            if (error.response.data.msg === 'This business name has already been taken') {
              setError('Business name already exists');

            } else if (error.response.data.msg === 'This URl has already been taken') {
              setError('URL already exists');

            } else if (error.response.data.msg === 'Only merchant allowed') {
                setError('Only merchants can create Business')
            };

          });
        }
      };
    // console.log(error)

    return (
        <>
            <div className="d-flex justify-content-center">
                <p className='fs-3'>NEW BUSINESS</p>
            </div>
            <div className="d-flex justify-content-center">
                <p className='text-muted'>Fill in the Information needed to create a business account</p>
            </div>
            <br />
            
            {/* Carousel */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <Paper elevation={3}> 
                        <p className='fs-5 d-flex justify-content-center text-primary'><b>Being A</b></p>
                        <p className='fs-4 d-flex justify-content-center my-2'><b>Merchant</b></p>

                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                            
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://python-uat.oyefin.com/media/add_merchant/merchant_payment.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Merchant Account will allow your business to accept payment from your customers
                                    </p>
                                </div>

                                <div className="carousel-item" >
                                    <img src="https://python-uat.oyefin.com/media/signup/user.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Once the a merchant is approved by the Administrtor, The merchant account is ready to accept payments.
                                    </p>
                                </div>

                                <div className="carousel-item">
                                    <img src="https://python-uat.oyefin.com/media/signup/merchant.png" className="d-block" alt="..." style={{maxWidth: '200px', maxHeight: '200px', marginLeft: '120px'}} />
                                    <p style={{ textAlign: 'center', maxWidth: '300px', marginLeft: '85px' }} className='my-3 text-muted'>
                                        Money added to your wallets when customer pays for product and service.
                                    </p>
                                </div>
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"  >
                                <span className="carousel-control-prev-icon" aria-hidden="true" style={{backgroundColor: '#C4FCEF'}}></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true" style={{backgroundColor: '#C4FCEF'}}></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </Paper>
                </Grid>
                {/* Carousel */}

                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <Paper elevation={3} sx={{ maxHeight: '100rem', overflow: 'auto' }}>
                       
                        <Box sx={{ p: 3 }}>
                            
                            <p style={{textAlign: 'center'}} className='fs-3 my-3'>Business Form</p>
                            <TextField 
                                id="business-name" 
                                name='business_name'
                                onChange={handleFormValueChange}
                                label="*Business Name" 
                                variant="outlined" 
                                placeholder='Enter your business name'
                                fullWidth
                                sx={{marginBottom: 2}}
                                />

                            <TextField 
                                id="business-url" 
                                name='site_url'
                                onChange={handleFormValueChange}
                                label="*Site URL" 
                                variant="outlined" 
                                placeholder='https://example.com'
                                fullWidth 
                                sx={{marginBottom: 2}}
                                error={Boolean(urlError)}
                                helperText={
                                    <>
                                       <Typography variant="caption" color="error">{urlError}</Typography>
                                       <Typography variant="caption"><i>* Make sure to add https:// </i></Typography>
                                    </>
                                }
                                />

                                <FormControl fullWidth sx={{marginBottom: 2}}>
                                    <InputLabel id="demo-simple-select-label">*Currency</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-currency-select"
                                    name='currency'
                                    value={selectedCurrency}
                                    label="Currency"
                                    onChange={(event) => {handleCurrencyChange(event); handleFormValueChange(event);}}
                                    >
                                        {currencies.map((curency)=> (
                                            <MenuItem value={curency.name} key={curency.id}>
                                                {curency.name}
                                            </MenuItem>
                                        ))}
                                    
                                    </Select>
                                </FormControl>

                            <FormControl fullWidth>
                                <FormHelperText><i>Message for administration</i></FormHelperText>
                                <Textarea 
                                    color="primary"
                                    name='message'
                                    onChange={handleFormValueChange}
                                    minRows={5} 
                                    placeholder='Enter your Message here'
                                    sx={{marginBottom: 2, width: '100%'}}
                                    />
                            </FormControl>

                            <FormControl sx={{marginBottom: '2px'}}>
                                <input 
                                    type="file" 
                                    placeholder='Upload Logo'
                                    name="img" 
                                    id="logo" 
                                    style={{marginBottom: 20, width: '100%'}}
                                    onChange={handleFormValueChange}
                                    accept='image/*'
                                    hidden
                                    />
                                    <label htmlFor="logo">
                                        <Button variant="contained" color="primary" component="span">
                                            Upload Logo
                                        </Button>
                                    </label> 
                                <br/>
                                <FormHelperText><i>Recommended size: 100px * 100px</i></FormHelperText>
                                <FormHelperText><i>Supported format:jpeg, png, bmp, gif or svg</i></FormHelperText>
                                {ImageError && (
                                    <Typography variant="caption" color="error">{ImageError}</Typography>
                                )}
                                {selectedImage && (
                                        <div>
                                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                                        </div>
                                    )}
                            </FormControl>


                            <Button 
                                 variant="contained" 
                                 fullWidth 
                                 sx={{marginBottom: 2}} 
                                 onClick={handleFormSubmit}
                                 disabled={disableButton}
                            >
                                Create Business
                            </Button>
                            {error && <p className='text-danger'>{error}</p>}
                            {successMessage && <p className='text-success'>{successMessage}</p>}
                        </Box>
                       
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};


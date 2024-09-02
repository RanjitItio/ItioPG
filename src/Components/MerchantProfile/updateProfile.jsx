import TextField from '@mui/material/TextField';
import { Paper, Typography, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosInstance from '../Authentication/axios';
import { useLocation, useNavigate } from 'react-router-dom';






// Update Merchant Profile
export default function UpdateMerchantProfile() {
    const navigate = useNavigate();
    const location = useLocation();

    const states = location?.state || '';
    const userData = states.user

    const initialFormData = {
        name: userData?.full_name || '',
        email: userData?.email || '',
        phoneno: userData?.phoneno || '',
        state: userData?.state || '',
        city:  userData?.city || '',
        landmark: userData?.landmark || '',
        zipcode: userData?.zipcode || '',
        country: userData?.country || '',
        address: userData?.address || '',
        nationality: userData?.nationality || '',
        dob: userData?.dateofbirth || '',
        gender: userData?.gander || '',
        marital_status: userData?.marital_status || '',
    };

    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError]                   =  useState('');
    const [formData, updateFormData]          = useState(initialFormData);

    

    // If state value not present
    if (states === '') {
        return (
            <p>Please go back try to re edit</p>
        );
    };

    // capture form data
    const handleChangeFormData = (e)=> {
        const {name, value} = e.target;

        updateFormData({...formData, 
            [name]: value
        })
    };


    // Cancel button clicked
    const handleCancelButtonClicked = ()=> {
          navigate('/merchant/profile/')
    };
 

    // Submit updated data
    const handleSubmitFormData = ()=> {
         if (formData.name === '') {
            setError('Name can not be Empty')
         } else if (formData.email === '') {
            setError('Email can not be Empty')
         } else if (formData.phoneno === '') {
            setError('Mobile Number can not be Empty')
         } else {
            axiosInstance.put(`/api/v1/merchant/profile/`, {
                email: formData.email,
                phoneno: formData.phoneno,
                full_name: formData.name,
                state: formData.state,
                city: formData.city,
                landmark: formData.landmark,
                zipcode: formData.zipcode,
                nationality: formData.nationality,
                dob: formData.dob,
                gender: formData.gender,
                marital_status: formData.marital_status,
                country: formData.country,
                address: formData.address

            }).then((res)=> {
                console.log(res)

                if (res.status === 200 && res.data.success === true) {
                    setSuccessMessage('Updated Successfully')

                    setTimeout(() => {
                        navigate('/merchant/profile/')
                    }, 1200);
                };

            }).catch((error)=> {
                console.log(error)

            })
         }
    };



    return (
        <Paper
            elevation={3}
            sx={{
                padding: 3,
                marginTop: 1,
                borderRadius: 7,
                '&:hover': {
                boxShadow: '-9px 17px 5px 0px rgba(0,0,0,0.75)',
                },
            }}
            >
            <Typography variant="h5" gutterBottom sx={{mb:3}}>
                Update Profile
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        fullWidth
                        name='name'
                        value={formData?.name}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        name='email'
                        value={formData?.email}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="phoneno" 
                        label="Mobile Number" 
                        variant="outlined" 
                        fullWidth 
                        name='phoneno'
                        value={formData?.phoneno}
                        onChange={handleChangeFormData}
                        />
                </Grid>
            </Grid>


            {/* Contact Info Update */}
            {/* <h5 style={{marginTop:10, marginBottom:10}}>Contact Info:</h5> */}
            <Grid container spacing={3} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="state" 
                        label="State" 
                        variant="outlined"
                        fullWidth 
                        name='state'
                        value={formData?.state}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="city" 
                        label="City" 
                        variant="outlined" 
                        fullWidth 
                        name='city'
                        value={formData?.city}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="landmark" 
                        label="Landmark" 
                        variant="outlined" 
                        fullWidth 
                        name='landmark'
                        value={formData?.landmark}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="zipcode" 
                        label="Zipcode" 
                        variant="outlined" 
                        fullWidth 
                        name='zipcode'
                        value={formData?.zipcode}
                        onChange={handleChangeFormData}
                        />
                </Grid>
                    
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="country" 
                        label="Country" 
                        variant="outlined" 
                        fullWidth 
                        name='country'
                        value={formData?.country}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField  
                        id="address" 
                        label="Address" 
                        variant="outlined" 
                        fullWidth 
                        name='address'
                        value={formData?.address}
                        onChange={handleChangeFormData}
                        />
                </Grid>
            </Grid>

            {/* <h5 style={{marginTop:10, marginBottom:10}}>Basic Info:</h5> */}
            <Grid container spacing={3} style={{marginTop:10, marginBottom:10}}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="nationality" 
                        label="Nationality" 
                        variant="outlined"
                        fullWidth 
                        name='nationality'
                        value={formData?.nationality}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='date' 
                        id="dob" 
                        label='DOB'
                        variant="outlined"
                        fullWidth 
                        name='dob'
                        value={formData?.dob}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="gender" 
                        label="Gender" 
                        variant="outlined"
                        fullWidth 
                        name='gender'
                        value={formData?.gender}
                        onChange={handleChangeFormData}
                        />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField 
                        type='text' 
                        id="marital_status" 
                        label="Marital Status" 
                        variant="outlined"
                        fullWidth 
                        name='marital_status'
                        value={formData?.marital_status}
                        onChange={handleChangeFormData}
                        />
                </Grid>
            </Grid>


        {/* Error Message */}
        <Typography sx={{color:'red', display:'flex', justifyContent: 'center'}}>{error}</Typography>

        {/* Success Message */}
        <Typography sx={{color:'green', display:'flex', justifyContent: 'center'}}>{successMessage}</Typography>

        <Grid container justifyContent="center" sx={{ mt: 3 }} spacing={2}>
            <Grid item>
                <Button 
                    sx={{mx:2}} 
                    variant="contained" 
                    endIcon={<BackupIcon />}
                    onClick={handleSubmitFormData}
                    >
                    Submit
                </Button>

                <Button 
                    sx={{mx:2}} 
                    variant="contained" 
                    endIcon={<CancelIcon color='error'/>}
                    onClick={handleCancelButtonClicked}
                    >
                    Cancel
                </Button>
            </Grid>
        </Grid>
        </Paper>
    );
};
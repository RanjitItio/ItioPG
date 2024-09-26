import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMediaQuery, useTheme } from '@mui/material';
import {Input as JoyInput} from '@mui/joy';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';



const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let kycRedirectUrl = '';



// URL according to the environment
if (IS_DEVELOPMENT === 'True') {
    kycRedirectUrl = 'http://localhost:5173'
} else {
    kycRedirectUrl = 'https://react-payment.oyefin.com'
};



// User Signin 
export default function Signin() {

    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [formData, updateFormData] = useState(initialFormData);   // Form data state
    const [error, setError] = useState('')                          // Error Message state
    const [successMessage, setSuccessMessage] = useState('');       // Success Message state
    const [disbaleButton, setDisableButton]   = useState(false);    // Disable login button state

    
    // Method to capture user input values
    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

    // Submit form to API on clicking on Submit button
    const handleOnSubmit = async (e)=> {
        e.preventDefault();
        let validationError = [];

        if (!formData.email) {
            validationError.push("Please fill the Email");
        }
        else if (!formData.password) {
            validationError.push("Please fill the password");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
        }

        // Diable the button
        setDisableButton(true)

        // Call signin API
        await axiosInstance.post(`api/v1/user/login/`, {
				email: formData.email,
				password: formData.password,
      })
			.then((res) => {
                if(res.status == 200) {
                    
                    setSuccessMessage(`Login Successfull`)
                   
                    localStorage.setItem('is_merchant', res.data.is_merchant)
                    
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.access_token);
                    localStorage.setItem('user_name', res.data.user_name);

                    axiosInstance.defaults.headers['Authorization'] =
                      'Bearer ' + localStorage.getItem('access_token');

                      setTimeout(() => {
                        window.location.href = '/'
                    }, 1000);
                }

			}).catch((error)=> {
                console.log(error)

                if (error.response.data.msg == 'Your account is not active. Please contact the administrator'){
                    setError("Your account is not active yet please contact the Administrator");
                }
                else if (error.response.data.msg == 'Invalid credentials'){
                    setError("Invalid Credentials");
                }
                else if (error.response.data.message === 'Kyc not submitted') {
                    let first_name     = error.response.data.first_name
                    let last_name      = error.response.data.last_name
                    let contact_number = error.response.data.contact_number
                    let email          = error.response.data.email
                    let user_id        = error.response.data.user_id

                    window.location.href = `${kycRedirectUrl}/kyc/?first_name=${first_name}&last_name=${last_name}&contact_number=${contact_number}&email=${email}&user_id=${user_id}`

                } else {
                    setError('')
                }
            })
    };


    return (
        <Box display="flex">
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CardMedia
            component="img"
            image="https://python-uat.oyefin.com/media/signup/authImg.png"
            alt="Logo"
            sx={{display:{xs:'none', sm:'flex', md:'flex'}}}
          />
        </Box>
  
        <Box flex={1} display="flex" alignItems="center" justifyContent="center" bgcolor="white">
          <Container maxWidth="sm">
            <Card sx={{ boxShadow: 0, p: 5, borderRadius: 2 }}>
            
              <Box display="flex" flexDirection="column" alignItems="left" marginBottom={2}>
                  <Typography component="h1" variant="h5">
                      <b>Sign In to your Account</b>
                  </Typography>
                  <p>Welcome back! please enter your detail</p>
              </Box>

              <form onSubmit={handleOnSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <JoyInput
                      variant="soft"
                      required
                      id="email"
                      placeholder="Email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      startDecorator={
                        <EmailIcon color='primary' />
                      }
                      sx={{
                        width:{xs:'100%', sm:'80%'}
                      }}
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <JoyInput
                      variant="soft"
                      required
                      name="password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      startDecorator={
                        <LockIcon color='primary'/>
                      }
                      sx={{
                        width:{xs:'100%', sm:'80%'}
                      }}
                    />
                  </Grid>
  
                  <Grid item xs={12}>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={disbaleButton}
                      sx={{
                        width:{xs:'100%', sm:'80%'}
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
  
                  {error && (
                    <Grid item xs={12}>
                      <Typography color="error">{error}</Typography>
                    </Grid>
                  )}
                  {successMessage && (
                    <Grid item xs={12}>
                      <Typography color="teal">{successMessage}</Typography>
                    </Grid>
                  )}
                </Grid>
              </form>

              <Box display="flex" justifyContent="space-between" sx={{mt:4, width:{xs:'100%', sm:'80%'}}}>
                <Typography variant="body2">
                    If you don't have an account <Link to="/signup">Signup</Link>
                </Typography>

                <Typography variant="body2">
                  <Link to="/forgot-password">Forgot password?</Link>
                </Typography>
              </Box>

            </Card>
          </Container>
        </Box>
      </Box>

    );
};
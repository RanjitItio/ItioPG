import { Box, Container, Grid, Button, Typography, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import {Input as JoyInput} from '@mui/joy';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation } from 'react-router-dom';






// Reset forgot password
export default function ResetForgotPassword() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')

    // Initial form data
    const initialFormData = Object.freeze({
        password1: '',
        password2: '',
    })

    const [formData, UpdatFormData] = useState(initialFormData)  // Password data
    const [error, setError] = useState('')   // Error Message
    const [successMessage, setSuccessMessage] = useState('');  // Success Message
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);   // Disable Button

    // Capture the user inputs
    const handleChange = (e)=> {
        UpdatFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };


    // Method to submit the data through API
    const handleSubmit = (e)=> {
        e.preventDefault();

        if(!formData.password1) {
            setError("Please fillup the password");

        } else if (!formData.password2) {
            setError('Please fill in Confirm password')

        } else{
            setError('');
            setIsButtonDisabled(true);

            axiosInstance.post(`/api/v1/user/reset_passwd/`, {
                password1: formData.password1,
                password2: formData.password2,
                token: token
            })
            .then((res) => {
                // console.log(res)
                if (res.status === 200 && res.data.msg === 'Password has been reset successfully') {
                setSuccessMessage('Password reset successfully')
                setIsButtonDisabled(false);

                } else{
                setSuccessMessage('')
            }

            }).catch((error)=> {
            console.log(error)

            if(error.response.data.msg === 'Invalid token or user does not exist') {
                setError('Invalid User')
            } else if (error.response.data.msg === 'Password did not match') {
                setError('Password did not match')
            }

            })
        }
    };


// Remove the error and success message if any
useEffect(() => {

    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError('');
        setSuccessMessage('');
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);


    return (
        <Container component="main" maxWidth="lg">
        <Grid container spacing={2} alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                display: {xs: 'none', sm:'flex'}
              }}
              alt="Image"
              src="https://python-uat.oyefin.com/media/forgotpassword.png"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
              }}
            >
              <Typography component="h1" variant="h5">
                <b>Set Password</b>
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 3, width:{xs: '100%', sm: '70%'} }}>
                  Enter your password and confirm password
              </Typography>

              <JoyInput
                variant="soft"
                type='password'
                required
                id="password1"
                placeholder="Password"
                name="password1"
                onChange={handleChange}
                autoFocus
                sx={{width:{xs: '100%', sm: '70%'}}}
                startDecorator={
                  <LockIcon color='primary'/>
                }
              />

              <JoyInput
                variant="soft"
                type='password'
                required
                id="password2"
                placeholder="Confirm Password"
                name="password2"
                onChange={handleChange}
                autoFocus
                sx={{width:{xs: '100%', sm: '70%', marginTop:15}}}
                startDecorator={
                  <LockIcon color='primary'/>
                }
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, width:{xs: '100%', sm: '70%'} }}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Submit
              </Button>

              {/* Error and Success Message if any */}
              <Box sx={{width:{xs: '100%', sm: '70%'}}}>
                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
              </Box>

              <Grid container justifyContent="space-between" sx={{width:'70%'}}>

                <Grid item>
                  <Link href="/signup/" variant="body2">
                    If you don't have any account Signup
                  </Link>
                </Grid>

              </Grid>

            </Box>
          </Grid>
        </Grid>

      </Container>
    );
};
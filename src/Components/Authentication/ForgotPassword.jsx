import { Box, Container, Grid, Button, Typography, Link } from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import {Input as JoyInput} from '@mui/joy';
import EmailIcon from '@mui/icons-material/Email';



// User Forgot password
const ForgetPassword = () => {

    // Initial form data
    const initialFormData = Object.freeze({
        email: ''
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
        let validationError = [];
		// console.log('formData');

        if(!formData.email) {
            setError("Please fillup the Email");

        } else{
            setError('');
            setIsButtonDisabled(true);

        axiosInstance.post(`api/v1/user/reset_passwd/mail/`, {
            email: formData.email,
          
        })
        .then((res) => {
            // console.log(res)
            if (res.data.msg == 'Password reset instructions have been sent to your email address.') {
              setSuccessMessage('Password reset mail has been sent to the given email, Please check your mail')
              setIsButtonDisabled(false);

            } else{
              setSuccessMessage('')
            }

        }).catch((error)=> {
          // console.log(error)

          if (error.response.data.msg == 'Requested mail ID does not exist') {
            setError('Requested user does not exist')
            setIsButtonDisabled(false);

          } else if (error.response.data.msg == 'Unable to get the user') {
            setError('Unable to get The user details please retry')
            setIsButtonDisabled(false);

          } else if (error.response.data.msg == 'Server error') {
            setError('Unknow error occured please retry after some time')
            setIsButtonDisabled(false);

          };
        })
    }
};

    // Remove the error and success message if any
    useEffect(() => {

        if (error || successMessage) {
          const timer = setTimeout(() => {
            setError('');
            setSuccessMessage('');
          }, 4000); 
    
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
                <b>Forget Password</b>
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 3, width:{xs: '100%', sm: '70%'} }}>
                  Enter the email address associated with your account and we will send you a link to reset your password.
              </Typography>

              <JoyInput
                variant="soft"
                type='email'
                required
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                autoComplete="email"
                autoFocus
                sx={{width:{xs: '100%', sm: '70%'}}}
                startDecorator={
                  <EmailIcon color='primary'/>
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

export default ForgetPassword;

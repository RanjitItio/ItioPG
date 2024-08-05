import { Box, Container, Grid, TextField, Button, Typography, Link, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axiosInstance from './axios';




const theme = createTheme();



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
              setIsButtonDisabled(true);

            } else{
              setSuccessMessage('')
            }

        }).catch((error)=> {
          console.log(error)

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2} alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                borderRadius: '10px',
                backgroundColor: '#0081CF', color: 'white', p: 2, boxShadow: 3
              }}
              alt="Image"
              src="https://python-uat.oyefin.com/media/signup/authbackgroundpic.png"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                boxShadow: 3,
                borderRadius: '10px',
              }}
            >
              <Typography component="h1" variant="h5">
                Forget Password
              </Typography>

              <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1, mb: 3 }}>
                Please enter your registered email address to receive a password reset link.
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Submit
              </Button>

              {/* Error and Success Message if any */}
              {error &&  <p className="text-danger">{error}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}

              <Grid container justifyContent="space-between">

                <Grid item>
                  <Link href="#" variant="body2">
                    If you don't have any account Signup
                  </Link>
                </Grid>

              </Grid>

            </Box>
          </Grid>
        </Grid>

      </Container>
    </ThemeProvider>
  );
};

export default ForgetPassword;

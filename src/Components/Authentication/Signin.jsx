import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useMediaQuery, useTheme } from '@mui/material';




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

                if (error.response.data.msg == 'Your account is not active. Please contact the administrator.'){
                    setError("Your account is not active yet please contact the Administrator");
                    return;
                }
                else if (error.response.data.msg == 'Invalid credentials'){
                    setError("Invalid Credentials");
                    return;
                }
                else {
                    setError('')
                }
            })
    };


    return (
        // backgroundColor='#0081CF'
        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} minHeight="100vh">
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ backgroundColor: '#0081CF', color: 'white', p: 2 }}
        >
          <CardMedia
            component="img"
            image="https://python-uat.oyefin.com/media/signup/authbackgroundpic.png"
            alt="Logo"
            sx={{ height: isSmallScreen ? 160 : 320, width: isSmallScreen ? 160 : 320, boxShadow: 3 }}
          />
        </Box>
  
        <Box flex={1.5} display="flex" alignItems="center" justifyContent="center" bgcolor="white">
          <Container maxWidth="sm">
            <Card sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                  {/* <RiUser3Line size="3em" /> */}
                </Avatar>
  
                <Typography component="h2" variant="h5" fontWeight="bold" mb={4}>
                  Login
                </Typography>
              </Box>
              <form onSubmit={handleOnSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
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
  
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="body2">
                  If you don't have an account <Link to="/signup">Signup</Link>
                </Typography>
  
                <Typography variant="body2">
                  <Link to="/forgot-password">Forget password</Link>
                </Typography>
              </Box>
            </Card>
          </Container>
        </Box>
      </Box>

    );
};
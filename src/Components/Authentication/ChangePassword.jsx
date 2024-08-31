import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import animationData from '../../assets/laptop.json';
import Lottie from 'lottie-react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';



// Change Password
const ChangePassword = () => {
    const navigate = useNavigate();

    const [password, setPassword]               = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword]       = useState(false);

    const [error, setError]     = useState(false);
    const [success, setSuccess] = useState('');
  
    // get passwrd value
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    // Get confirm password value
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };


    // Close button Clicked
    const handleCloseButtonClicked = ()=> {
        navigate('/');
    };

  
    // Submit the password
    const handleSubmit = () => {
      if (password !== confirmPassword) {
        setError(true);
      } else {

        axiosInstance.post(`api/v1/user/change_password`, {
            password1: password,
            password2: confirmPassword

        }).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                setSuccess('Password changed Successfully')

                setTimeout(() => {
                    navigate('/signin/');
                }, 1000);
            }

        }).catch((error)=> {
            console.log(error)
        })
       
      }
    };
  



  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">

        <Grid 
            item xs={12} md={6} 
            display={{xs:'none', sm:'flex'}}
            justifyContent='center'>
            <Lottie animationData={animationData} loop={true} style={{width:'500px', height: '400px'}} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', padding: 3, maxWidth: '400px', margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Change Password
            </Typography>

            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="outlined"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={error}
              helperText={error && 'New password and confirm password do not match'}
            />

            <p style={{color:'green'}}>{success && success}</p>

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginRight: 2 }}
              >
                Submit
              </Button>

              <Button onClick={handleCloseButtonClicked} variant="outlined" color="secondary">
                    Close
              </Button>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};



export default ChangePassword;

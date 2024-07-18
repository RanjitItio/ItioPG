import { useState } from 'react';
import axiosInstance from './axios';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



// User Signup Function
export default function Signup() {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        first_name: '',
        last_name: '',
        contact_number: '',
        email: '',
        password: '',
        confirm_password: '',
      });
    
    const [formData, updateFormData] = useState(initialFormData);   // User form data state
    const [error, setError] = useState('');                         // Error Message state
    const [successMessage, setSuccessMessage] = useState('');       // Success Message state
    const [disableRegisterButton, setDisableRegisterButton] = useState(false);  // Disable button state
    const [selectedAccountColor, setSelectedAccountColor] = useState('');       // Highlight user type
    const [isMerchant, updateIsMerchant] = useState(false);                     // Merchant check state

    // Method to capture input data of user
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
      };

       
      const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => key !== 'password' && key !== 'confirm_password')
      );

      // Send data to API on form submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        let validationError = [];
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    
        if (!formData.email) {
          validationError.push("Please fill your Email Address");
        } else if (!formData.last_name) {
          validationError.push("Please fill your Last Name");
        } else if (!formData.first_name) {
          validationError.push("Please fill your First Name");
        } else if (!formData.contact_number) {
          validationError.push("Please fill the contact number");
        } else if (formData.contact_number.length < 10) {
          validationError.push("Mobile number must contain 10 digits");
        } else if (!formData.password) {
          validationError.push("Please fillup the password");
        } else if (formData.password.length < 10) {
          validationError.push("Password must contain at least 10 characters");
        } else if (!selectedAccountColor) {
          validationError.push("Please select User account type");
        } else if (!formData.confirm_password) {
          validationError.push("Please fillup the confirm password");
        } else if (formData.password !== formData.confirm_password) {
          validationError.push("Password did not match please correct the password");
        }
    
        if (validationError.length > 0) {
          setError(validationError.join(' '));
          return;
        } else {
          setError('');
        }
    
        setDisableRegisterButton(true);
    
        setTimeout(() => {
          setDisableRegisterButton(false);
        }, 4000);
    
        await axiosInstance.post(`api/v1/user/register/`, {
          firstname: formData.first_name,
          lastname: formData.last_name,
          phoneno: formData.contact_number,
          email: formData.email,
          password: formData.password,
          password1: formData.confirm_password,
          is_merchent: isMerchant
        })
        .then((res) => {
          console.log(res)
          
          if(res.status === 201) {
            const response_msg = res.data.msg;
            const match = response_msg.match(/\d+$/);
    
            if (response_msg) {
              const user_ID = parseInt(match[0]);
              filteredFormData.user_id = user_ID;
            } else {
              console.log("No number found at the end of the string.");
            }
    
            setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully Please fill the KYC details`);
            const queryString = new URLSearchParams(filteredFormData).toString();
    
            setTimeout(() => {
              navigate(`/kyc?${queryString}`);
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error)

          if (error.response.status === 400) {
            setError(error.response.data.msg)

          } else if (error.response.data.msg === 'Password is not same Please try again') {
            setError('Password did not match please try again')
            
          } else {
            setError('')
          }
        });
      };

      // Method to check which account type user selected
      const handleSelectedAccountClick = (event, account) => {
        setSelectedAccountColor(account);
    
        if (account === 'merchant') {
          updateIsMerchant(true);
        } else {
          updateIsMerchant(false);
        }
      };


    return (
        <Container component="main" maxWidth="xl">
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} className="left-pane">
                    <CardMedia
                        component="img"
                        image="https://python-uat.oyefin.com/media/signup/authbackgroundpic.png"
                        alt="Logo"
                        className="logo"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Box display="flex" flexDirection="column" alignItems="center" marginBottom={2}>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign Up
                                </Typography>
                            </Box>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="first_name"
                                        label="First Name"
                                        name="first_name"
                                        autoComplete="fname"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="last_name"
                                        label="Last Name"
                                        name="last_name"
                                        autoComplete="lname"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
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
                                        id="contact_number"
                                        label="Phone Number"
                                        name="contact_number"
                                        autoComplete="tel"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="new-password"
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        style={{ backgroundColor: selectedAccountColor === 'user' ? '#008CCC' : '', cursor: 'pointer' }}
                                        onClick={(event) => { handleSelectedAccountClick(event, 'user'); }}
                                    >
                                    <Avatar src="https://python-uat.oyefin.com/media/signup/user.png" />
                                    <Typography variant="body2">User</Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        style={{ backgroundColor: selectedAccountColor === 'merchant' ? '#008CCC' : '', cursor: 'pointer' }}
                                        onClick={(event) => { handleSelectedAccountClick(event, 'merchant'); }}
                                    >
                                        <Avatar src="https://python-uat.oyefin.com/media/signup/merchant.png" />
                                        <Typography variant="body2">Merchant</Typography>
                                    </Box>
                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={disableRegisterButton}
                                style={{ marginTop: '20px' }}
                            >
                            Sign Up
                            </Button>

                            {error && <Typography color="error">{error}</Typography>}
                            {successMessage && <Typography color="teal">{successMessage}</Typography>}
                        </form>

                        <Box mt={2} display="flex" justifyContent="space-between">
                            <Typography variant="body2">
                                If you already have an account <Link to="/signin">LOGIN</Link>
                            </Typography>

                            <Typography variant="body2">
                                <Link to="/forgot-password">Forget password</Link>
                            </Typography>

                        </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    </Container>
    );
};
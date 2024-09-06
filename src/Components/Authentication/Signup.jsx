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
import LinearProgress from '@mui/joy/LinearProgress';
import {Typography as JoyTypography, Input as JoyInput, Stack as JoyStack,
    FormControl as JoyFormControl, FormLabel as JoyFormLabel, FormHelperText as JoyFormHelperText,
    Button as JoyButton
} from '@mui/joy';
import {Key as JoyKey} from '@mui/icons-material';




// User Signup Function
export default function Signup() {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        first_name: '',
        last_name: '',
        contact_number: '',
        otp: '',
        password: '',
        confirm_password: '',
      });
    
    const [formData, updateFormData] = useState(initialFormData);   // User form data state
    const [error, setError] = useState('');                         // Error Message state
    const [successMessage, setSuccessMessage] = useState('');       // Success Message state
    const [disableRegisterButton, setDisableRegisterButton] = useState(false);  // Disable button state
    const [selectedAccountColor, setSelectedAccountColor] = useState('');       // Highlight user type
    const [isMerchant, updateIsMerchant] = useState(false);                     // Merchant check state

    const [passwordvalue, setpasswordValue] = useState(''); // For Password
    const [confirmPasswordvalue, setConfirmPasswordValue] = useState(''); // For Password
    const [emailOtp, setEmailOTP] = useState(0);  // Email OTP state
    const [verfiedMail, setVerifiedMail] = useState(false);  // Email verification

    const minLength = 12;  // For Password

    const [emaildata, setEmailData] = useState({
        email: '',
        status: 'initial',
      });  // Email verification state

      // Method for email Verification
      const handleEmailVerificationSubmit = (event) => {
        event.preventDefault();

        setEmailData((current) => ({ ...current, status: 'loading' }));
        try {

            axiosInstance.get(`api/v1/send/user/email/?email=${emaildata.email}`).then((res)=> {
                if(res.status === 200 && res.data.success === true) {
                    setEmailData({ status: 'sent' });
                    setEmailOTP(res.data.otp)
                    setVerifiedMail(true);
                }
            })
        } catch (error) {
            setEmailData((current) => ({ ...current, status: 'failure' }));
        }
      };
    


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
    
        if (!verfiedMail) {
            setError("Please verify your email address");
        } else if (parseInt(formData.otp) != emailOtp) {
            setError('Incorrect OTP Entered')
        } else if (!formData.last_name) {
            setError("Please fill your Last Name");
        } else if (!formData.first_name) {
            setError("Please fill your First Name");
        } else if (!formData.contact_number) {
            setError("Please fill the contact number");
        } else if (formData.contact_number.length < 10) {
            setError("Mobile number must be 10 digits");
        } else if (!formData.password) {
            setError("Please fillup the password");
        } else if (formData.password.length < 10) {
            setError("Password must contain at least 10 characters");
        } else if (!selectedAccountColor) {
            setError("Please select User account type");
        } else if (!formData.confirm_password) {
            setError("Please fillup the confirm password");
        } else if (formData.password !== formData.confirm_password) {
            setError("Password did not match please correct the password");
        } else {
          setError('')
          setDisableRegisterButton(true);

          setTimeout(() => {
            setDisableRegisterButton(false);
          }, 4000);

          // Submit the Signup form through API
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

                setError('');
                setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully Please fill the KYC details`);
                const queryString = new URLSearchParams(filteredFormData).toString();
        
                setTimeout(() => {
                  window.location.href = `/kyc?${queryString}`
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
        }};

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
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            <JoyFormControl>
                                                <JoyFormLabel
                                                sx={(theme) => ({
                                                    '--FormLabel-color': theme.vars.palette.primary.plainColor,
                                                })}
                                                >
                                                Verify email
                                                </JoyFormLabel>

                                                <JoyInput
                                                    sx={{ '--Input-decoratorChildHeight': '45px' }}
                                                    placeholder="abc@mail.com"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={emaildata.email}
                                                    onChange={(event) => {setEmailData({ email: event.target.value, status: 'initial' }); handleChange(event); }}
                                                    error={emaildata.status === 'failure'}
                                                    endDecorator={
                                                        <JoyButton
                                                            variant="solid"
                                                            color="primary"
                                                            loading={emaildata.status === 'loading'}
                                                            type="submit"
                                                            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                                            onClick={handleEmailVerificationSubmit}
                                                            >
                                                            Verify Email
                                                        </JoyButton>
                                                    }
                                                />
                                                {emaildata.status === 'failure' && (
                                                <JoyFormHelperText
                                                    sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                                                >
                                                    Oops! something went wrong, please try again later.
                                                </JoyFormHelperText>
                                                )}

                                                {emaildata.status === 'sent' && (
                                                <JoyFormHelperText
                                                    sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
                                                >
                                                    Mail Sent
                                                </JoyFormHelperText>
                                                )}
                                            </JoyFormControl>

                                        </Grid>

                                        <Grid item xs={12} sm={5} sx={{mt: {xs:1, sm:3}}}>
                                            <TextField
                                                variant="outlined"
                                                type='number'
                                                required
                                                fullWidth
                                                id="otp"
                                                label="OTP"
                                                name="otp"
                                                autoComplete="otp"
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
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
                                    
                                    <JoyStack spacing={0.5} sx={{ '--hue': Math.min(passwordvalue.length * 10, 120) }}>
                                    <JoyInput
                                        type="password"
                                        variant="outlined"
                                        name="password"
                                        id="password"
                                        size='lg'
                                        fullWidth
                                        required
                                        placeholder="Password"
                                        startDecorator={<JoyKey />}
                                        onChange={(event) => {setpasswordValue(event.target.value); handleChange(event)}}
                                    />
                                    <LinearProgress
                                        determinate
                                        size="sm"
                                        value={Math.min((passwordvalue.length * 100) / minLength, 100)}
                                        sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
                                    />
                                    <JoyTypography
                                        level="body-xs"
                                        sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                                    >
                                        {passwordvalue.length < 3 && 'Very weak'}
                                        {passwordvalue.length >= 3 && passwordvalue.length < 6 && 'Weak'}
                                        {passwordvalue.length >= 6 && passwordvalue.length < 10 && 'Strong'}
                                        {passwordvalue.length >= 10 && 'Very strong'}
                                    </JoyTypography>
                                    </JoyStack>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <JoyStack spacing={0.5} sx={{ '--hue': Math.min(confirmPasswordvalue.length * 10, 120) }}>
                                        <JoyInput
                                            type="password"
                                            variant="outlined"
                                            name="confirm_password"
                                            id="confirm_password"
                                            size='lg'
                                            fullWidth
                                            required
                                            placeholder="Confirm Password"
                                            startDecorator={<JoyKey />}
                                            onChange={(event) => {setConfirmPasswordValue(event.target.value); handleChange(event)}}
                                        />
                                        <LinearProgress
                                            determinate
                                            size="sm"
                                            value={Math.min((confirmPasswordvalue.length * 100) / minLength, 100)}
                                            sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
                                        />
                                        <JoyTypography
                                            level="body-xs"
                                            sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                                        >
                                            {confirmPasswordvalue.length < 3 && 'Very weak'}
                                            {confirmPasswordvalue.length >= 3 && confirmPasswordvalue.length < 6 && 'Weak'}
                                            {confirmPasswordvalue.length >= 6 && confirmPasswordvalue.length < 10 && 'Strong'}
                                            {confirmPasswordvalue.length >= 10 && 'Very strong'}
                                        </JoyTypography>
                                    </JoyStack>
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
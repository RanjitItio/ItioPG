import { Button, Typography, Stack, Box, 
         TextField, Grid, Paper, Container } from "@mui/material";
import XIcon from '@mui/icons-material/X';
import Divider from '@mui/material/Divider';
import Input from '@mui/joy/Input';
import PreviewFooterSection from "./PreviewFooterSection";


// Currency Icon
const getStartDecorator = (currency) => {
    if (currency === 'USD') {
      return '$';
    } else if (currency === 'EUR') {
      return '€';
    } else if (currency === 'GBP') {
      return '£';
    } else if (currency === 'INR') {
        return '₹'
    } else if (currency === 'yen') {
        return '¥'
    } else {
      return '';
    }
  };


export default function ReviewCreate({...props}) {
    return (
        <>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">

        <Grid item xs={12} md={4}>
            <Button 
                variant={props.buttonVariant}
                startIcon={<XIcon />}
                sx={{
                    backgroundColor: (theme) => {
                        switch (props.buttonColor) {
                        case 'dark':
                            return '#0A0D54';
                        case 'light':
                            return theme.palette.common.white;
                        case 'outline':
                            return 'transparent';
                        case 'aqua':
                            return '#00BFFF'; 
                        case 'default':
                            return theme.palette.primary.main; 
                        default:
                            return theme.palette.primary.main;
                        }
                    },
                    color: (theme) => {
                        switch (props.buttonColor){
                            case 'dark':
                                return theme.palette.common.white
                            case 'default':
                                return theme.palette.common.white
                            case 'light':
                                return theme.palette.common.black
                            case 'aqua':
                                return theme.palette.common.white
                        }
                    },
                }} >

                <Stack direction="column">
                    <Typography>{props.buttonText}</Typography>
                    <Typography 
                        sx={{ 
                            fontSize: 9, 
                            color: (theme) => {
                                switch (props.buttonColor){
                                    case 'dark':
                                        return theme.palette.common.white
                                    case 'default':
                                        return theme.palette.common.white
                                    case 'light':
                                        return theme.palette.common.black
                                    case 'aqua':
                                        return theme.palette.common.white
                                }
                            } 
                        }}
                            >
                            Secured by Itio
                    </Typography>
                </Stack>
            </Button>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ height:480, borderRadius: '20px', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="p" sx={{ padding:'5%', marginLeft: '15%'}}>AMOUNT DETAILS</Typography>

                <Typography variant="subtitle1" sx={{ mb: 2, ml:2 }}>{props.BusinessName}</Typography>
                <Divider component="div" />

                {props.fixedAmountField && (
                    <>
                        <label style={{marginLeft: '10px', marginTop:'10px'}}>{props.FixedAmountLabel}</label>
                        <Input
                            fullWidth
                            label="Enter Amount"
                            value={props.amountFieldsData.fixedAmount}
                            startDecorator={getStartDecorator(props.currency)}
                            sx={{ mt: 1, width:'95%', ml:1 }}
                            disabled
                        />
                    </>
                )}

                {props.CustomerAmountField && (
                    <>
                        <label style={{marginLeft: '10px', marginTop:'10px'}}>{props.CustomerAmountLabel}</label>
                        <Input
                            fullWidth
                            startDecorator={getStartDecorator(props.currency2)}
                            sx={{ mt: 1, width:'95%', ml:1 }}
                            disabled
                        />
                    </>
                )}

                {/* <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 'auto'}}
                >
                    Next
                </Button> */}
                <PreviewFooterSection 
                   buttonText='Next'
                />
            </Paper>
        </Grid>


        {/* Third Column */}
        <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ height:480, borderRadius: '20px', display: 'flex', flexDirection: 'column'}}>
                <Typography variant="p" sx={{ padding:'5%', marginLeft: '15%'}}>CUSTOMER DETAILS</Typography>

                <Typography variant="subtitle1" sx={{ mb: 2, ml:2 }}>{props.BusinessName}</Typography>
                <Divider component="div" />

                <TextField
                    fullWidth
                    label={props.customerDetailFieldValue.email}
                    sx={{ mt: 2, width:'95%', ml:1 }}
                    disabled
                />

                <TextField
                    fullWidth
                    label={props.customerDetailFieldValue.phoneNo}
                    sx={{ mt: 2, width:'95%', ml:1 }}
                    disabled
                />

                {/* <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 'auto'}}
                >
                    Proceed To Pay
                </Button> */}
                <PreviewFooterSection 
                    buttonText='Proceed to pay'
                />
            </Paper>
        </Grid>

    </Grid>
    </Container>
        </>
    );
    
};
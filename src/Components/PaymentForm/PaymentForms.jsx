import React, { useState } from 'react';
import {
    Container, Grid, Typography, TextField,
    Button, MenuItem, Card, CardContent,
    Stepper, Step, StepLabel, Select,
    FormControl, InputLabel, Menu, Box, Stack
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@mui/icons-material/Add';
import XIcon from '@mui/icons-material/X';
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import AmountFields from './AmountFields';
import Input from '@mui/joy/Input';
import PreviewFooterSection from './PreviewFooterSection';
import ReviewCreate from './ReviewCreate';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';






const steps = ['Button Details', 'Amount Detail', 'Customer Details', 'Review and Create'];

// Amount Currency value in Preview section
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

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));


// Payment form
export default function PaymentForm() {
    const initialAmountFieldData = {
        fixedAmountLable: '',
        fixedAmount: 0,
        customerAmtLabel: '',
        customerAmount: 0,
    };

    const navigate = useNavigate();

    const [current, setCurrent]             = useState(0);     // Step position state
    const [fields, setFields]               = useState([{ type: '', label: '' }]); // Add new fields state
    const [buttonText, setButtonText]       = useState('Pay Now');  // Button text
    const [buttonColor, setButtonColor]     = useState('blue');  // Button Color
    const [buttonVariant, setButtonVariant] = useState('contained') // Button style

    const [fixedAmountField, setFixedAmountField]       = useState(false);    // Fixed amount field
    const [CustomerAmountField, setCustomerAmountField] = useState(false); // Customer decided amount
    const [firstStepData, updateFirstStepData]          = useState({title: '', businessName: ''})    // Button step state
    const [stepErorMessage, setStepErrorMessage]        = useState(true);   // Step wise fields error Message


    // Customer details fields state
    const [customerDetailFieldValue, updateCustomerDetailFieldValue] = useState({email:'Email', phoneNo:'Phone Number'})

    // Amount detail fields state
    const [amountFieldsData, updateAmoutFieldsData] = useState(initialAmountFieldData);

    // Amount field step Currencies
    const [currency, setCurrency] = useState(null);  // Fixed amount currency
    const [currency2, setCurrency2] = useState(null);  // Customer decided amount currency
    

    // Forward to Next step
    const next = () => {
        // First step checks
        if (current === 0) {
            if (firstStepData.title === '') {
                setStepErrorMessage('Please type your form title')
            } else {
                setStepErrorMessage('')
                setCurrent(current + 1)
            }
            // Second step checks
        } else if (current === 1) {
            if (fixedAmountField === false && CustomerAmountField === false) {
                setStepErrorMessage('Please select one amount field')
            }  else if (fixedAmountField && amountFieldsData.fixedAmount === '') {
                setStepErrorMessage('Please type fixed amount')
            } else if (fixedAmountField && CustomerAmountField && currency !== currency2) {
                setStepErrorMessage('Both the currency should be same')
            } else if (fixedAmountField && CustomerAmountField && amountFieldsData.fixedAmountLable === amountFieldsData.customerAmtLabel) {
                setStepErrorMessage('Please provide different labels')
            } else if (fixedAmountField && !currency) {
                setStepErrorMessage('Please select Currency')
            } else if (CustomerAmountField && !currency2) {
                setStepErrorMessage('Please select Currency')

            } else if (fixedAmountField === true && CustomerAmountField === true) {
                setStepErrorMessage('Please select only one Field')
            }else {
                setStepErrorMessage('')
                setCurrent(current + 1);
            }
        } else {
            setStepErrorMessage('')
            setCurrent(current + 1);
        };
    };

    // Previous Step 
    const prev = () => {
        setCurrent(current - 1);
    };

    // Add new Customer detail fields
    const handleAddField = () => {
        setFields([...fields, { type: '', label: '' }]);
    };

    // Method to handle customer details field value change
    const handleFieldChange = (index, event) => {
        const newFields = fields.map((field, idx) => {
            if (index === idx) {
                return { ...field, [event.target.name]: event.target.value };
            }
            return field;
        });
        setFields(newFields);
    };


    // Method to capture the value of Customer detail step
    const handleCustomerDetailFieldValueChange = (e)=> {
        updateCustomerDetailFieldValue({...customerDetailFieldValue, 
            [e.target.name]: e.target.value
        })
    };


    // Button name text field change method
    const handleFirstStepFieldChange = (e)=> {
        if (e.target.name === 'buttonLabel') {
            setButtonText(e.target.value)
        }
        if (e.target.name === 'buttonColor') {
            setButtonColor(e.target.value)
            if (e.target.value == 'outline') {
                setButtonVariant('outlined')
            }
        }
    };

    // Method to check which amount field clicked by user
    const handleAmountFieldClicked = (selectedAmountField)=> {
        if (selectedAmountField === 'Fixed Amount') {
            setFixedAmountField(true);
        } else if (selectedAmountField === 'Customer Decided Amount') {
            setCustomerAmountField(true);
        } 
    };

    // First step values
    const handleFirstStepChange = (e)=> {
        updateFirstStepData({...firstStepData,
            [e.target.name]: e.target.value
        })
    };

    
    // Method to Create new Form for merchant
    const handleCreateForm = ()=> {
        if (firstStepData.title === '') {
            setStepErrorMessage('Please type your form title')
        } else if (fixedAmountField === false && CustomerAmountField === false) {
            setStepErrorMessage('Please select one amount field')
        }  else if (fixedAmountField && amountFieldsData.fixedAmount === '') {
            setStepErrorMessage('Please type fixed amount')
        } else if (fixedAmountField && CustomerAmountField && currency !== currency2) {
            setStepErrorMessage('Both the currency should be same')
        } else {
            setStepErrorMessage('')

            axiosInstance.post(`api/merchant/payment/button/`, {
                buttonTitle:         firstStepData.title,
                buttonLabel:         buttonText,
                buttonColor:         buttonColor,
                buttonBGColor:       buttonColor,
                businessName:        firstStepData.businessName,

                isFixedAmount:       fixedAmountField,
                fixedAmountLabel:    amountFieldsData.fixedAmountLable,
                fixedAmount:         parseInt(amountFieldsData.fixedAmount),
                fixedAmtCurr:        currency,

                isCustomerAmt:       CustomerAmountField,
                customerAmountLabel: amountFieldsData.customerAmtLabel,
                customerAmount:      parseInt(amountFieldsData.customerAmount),
                customerAmtCurr:     currency2,

                customerEmailLabel:  customerDetailFieldValue.email,
                customerPhoneLabel:  customerDetailFieldValue.phoneNo
    
            }).then((res)=> {
                console.log(res)
    
                if (res.status === 200 && res.data.success === true && res.data.message === 'Button created successfully') {
                    alert('Payment Button Created successfully')

                    setTimeout(() => {
                        navigate('/merchant/payment/forms/')
                    }, 1000);
                };
    
            }).catch((error)=> {
                console.log(error)
    
            })
        };
    };


    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}>
                    <Stepper activeStep={current} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item xs={12} sm={12} md={current === 3 ? 9 : 6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{steps[current]}</Typography>

                            <form>
                                {/* First Step */}
                                {current === 0 && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            placeholder="For dashboard use, not visible to customers"
                                            margin="normal"
                                            name='title'
                                            value={firstStepData.title}
                                            onChange={handleFirstStepChange}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Business Name"
                                            placeholder="Will be visible to customers"
                                            margin="normal"
                                            name='businessName'
                                            value={firstStepData.businessName}
                                            onChange={handleFirstStepChange}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Button Label"
                                            placeholder="This label is shown to your customers"
                                            margin="normal"
                                            name='buttonLabel'
                                            value={buttonText}
                                            onChange={handleFirstStepFieldChange}
                                        />

                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Button Theme</InputLabel>
                                            <Select 
                                                defaultValue="dark" 
                                                onChange={handleFirstStepFieldChange}
                                                name='buttonColor'
                                                >
                                                <MenuItem value="default">Default</MenuItem>
                                                <MenuItem value="dark">Dark</MenuItem>
                                                <MenuItem value="light">Light</MenuItem>
                                                <MenuItem value="outline">Outline</MenuItem>
                                                <MenuItem value="aqua">Aqua</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                )}

                                {/* Second Step */}
                                {current === 1 && (
                                    <>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button 
                                                variant="outlined" 
                                                {...bindTrigger(popupState)}
                                                sx={{marginTop:'4%'}}
                                                startIcon={<AddIcon />}
                                                >
                                                Add Amount Field
                                            </Button>

                                            <Menu {...bindMenu(popupState)}>
                                                <HtmlTooltip 
                                                    title={
                                                        <React.Fragment>
                                                            <Typography color="inherit">Fixed Amount</Typography>
                                                            <em>{"Add a field which contains the price value which customer should pay."}</em>
                                                        </React.Fragment>
                                                    } 
                                                    placement="right-start">
                                                    <MenuItem onClick={()=> {popupState.close(); handleAmountFieldClicked('Fixed Amount')}}>Fixed Amount</MenuItem>
                                                </HtmlTooltip>

                                                <HtmlTooltip
                                                    title={
                                                        <React.Fragment>
                                                            <Typography color="inherit">Customer Decided Amount</Typography>
                                                            <em>{"Add a free field which helps customer to fill a amount which they wish to pay."}</em>
                                                        </React.Fragment>
                                                    } 
                                                    placement="right-start">
                                                    <MenuItem onClick={()=> {popupState.close(); handleAmountFieldClicked('Customer Decided Amount')}}>Customer Decided Amount</MenuItem>
                                                </HtmlTooltip>

                                                {/* <HtmlTooltip 
                                                    title={
                                                        <React.Fragment>
                                                            <Typography color="inherit">Item With Quantity</Typography>
                                                            <em>{"Add a price field with quantity selection widget to facilitate to purchase multiple quantities."}</em>
                                                        </React.Fragment>
                                                    } 
                                                    placement="right-start">
                                                    <MenuItem onClick={()=> {popupState.close(); handleAmountFieldClicked('Item With Quantity')}}>Item With Quantity</MenuItem>
                                                </HtmlTooltip> */}
                                            </Menu>

                                    {/* Amount Fields */}
                                    <AmountFields 
                                        fixedAmountField={fixedAmountField}
                                        CustomerAmountField={CustomerAmountField}
                                        setFixedAmountField={setFixedAmountField}
                                        setCustomerAmountField={setCustomerAmountField}
                                        amountFieldsData={amountFieldsData}
                                        updateAmoutFieldsData={updateAmoutFieldsData}
                                        currency={currency}
                                        setCurrency={setCurrency}
                                        currency2={currency2}
                                        setCurrency2={setCurrency2}
                                    />

                                            </React.Fragment>

                                    )}
                                </PopupState>
                                    </>
                                )}

                                {/* 3rd Step */}
                                {current === 2 && (

                                    <>
                                    <Typography variant="subtitle1" gutterBottom>
                                            Customers will fill this form before making the final payment
                                    </Typography>

                                    <Card>
                                    <CardContent>
                                        {fields.map((field, index) => (
                                            <Grid container spacing={2} key={index}>

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel id="demo-simple-select-label">Email</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        defaultValue='Email'
                                                        label="Email"
                                                        fullWidth
                                                        disabled
                                                        >
                                                        <MenuItem value='Email'>Email</MenuItem>
                                                        <MenuItem value='Text'>Text</MenuItem>
                                                        <MenuItem value='Number'>Number</MenuItem>
                                                    </Select>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Field Label"
                                                        name="email"
                                                        value={customerDetailFieldValue.email}
                                                        onChange={handleCustomerDetailFieldValueChange}
                                                        margin="normal"
                                                        sx={{mt:3}}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <InputLabel id="demo-simple-select-label">Phone Number</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        defaultValue='Number'
                                                        label="Phone Number"
                                                        fullWidth
                                                        disabled
                                                        >
                                                        <MenuItem value='Email'>Email</MenuItem>
                                                        <MenuItem value='Text'>Text</MenuItem>
                                                        <MenuItem value='Number'>Number</MenuItem>
                                                    </Select>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Field Label"
                                                        name="phoneNo"
                                                        value={customerDetailFieldValue.phoneNo}
                                                        onChange={handleCustomerDetailFieldValueChange}
                                                        margin="normal"
                                                        sx={{mt:3}}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                        {/* <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddField}
                                            style={{ marginTop: '20px' }}
                                        >
                                            + Add Another Input Field
                                        </Button> */}
                                    </CardContent>
                                </Card>
                                </>
                                )}

                                {/* 4th Step */}
                                {current === 3 && (
                                    <ReviewCreate 
                                        buttonVariant={buttonVariant}
                                        buttonColor={buttonColor}
                                        buttonText={buttonText}
                                        fixedAmountField={fixedAmountField}
                                        CustomerAmountField={CustomerAmountField}
                                        currency={currency}
                                        currency2={currency2}
                                        amountFieldsData={amountFieldsData}
                                        customerDetailFieldValue={customerDetailFieldValue}
                                        BusinessName={firstStepData.businessName}
                                        FixedAmountLabel={amountFieldsData.fixedAmountLable}
                                        CustomerAmountLabel={amountFieldsData.customerAmtLabel}
                                    />
                                )}


                                {/* Add similar form fields for other steps here */}
                                <div style={{ marginTop: '20px' }}>
                                    <p style={{color:'red'}}>{stepErorMessage}</p>

                                    {current > 0 && (
                                        <Button variant="contained" onClick={prev} style={{ marginRight: '8px' }}>
                                            Previous
                                        </Button>
                                    )}
                                    {current < steps.length - 1 && (
                                        <Button variant="contained" color="primary" onClick={next}>
                                            Next
                                        </Button>
                                    )}
                                    {current === steps.length - 1 && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCreateForm()}
                                        >
                                            Create Form
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Preview Section */}
                {current !== 3 && (
                <Grid item xs={12} sm={12} md={3}>
                    <Card sx={{height: '120%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{mb:4}}>Preview</Typography>

                            {/* First Preview */}
                            {current === 0 && (
                                <>
                                    {/* Preview Button */}
                                    
                                    <Button 
                                        variant={buttonVariant}
                                        startIcon={<XIcon />}
                                        sx={{
                                            backgroundColor: (theme) => {
                                                switch (buttonColor) {
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
                                                switch (buttonColor){
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
                                        }} fullWidth>

                                        <Stack direction="column">
                                            <Typography>{buttonText}</Typography>
                                            <Typography 
                                                sx={{ 
                                                    fontSize: 9, 
                                                    color: (theme) => {
                                                        switch (buttonColor){
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
                                    {/* Preview Button Ends */}
                                </>
                            )}

                            {current === 1 && (
                    
                                <Box>
                                    {fixedAmountField && (
                                        <>
                                            <label>{amountFieldsData.fixedAmountLable}</label>
                                            <Input
                                                type="text"
                                                value={amountFieldsData.fixedAmount}
                                                placeholder="Type in here…"
                                                startDecorator={getStartDecorator(currency)}
                                                sx={{mb:1}}
                                                disabled
                                            />
                                        </>
                                    )}

                                    {CustomerAmountField && (
                                        <>
                                            <label>{amountFieldsData.customerAmtLabel}</label>
                                            <Input
                                                type="text"
                                                placeholder="Type in here…"
                                                startDecorator={getStartDecorator(currency2)}
                                                sx={{mb:1}}
                                                disabled
                                            />
                                        </>
                                    )}

                                    {/* {ItemQAmountField && (
                                        <Input
                                            type="text"
                                            placeholder="Type in here…"
                                            startDecorator={<AttachMoneyIcon />}
                                        />
                                    )} */}
                                    
                                </Box>
                            )}

                            {current === 2 && (
                                <>
                                <TextField
                                    fullWidth
                                    label={customerDetailFieldValue.email}
                                    name="label"
                                    margin="normal"
                                    disabled
                                />
                                <TextField
                                    fullWidth
                                    label={customerDetailFieldValue.phoneNo}
                                    name="label"
                                    margin="normal"
                                    disabled
                                />
                                </>
                            )}
                            
                        </CardContent>

                        {/* Footer Section */}
                        <PreviewFooterSection  />
                        {/* Footer Section */}

                    </Card>
                </Grid>
                )}
            </Grid>
        </Container>
    );
}




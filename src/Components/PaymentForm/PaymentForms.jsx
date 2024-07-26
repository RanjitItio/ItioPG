import React, { useState } from 'react';
import {
    Container, Grid, Typography, TextField,
    Button, MenuItem, Card, CardContent,
    Stepper, Step, StepLabel, Select,
    FormControl, InputLabel, Menu
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@mui/icons-material/Add';
import XIcon from '@mui/icons-material/X';
import Tooltip, { tooltipClasses }  from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



const steps = ['Button Details', 'Amount Detail', 'Customer Details', 'Review and Create'];


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
    const [current, setCurrent] = useState(0);     // Step position state
    const [fields, setFields] = useState([{ type: '', label: '' }]); // Add new fields state
    const [buttonText, setButtonText] = useState('Pay Now');  // Button text
    const [buttonColor, setButtonColor] = useState('blue');  // Button Color
    const [buttonVariant, setButtonVariant] = useState('contained')


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleAddField = () => {
        setFields([...fields, { type: '', label: '' }]);
    };

    const handleFieldChange = (index, event) => {
        const newFields = fields.map((field, idx) => {
            if (index === idx) {
                return { ...field, [event.target.name]: event.target.value };
            }
            return field;
        });
        setFields(newFields);
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

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Stepper activeStep={current} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{steps[current]}</Typography>

                            <form>
                                {current === 0 && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            placeholder="For dashboard use, not visible to customers"
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            label="Button Label"
                                            placeholder="This label is shown to your customers"
                                            margin="normal"
                                            name='buttonLabel'
                                            onChange={handleFirstStepFieldChange}
                                        />

                                        {/* <FormControl fullWidth margin="normal">
                                            <InputLabel>Button Type</InputLabel>
                                            <Select defaultValue="Donations Button">
                                                <MenuItem value="Donations Button">Donations Button</MenuItem>
                                            </Select>
                                        </FormControl> */}

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
                                                        <MenuItem onClick={popupState.close}>Fixed Amount</MenuItem>
                                                    </HtmlTooltip>

                                                    <HtmlTooltip
                                                        title={
                                                            <React.Fragment>
                                                                <Typography color="inherit">Customer Decided Amount</Typography>
                                                                <em>{"Add a free field which helps customer to fill a amount which they wish to pay."}</em>
                                                            </React.Fragment>
                                                        } 
                                                        placement="right-start">
                                                        <MenuItem onClick={popupState.close}>Customer Decided Amount</MenuItem>
                                                    </HtmlTooltip>

                                                    <HtmlTooltip 
                                                        title={
                                                            <React.Fragment>
                                                                <Typography color="inherit">Item With Quantity</Typography>
                                                                <em>{"Add a price field with quantity selection widget to facilitate to purchase multiple quantities."}</em>
                                                            </React.Fragment>
                                                        } 
                                                        placement="right-start">
                                                        <MenuItem onClick={popupState.close}>Item With Quantity</MenuItem>
                                                    </HtmlTooltip>
                                                    
                                                </Menu>
                                                </React.Fragment>
                                            )}
                                        </PopupState>
                                    </>
                                )}

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
                                                    <TextField
                                                        fullWidth
                                                        label="Field Type"
                                                        name="type"
                                                        value={field.type}
                                                        onChange={(event) => handleFieldChange(index, event)}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Field Label"
                                                        name="label"
                                                        value={field.label}
                                                        onChange={(event) => handleFieldChange(index, event)}
                                                        margin="normal"
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddField}
                                            style={{ marginTop: '20px' }}
                                        >
                                            + Add Another Input Field
                                        </Button>
                                    </CardContent>
                                </Card>
                                </>
                                )}

                                {/* Add similar form fields for other steps here */}
                                <div style={{ marginTop: '20px' }}>
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
                                            onClick={() => alert('Processing complete!')}
                                        >
                                            Done
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Card sx={{height: '90%'}}>
                        <CardContent>
                            <Typography variant="h6" sx={{mb:4}}>Preview</Typography>

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
                                {buttonText}
                            </Button>
                            {/* Preview Button Ends */}
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}




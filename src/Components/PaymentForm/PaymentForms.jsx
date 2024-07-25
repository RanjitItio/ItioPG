import React, { useState } from 'react';
import {
    Container, Grid, Typography, TextField,
    Button, MenuItem, Card, CardContent,
    Stepper, Step, StepLabel, Select,
    FormControl, InputLabel, Menu
} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import AddIcon from '@mui/icons-material/Add';



const steps = ['Button Details', 'Amount Detail', 'Customer Details', 'Review and Create'];



// Payment form
export default function PaymentForm() {
    const [current, setCurrent] = useState(0);
    const [fields, setFields] = useState([{ type: '', label: '' }]);

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
                                        />

                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Button Type</InputLabel>
                                            <Select defaultValue="Donations Button">
                                                <MenuItem value="Donations Button">Donations Button</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>Button Theme</InputLabel>
                                            <Select defaultValue="Razorpay Dark">
                                                <MenuItem value="Dark">Dark</MenuItem>
                                                <MenuItem value="Light">Light</MenuItem>
                                                <MenuItem value="Outline">Outline</MenuItem>
                                                <MenuItem value="Aqua">Aqua</MenuItem>
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
                                                    Dashboard
                                                </Button>

                                                <Menu {...bindMenu(popupState)}>
                                                    <MenuItem onClick={popupState.close}>Fixed Amount</MenuItem>
                                                    <MenuItem onClick={popupState.close}>Customer Decided Amount</MenuItem>
                                                    <MenuItem onClick={popupState.close}>Item With Quantity</MenuItem>
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
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Preview</Typography>
                            <Button variant="contained" color="primary" fullWidth>
                                Donate Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}




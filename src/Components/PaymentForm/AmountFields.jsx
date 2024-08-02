import Input from '@mui/joy/Input';
import Divider from '@mui/joy/Divider';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';





export default function AmountFields({...props}) {

    // Method to disappear the Fields
    const handleCancelButtonClicked = (butonName)=> {
        if (butonName === 'Fixed Amount') {
            props.setFixedAmountField(false);
        } else if (butonName === 'Customer Decided Amount') {
            props.setCustomerAmountField(false)
        } else if (butonName === 'Item with Quantity') {
            props.setItemQAmountField(false)
        };
    };

    // Method to handle amount fileds Form Values
    const handleFormChange = (e)=> {
        props.updateAmoutFieldsData({...props.amountFieldsData,
            [e.target.name]: e.target.value
        })
    };


    return (
        <>
        {/* First Amount field Items */}
        {props.fixedAmountField && (
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} sm={5} md={5} >
                    <label>Field Label</label>
                    <Input
                        placeholder="Enter Field Label"
                        name='fixedAmountLable'
                        value={props.amountFieldsData.fixedAmountLable}
                        onChange={handleFormChange}
                        sx={{
                        '&::before': {
                            display: 'none',
                        },
                        '&:focus-within': {
                            outline: '2px solid var(--Input-focusedHighlight)',
                            outlineOffset: '2px',
                        },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={5} >
                    <label>Value</label>
                    <Input
                        placeholder="0.00"
                        name='fixedAmount'
                        value={props.amountFieldsData.fixedAmount}
                        onChange={handleFormChange}
                        startDecorator={{ USD: '$', yen: '¥', INR: '₹', EUR: '€', GBP: '£' }[props.currency]}
                        endDecorator={
                        <React.Fragment>
                            <Divider orientation="vertical" />
                            <Select
                            variant="plain"
                            value={props.currency}
                            onChange={(_, value) => props.setCurrency(value)}
                            slotProps={{
                                listbox: {
                                variant: 'outlined',
                                },
                            }}
                            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                            >
                                <Option value="USD">US dollar</Option>
                                <Option value="EUR">EURO</Option>
                                <Option value="yen">Japanese yen</Option>
                                <Option value="GBP">GBP</Option>
                                <Option value="INR">INR</Option>
                            </Select>
                        </React.Fragment>
                        }
                        sx={{ width: '100%' }}
                    />
                </Grid>

                <Grid item xs={12} sm={1} md={2} >
                    <IconButton aria-label="Example" sx={{float:'right', mt:{xs:-2, sm:-2, md:3}}} onClick={()=> {handleCancelButtonClicked('Fixed Amount')}}>
                        <CancelIcon />
                    </IconButton>
                </Grid>
          </Grid>
            
        )}

        {/* Second Amount field Items */}
        {props.CustomerAmountField && (
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid item xs={12} sm={5} md={5} >

                    <label>Field Label</label>
                    <Input
                        placeholder="Enter Field Label"
                        name='customerAmtLabel'
                        onChange={handleFormChange}
                        sx={{
                        '&::before': {
                            display: 'none',
                        },
                        '&:focus-within': {
                            outline: '2px solid var(--Input-focusedHighlight)',
                            outlineOffset: '2px',
                        },
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={5} >
                    <label>Value</label>
                    <Input
                        placeholder="0.00"
                        name='customerAmount'
                        value={''}
                        startDecorator={{ USD: '$', yen: '¥', INR: '₹', EUR: '€', GBP: '£' }[props.currency2]}
                        endDecorator={
                        <React.Fragment>
                            <Divider orientation="vertical" />
                            <Select
                            variant="plain"
                            value={props.currency2}
                            onChange={(_, value) => props.setCurrency2(value)}
                            slotProps={{
                                listbox: {
                                variant: 'outlined',
                                },
                            }}
                            sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
                            >
                                <Option value="USD">US dollar</Option>
                                <Option value="EUR">EURO</Option>
                                <Option value="yen">Japanese yen</Option>
                                <Option value="GBP">GBP</Option>
                                <Option value="INR">INR</Option>
                            </Select>
                        </React.Fragment>
                        }
                        sx={{ width: '100%' }}
                    />
                    <small style={{fontSize:10}}>To be Filled by Customer</small>
                </Grid>

                <Grid item xs={12} sm={1} md={2} >
                    <IconButton aria-label="Example" sx={{float:'right', mt:{xs:-2, sm:-2, md:3}}} onClick={()=> {handleCancelButtonClicked('Customer Decided Amount')}}>
                        <CancelIcon />
                    </IconButton>
                </Grid>
            </Grid>
        )}

    </>
    );
};
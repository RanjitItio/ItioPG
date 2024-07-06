import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import OnSeriesItemClick from './Charts/PieChart';



function ExpenseCategory(){

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    return (
        <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ overflow: 'auto', maxHeight: '18rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div">
                        <b>Expense Category</b>
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="inherit"
                            endIcon={<ArrowDropDownIcon />}
                            onClick={handleClick}
                        >
                            Duration
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Monthly</MenuItem>
                            <MenuItem onClick={handleClose}>Annually</MenuItem>
                        </Menu>

                    </Box>
                </Box>

                <Box sx={{ marginTop: 2 }}>
                {/* <OnSeriesItemClick /> */}
                </Box>
                
            </CardContent>
        </Card>

    );
};



export default ExpenseCategory;


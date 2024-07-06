import React from 'react';
import { Card, CardContent, Typography, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';




function Currency(){ 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCurrency, setSelectedCurrency] = React.useState('CNY');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (currency) => {
        setAnchorEl(null);
        setSelectedCurrency(currency);
    };


    return (
        <Card className="shadow" sx={{ width: '100%', height: '100%' }}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" component="div"><b>Currency</b></Typography>
                    <div>
                        <Button
                            variant="outlined"
                            onClick={handleClick}
                            endIcon={<ArrowDropDownIcon />}
                        >
                            {selectedCurrency}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleClose(selectedCurrency)}
                        >
                            <MenuItem onClick={() => handleClose('CNY')}>CNY</MenuItem>
                            <MenuItem onClick={() => handleClose('USD')}>USD</MenuItem>
                            <MenuItem onClick={() => handleClose('Rupaiah')}>Rupaiah</MenuItem>
                        </Menu>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};



export default Currency;


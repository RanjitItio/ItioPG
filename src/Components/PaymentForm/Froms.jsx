import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
        AppBar, Tabs, Tab, Box, 
        TextField, MenuItem, Button,
        Table, TableBody, TableCell, 
        TableContainer, TableHead, 
        TableRow, Paper, Link, Chip, 
        Typography, Grid
    } from '@mui/material';




const statuses = [
    { value: 'All', label: 'All' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
];



// All Payment form pages
export default function AllPaymentForms() {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 3 }}>
            <AppBar position='static' color='transparent'>
                <Tabs value={0} sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <Tab label="Payment Forms" />
                <Tab label='Documentation' sx={{ marginLeft: '60.5%' }} />
                <Tab 
                    label='Create Payment Button' 
                    sx={{
                    backgroundColor: 'primary.main',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: 'primary.dark',
                    },
                    }}
                    onClick={()=> {navigate('/merchant/payment/form/steps/')}}
                />
                </Tabs>
            </AppBar>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField label="Title" variant="outlined" size="small" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        label="Status"
                        select
                        variant="outlined"
                        size="small"
                        value="All"
                        fullWidth
                    >
                        {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField label="Count" variant="outlined" size="small" type="number" defaultValue={25} fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="contained" color="primary" fullWidth>Search</Button>
                </Grid>

                {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="outlined" fullWidth>Clear</Button>
                </Grid> */}
            </Grid>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Total Sales</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Units Sold</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Link href="#">Church Inauguration</Link>
                            </TableCell>

                            <TableCell>₹ 0.00</TableCell>

                            <TableCell>Amount</TableCell>

                            <TableCell>0</TableCell>

                            <TableCell>25 Jul 2024, 02:29:48 pm</TableCell>

                            <TableCell>
                                <Chip label="Active" color="primary" />
                            </TableCell>

                            <TableCell>
                                <Link href="#">GET BUTTON CODE</Link>
                            </TableCell>

                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>

            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                Showing 1 - 1
            </Typography>

        </Box>
    );
}



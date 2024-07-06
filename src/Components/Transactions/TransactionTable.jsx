import React, { useState } from 'react';
import {
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  TextField, MenuItem, Select, InputLabel, FormControl, Collapse, Box, Grid,
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FilterListIcon from '@mui/icons-material/FilterList';




const transactions = [
  { invoice: 'B12341', name: 'Figma Pro', business: 'Software', transactionType: 'Subscribe', date: 'October 20, 2022', amount: -32, status: 'Success' },
  { invoice: 'B32345', name: 'Fiverr International', business: 'Freelance platform', transactionType: 'Receive', date: 'November 01, 2022', amount: 100, status: 'Pending' },
  { invoice: 'B12341', name: 'Adobe', business: 'Software', transactionType: 'Subscribe', date: 'October 20, 2022', amount: -32, status: 'Canceled' },
  { invoice: 'B12341', name: 'Starbucks', business: 'Freelance platform', transactionType: 'Receive', date: 'November 01, 2022', amount: 100, status: 'Pending' },
  { invoice: 'B12341', name: 'Figma Pro', business: 'Software', transactionType: 'Subscribe', date: 'October 20, 2022', amount: -32, status: 'Success' },
];




// All Business Transaction Data
export default function BusinessTransactionTable () {

  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  return (

    <Box sx={{zIndex: 0, marginTop: -8, padding: 4}}>
    <Card>

      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        <TextField placeholder="Search for transaction here" variant="outlined" size="small" />
        <Box>
          <Button variant="contained" onClick={handleFilterClick} startIcon={<FilterListIcon />}>
            Filter
          </Button>

          <Button variant="contained" style={{ marginLeft: 10 }}>
            Export
          </Button>

        </Box>
      </Box>

        <Collapse in={filterOpen}>
            <Box p={1}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={age}
                        label="Transaction Type"
                        // onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={age}
                        label="Business Type"
                        // onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TextField 
                          type="date" 
                          label="Date Range" 
                          variant="outlined" 
                          size="medium" 
                          InputLabelProps={{ shrink: true }} 
                          sx={{width: {xs: '100%', sm: '95%',md:'80%'}, marginBottom: {xs: 2}}}
                          />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl sx={{width: {xs: '100%', sm: '95%',md:'80%'}}} size='medium'>
                            <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            // value={age}
                            label="Business Type"
                            // onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>With label + helper text</FormHelperText>
                        </FormControl>
                </Grid>
            </Grid>
            </Box>
        </Collapse>

        <TableContainer style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto'}}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Sl No.</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell><b>Business Name</b></TableCell>
                        <TableCell><b>Payer</b></TableCell>
                        <TableCell><b>Method</b></TableCell>
                        <TableCell><b>Order ID</b></TableCell>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Fee</b></TableCell>
                        <TableCell><b>Total</b></TableCell>
                        <TableCell><b>Currency</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                        <TableCell>{transaction.invoice}</TableCell>
                        <TableCell>
                        <Box display="flex" alignItems="center">
                            <img src={`/path/to/logo/${transaction.name}.png`} alt={transaction.name} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Box>
                                <div>{transaction.name}</div>
                                <div style={{ color: 'gray', fontSize: 'small' }}>{transaction.business}</div>
                            </Box>
                        </Box>

                        </TableCell>
                        <TableCell>{transaction.transactionType}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `+$${transaction.amount}`}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell>
                        <IconButton>
                            <i className="far fa-eye"></i>
                        </IconButton>
                        <IconButton>
                            <i className="far fa-trash-alt"></i>
                        </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>

    </Card>
    </Box>
  );
};



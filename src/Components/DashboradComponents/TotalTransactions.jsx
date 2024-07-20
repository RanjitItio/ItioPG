import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, Grid, Select,
        MenuItem, FormControl, InputLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import TransactionLineChart from './LineChart';







export default function TotalTransactions() {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
        <Card 
            style={{ 
                // maxWidth: "30rem", 
                height: "100%",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", 
                "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" 
                },
                border: '1px solid black'
            }}>
        <CardContent style={{ overflow: "auto", maxHeight: "18rem" }}>
            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h5" component="div">Total Transactions</Typography>
                </Grid>

                <Grid item xs={4} textAlign="right">
                    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Today</MenuItem>
                            <MenuItem value={20}>Last 7 Days</MenuItem>
                            <MenuItem value={30}>This Month</MenuItem>
                            <MenuItem value={30}>Last Month</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <IconButton aria-label="delete">
                        <NorthEastIcon fontSize='small'/>
                    </IconButton>
                </Grid>

            </Grid>
            
            <Typography>Transaction Amount $8,527,224</Typography>

            <TransactionLineChart />
            
        </CardContent>

    </Card>
    </>
    );
};
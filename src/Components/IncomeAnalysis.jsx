import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography } from '@mui/material';








function IncomeAnalysis(){
    return (
        
        <Card className="shadow" style={{ maxWidth: "30rem", height: "100%" }}>
        <CardContent style={{ overflow: "auto", maxHeight: "18rem" }}>
            <Typography variant="h5" component="div"><b>Income Analysis</b></Typography>
            <Typography variant="h4" className="mb-2"><b>$8,527,224</b></Typography>
            <Typography variant="body1">VS This Month</Typography>

            <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
                />
        </CardContent>
    </Card>

    );
};



export default IncomeAnalysis;
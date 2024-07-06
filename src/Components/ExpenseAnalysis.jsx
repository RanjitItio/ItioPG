import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';



function ExpenseAnalysis(){
    
    return (
        <Card className="shadow" style={{ maxWidth: "30rem", height: "100%" }}>
            <CardContent style={{ overflow: "auto", maxHeight: "18rem" }}>
                <Typography variant="h5" component="div"><b>Expense Analysis</b></Typography>
                <Typography variant="h4" className="mb-2"><b>$2,056,123</b></Typography>
                <Typography variant="body1">VS This Month</Typography>

                <div style={{ height: 200 }}>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                        height={200}
                        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                        grid={{ vertical: true, horizontal: true }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};



export default ExpenseAnalysis;


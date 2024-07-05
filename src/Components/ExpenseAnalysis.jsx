import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';



function ExpenseAnalysis(){
    
    return (
        <div className="card shadow h-100" style={{maxWidth: "30rem"}}>
            <div className="card-body" style={{overflow: "auto", maxHeight: "18rem"}}>
                <h5 className="card-title"><b>Expense Analysis</b></h5>
                {/* <br></br> */}
                <h4 className="card-subtitle mb-2 text"><b>$2,056,123</b></h4>
                <p className="card-text">VS This Month</p>

                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    height={200}
                    margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                    grid={{ vertical: true, horizontal: true }}
                    />
                {/* <img src="../src/images/graph.png" alt="" className='img-fluid'/> */}
            
            </div>
        </div>
    )
}



export default ExpenseAnalysis;


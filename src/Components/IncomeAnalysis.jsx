import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';



const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];


function IncomeAnalysis(){
    return (
        
        <div className="card shadow h-100" style={{maxWidth: "30rem"}}>
            <div className="card-body" style={{overflow: "auto", maxHeight: "18rem"}}>
                <h5 className="card-title"><b>Income Analysis</b></h5>
                &nbsp;
                <h4 className="card-subtitle mb-2 text"><b>$8,527,224</b></h4>
                <p className="card-text">VS This Month</p>
                <BarChart
                    width={400}
                    height={230}
                    series={[
                    { data: pData, label: 'pv', id: 'pvId' },
                    { data: uData, label: 'uv', id: 'uvId' },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                />
                {/* <img src="../src/images/BarChart.png" alt="" className='img-fluid'/> */}
            </div>
        </div>
    )
}



export default IncomeAnalysis;
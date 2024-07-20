import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';



export default function TransactionLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      // width={850}
      height={200}
    />
  );
}
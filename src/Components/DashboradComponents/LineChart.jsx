import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';



export default function TransactionLineChart({...props}) {

  // console.log('props', props.allMerchantTransactions)
  let rows = props.allMerchantTransactions || []
  const amounts     = rows.map(transactions => Number(transactions.amount));
  const datetimes   = rows.map(transactions => transactions.createdAt)
  const dates       = datetimes.map((date=> date.split('T')[0].split('-')[2]))


  const dataset = dates.map((date, index) => ({
    date: date,
    amount: amounts[index],
  }));

  // console.log(totalAmount)

  return (

      <LineChart
      xAxis={[{ 
        dataKey: 'date',
        min: 1,
        max: 31,
        label: 'July Month'
      }]}
      series={[
        {
          dataKey: 'amount',
          showMark: true,
          area: false,
          label: 'Amount'
        },
      ]}
      dataset={dataset}
      height={200}
    />
 
  );
}

import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';



export default function RefundTransactionLineChart({...props}) {

  // console.log('props', props.allMerchantTransactions)
  let rows = props.allMerchantTransactions || []
  const amounts     = rows.map(transactions => Number(transactions.amount));
  const datetimes   = rows.map(transactions => transactions.createdAt)
  const dates       = datetimes.map((date=> date.split('T')[0].split('-')[2]))

  // Current month
  const now =  new Date();
  const month = now.getMonth();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const currentMonthName = monthNames[month]


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
        label: `${currentMonthName} Month`
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

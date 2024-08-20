import { CardContent, Typography as MUITypo, Box } from '@mui/material';
import { Space, Table, Typography } from 'antd';
import axiosInstance from '../Authentication/axios';
import { useState, useEffect } from 'react';


const { Text, Link } = Typography;


const columns = [
    {
      title: 'Sl No',
      dataIndex: 'id',
      key: 'slno',
      render: (number) => <a>{number}</a>,
    },
    {
      title: 'Amount',
      key: 'withdrawalAmount',
      render: (record) => `${record.withdrawalAmount} ${record.withdrawalCurrency}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdDate',
      render: (createdAt) => {
        return <span>{createdAt.split('T')[0]}</span>;
      }
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdTime',
      render: (createdAt) => {
        return <span>{createdAt.split('T')[1]}</span>;
      }
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status)=> {
        let color, backgroundColor;
        switch (status) {
            case 'Pending':
                color = 'white';
                backgroundColor = 'orange';
                break;
            case 'Approved':
                color = 'white';
                backgroundColor = 'green';
                break;
            case 'Rejected':
                color = 'white';
                backgroundColor = 'green';
                break;
            default:
                color = 'black';
                backgroundColor = 'gray';
        }
        return <span style={{ color, backgroundColor, padding: '5px', borderRadius: '5px' }}>{status}</span>;
      }
    },
  ];




// Merchant Pending Withdrawals
export default function MerchantPendingWithdrawals() {

    const [pendingWithdrawal, updatePendingWithdrawal] = useState([]);    // Withdrawal data

    // Fetch all the pending withdrawals from API
    useEffect(() => {
        axiosInstance.get(`api/v3/merchant/pg/pending/withdrawal/`).then((res)=> {
            // console.log(res)
    
            if (res.status === 200 && res.data.success === true) {
                
                const dataWithKeys = res.data.merchantPendingWithdrawals.map((item, index) => ({
                  ...item,
                  key: index,
                }));
                updatePendingWithdrawal(dataWithKeys);
            };
    
        }).catch((error)=> {
            console.log(error)

        })
    }, []);
    

    return (
        <Box className="card mt-2 shadow" sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <MUITypo 
                    variant="h5" 
                    component="div" 
                    gutterBottom sx={{p:0.2}}
                    style={{display:'flex', justifyContent:'space-between', alignItems:'center' }}
                    >
                      Pending Withdrawals
                    <Link href="/merchant/withdrawal/requests/" target="_self">
                        View More
                    </Link>
                </MUITypo>

                <Table 
                    columns={columns} 
                    dataSource={pendingWithdrawal} 
                    pagination={false} 
                    scroll={{x: 1300}}
                    bordered={false}
                    />
                
            </CardContent>
        </Box>
    );
};
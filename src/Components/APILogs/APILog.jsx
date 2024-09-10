import React from 'react';
import { Table, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../Authentication/axios';
import Footer from '../Footer';



const columns = [
  {
    title: (
        <div style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '10px' }}>
            APIs
        </div>
    ),
    dataIndex: 'url',
    key: 'apis',
    width: 150,
    fixed: 'left',
  },
  {
    title: (
        <div style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '10px' }}>
            Errors
        </div>
    ),
    dataIndex: 'error',
    key: 'errors',
    fixed: 'left',
    width: 150,
    render: (text)=> <span style={{ color: '#c34a36', fontWeight: 'bold' }}>{text}</span>
  },
  {
    title: (
      <div style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '10px' }}>
          Logs
      </div>
    ),
    fixed: 'left',
    key: 'logs',
    children: [
      {
        title: 'Request Header',
        dataIndex: 'request_header',
        key: 'requestHeader',
    
      },
      {
        title: 'Request Body',
        dataIndex: 'request_body',
        key: 'requestBody',
        render: (text) => <span style={{ color:'#008ac3' }}>{text}</span>
      },
      {
        title: 'Response Header',
        dataIndex: 'response_header',
        key: 'responseHeader',
      },
      {
        title: 'Response Body',
        dataIndex: 'response_body',
        key: 'responseBody',
        render: (text) => <span style={{ wordBreak: 'break-word' }}>{JSON.stringify(text)}</span>
      },
    ],
  },
];





// Merchant Transaction Logs
export default function APILogs() {
  const [logData, updateLogData] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState();


  // Fetch all the Merchant logs
  useEffect(() => {
      axiosInstance.get(`api/v5/merchant/transaction/logs/`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.success === true) {
          updateLogData(res.data.merchant_logs.map((log, index) => ({...log, key: index})))
          setTotalRowCount(res.data.total_rows)
        };

      }).catch((error)=> {
        console.log(error)
      })
  }, []);


   // Get paginatede Data
  const handlePaginationValue = (page, pageSize)=> {
    // console.log(page)
      let limit = 10;
      let offset = (page - 1) * limit;
      
      axiosInstance.get(`api/v5/merchant/transaction/logs/?limit=${limit}&offset=${offset}`).then((res)=> {
        // console.log(res)

        if (res.status === 200 && res.data.success === true) {
          updateLogData(res.data.merchant_logs.map((log, index) => ({...log, key: index})))
        }

      }).catch((error)=> {
        console.log(error);

      })
  };



   return (
    <>
        <Table
          columns={columns}
          dataSource={logData}
          pagination={false}
          bordered
          size="middle"
          scroll={{
            x: 1500,
            y: 380,
          }}
          rowClassName="custom-row"
        />

        <div style={{ marginTop: '1px', textAlign: 'right', marginBottom:160}}>
            <Pagination 
              defaultCurrent={1} 
              total={totalRowCount} 
              onChange={handlePaginationValue}
              />
        </div>

        <Footer />
    </>
   );
};


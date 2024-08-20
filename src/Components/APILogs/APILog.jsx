import React from 'react';
import { Table } from 'antd';



const columns = [
  {
    title: (
        <div style={{ textAlign: 'center'}}>
            APIs
        </div>
    ),
    dataIndex: 'apis',
    key: 'apis',
    width: 150,
    fixed: 'left',
  },
  {
    title: (
        <div style={{ textAlign: 'center'}}>
            Errors
        </div>
    ),
    dataIndex: 'errors',
    key: 'errors',
    fixed: 'left',
    width: 150,  
  },
  {
    title: 'Logs',
    fixed: 'left',
    key: 'logs',
    children: [
      {
        title: 'Request Header',
        dataIndex: 'requestHeader',
        key: 'requestHeader',
    
      },
      {
        title: 'Request Body',
        dataIndex: 'requestBody',
        key: 'requestBody',
      },
      {
        title: 'Response Header',
        dataIndex: 'responseHeader',
        key: 'responseHeader',
      },
      {
        title: 'Response Body',
        dataIndex: 'responseBody',
        key: 'responseBody',
      },
    ],
  },
];


const data = [];



const APILogs = () => (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      scroll={{
        x: 1500,
        y: 240,
      }}
    />
  
);



export default APILogs;
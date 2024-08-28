export const ResponseHeaderTable = [
    {
        title: 'Header Name',
        dataIndex: 'headerName',
      }
]


export const ResponseHeaderTabledata = [
    {
        key: '1',
        headerName: 'Content-Type',
        headerValue: 'application/json'
      }
];


export const ResponseParameterColumn = [
    {
        title: 'Parameter Name',
        dataIndex: 'parameterName',
        width: 180,
      },
      {
        title: 'Data Type',
        dataIndex: 'dataType',
        width: 100
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: 380
      }
]




export const ResponseParameterTabledata = [
    {
      key: '1',
      parameterName: <small>success</small>,
      dataType: 'boolean',
      description: `Success/failure of request processing`,
    },
    {
      key: '2',
      parameterName: <small>status</small>,
      dataType: 'STRING',
      description: `Payment Status`,
    },
    {
      key: '3',
      parameterName: <small>message</small>,
      dataType: 'STRING',
      description: `Additional Information related to Transaction`,
    },
    {
      key: '4',
      parameterName: <small>merchantPublicKey</small>,
      dataType: 'STRING',
      description: 'Merchant Public URL provided by Itio',
    },
    {
      key: '5',
      parameterName: <small>merchantOrderId</small>,
      dataType: 'STRING',
      description: `Order ID provided by merchant during payment`,
    },
    {
      key: '6',
      parameterName: <small>transactionID</small>,
      dataType: 'STRING',
      description: 'Unique Transaction ID created for the transaction',
    },
    {
      key: '7',
      parameterName: <small>amount</small>,
      dataType: 'FLOAT',
      description: `Transaction Amount`,
    },
    {
      key: '8',
      parameterName: <small>currency</small>,
      dataType: 'STRING',
      description: `Transaction Currency`,
    },
    {
      key: '9',
      parameterName: <small>redirectInfo</small>,
      dataType: 'OBJECT',
      description: 'Payload for redirecting user to bank page for authentications',
    },
    {
      key: '10',
      parameterName: <small>url</small>,
      dataType: 'STRING',
      description: `Url on which user needs to be redirected for authentication`,
    }
  ];


export const CallbackHeaderColumn = [
    {
        title: 'Header Name',
        dataIndex: 'headerName',
      },
      {
        title: 'Header Value',
        dataIndex: 'headerValue',
      }
];



export const CallbackTableData = [
    {
        key: '1',
        headerName: 'Content-Type',
        headerValue: 'application/json'
      },
    //   {
    //     key: '2',
    //     headerName: 'X-AUTH',
    //     headerValue: `SHA256(base64 encoded payload + “/api/pg/sandbox/v1/pay/” + secret key) + **** + index`
    //   }
];

export const sampleCallbackURLResponse = 
    {
        "response": "ewogICJzdWNjZXNzIjogdHJ1ZSwKICAiY29kZSI6ICJQQVlNRU5UX1NVQ0NFU1MiLAogICJtZXNzYWdlIjogIllvdXIgcmVxdWVzdCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgY29tcGxldGVkLiIsCiAgImRhdGEiOiB7CiAgICAibWVyY2hhbnRJZCI6ICJQR1RFU1RQQVlVQVQiLAogICAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTAwNjgxODgxMDQiLAogICAgInRyYW5zYWN0aW9uSWQiOiAiVDIxMTEyMjE0Mzc0NTYxOTAxNzAzNzkiLAogICAgImFtb3VudCI6IDEwMCwKICAgICJzdGF0ZSI6ICJDT01QTEVURUQiLAogICAgInJlc3BvbnNlQ29kZSI6ICJTVUNDRVNTIiwKICAgICJwYXltZW50SW5zdHJ1bWVudCI6IHGUiOiAiVVBJIiwKICAgICAgInV0ciI6ICIyMDYzNzg4NjYxMTIiCiAgICB9CiAgfQp9Cg=="
};



export const Base64DecodedCallbackResponse = 
    {
        "success": true,
        "code": "PAYMENT_SUCCESS",
        "message": "Your request has been successfully completed.",
        "data": {
          "merchantId": "PGTESTPAYUAT",
          "merchantTransactionId": "MT7850590068188104",
          "transactionId": "T2111221437456190170379",
          "amount": 100,
          "state": "COMPLETED",
          "responseCode": "SUCCESS",
          "paymentInstrument": {
            "type": "UPI",
            "utr": "206378866112"
          }
        }
      };

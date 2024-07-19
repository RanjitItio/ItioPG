import { Layout,Typography, Card, Button} from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

const columns = [
    {
      title: 'Environment',
      dataIndex: 'environment',
    },
    {
      title: 'BaseURL',
      dataIndex: 'baseurl',
    },
    {
      title: 'API End Point',
      dataIndex: 'apiEndPoint',
    },
  ];

const RequestheaderColumns = [
    {
      title: 'Header Name',
      dataIndex: 'headerName',
    },
    {
      title: 'Header Value',
      dataIndex: 'headerValue',
    }
  ];

const RequestParameterColumns = [
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
    },
    {
      title: 'Required',
      dataIndex: 'required',
    },
  ];


const data = [
  {
    key: '1',
    environment: 'Test',
    baseurl: 'https://python-uat.oyefin.com/api/pg/sandbox/v1/pay/',
    apiEndPoint: '/api/pg/sandbox/v1/pay/'
  },
  {
    key: '2',
    environment: 'Production',
    baseurl: 'https://python-uat.oyefin.com/api/pg/prod/v1/pay/',
    apiEndPoint: '/api/pg/prod/v1/pay/'
  },

];

const RequestHeaderdata = [
  {
    key: '1',
    headerName: 'Content-Type',
    headerValue: 'application/json'
  },
  {
    key: '2',
    headerName: 'X-AUTH',
    headerValue: `SHA256(base64 encoded payload + “/api/pg/sandbox/v1/pay/” + secret key) + **** + index`
  },

];

const RequestParameterdata = [
  {
    key: '1',
    parameterName: <small>merchantPublicKey</small>,
    dataType: 'STRING',
    description: `Unique merchantPublicKey assigned to the merchant by Itio
                    Note: merchantPublicKey length will be less than 38 characters.`,
    required: 'YES'
  },
  {
    key: '2',
    parameterName: <small>merchantSecretKey</small>,
    dataType: 'STRING',
    description: `Unique merchantSecretKey assigned to the merchant by Itio
                    Note: merchantSecretKey length will be less than 38 characters.`,
    required: 'YES'
  },
  {
    key: '3',
    parameterName: <small>merchantOrderId</small>,
    dataType: 'STRING',
    description: `Unique Order ID generated by the merchant to track request to Itio
                Note:
                - merchantOrderId length should be less than 35 characters
                - No Special characters allowed`,
    required: 'YES'
  },
  {
    key: '4',
    parameterName: <small>currency</small>,
    dataType: 'STRING',
    description: 'Default value USD',
    required: 'YES'
  },
  {
    key: '5',
    parameterName: <small>amount</small>,
    dataType: 'FLOAT',
    description: `Transaction amount in USD.
                Note: Amount should be greater than 100 (in Paise)`,
    required: 'YES'
  },
  {
    key: '6',
    parameterName: <small>redirectUrl</small>,
    dataType: 'STRING',
    description: 'The url where the user will be redirected after transaction completion.',
    required: 'YES'
  },
  {
    key: '7',
    parameterName: <small>callbackUrl</small>,
    dataType: 'STRING',
    description: `The url where server to server callback will be posted. Always POST.
                  This callback will be of POST type and will contain the same payload as the status response. 
                  The callback will contain an X-VERIFY header which the merchant should 
                  verify before decoding the response.`,
    required: 'YES'
  },
  {
    key: '8',
    parameterName: <small>mobileNumber</small>,
    dataType: 'STRING',
    description: `Mobile number of the user
                Note: There should not be any space.`,
    required: 'NO'
  },
  {
    key: '9',
    parameterName: <small>paymentInstrument</small>,
    dataType: 'OBJECT',
    description: 'Payment details',
    required: 'YES'
  },
  {
    key: '10',
    parameterName: <small>paymentInstrument.type</small>,
    dataType: 'ENUM',
    description: `Payment instrument type.
                Value will be: PAY_PAGE`,
    required: 'YES'
  },

];


const sampleRequestPayload = `
{
  "merchantId": "PGTESTPAYUAT",
  "merchantTransactionId": "MT7850590068188104",
  "merchantUserId": "MUID123",
  "amount": 10000,
  "redirectUrl": "https://webhook.site/redirect-url",
  "redirectMode": "REDIRECT",
  "callbackUrl": "https://webhook.site/callback-url",
  "mobileNumber": "9999999999",
  "paymentInstrument": {
    "type": "PAY_PAGE"
  }
}
`;

const sampleRequestBase64EncodedPayload = `
{
  "request": "ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEMTIzIiwKICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCiAgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=",
}
`;


export default function PayAPIContent() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

      }, []);

      const handleRequestPayLoadCopy = () => {
        navigator.clipboard.writeText(samplePayload);
      };
    

    return (
        <Layout style={{ marginRight: isMobile ? 0 : 295 }}>
            <Header style={{ background: '#fff', padding: 0 }}>
                <Title level={2} style={{ margin: '26px' }}>PAY API</Title>
            </Header>

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                <Typography>
                    <Title level={3}>End Points</Title>

                    <Table 
                       columns={columns} 
                       dataSource={data} 
                       pagination={false}
                       scroll={{ x: 700 }}
                       />
                </Typography>

                <Typography>
                    <Title level={3}>Request Details</Title>
                    <Paragraph>
                        Request details
                    </Paragraph>

                    <ul style={{listStyleType:'square'}}>
                        <li>Request Headers</li>
                        <li>Request Parameters</li>
                        <li>Sample Request for Pay Page</li>
                        <li>How to Calculate X-AUTH/Checksum header</li>
                    </ul>

                </Typography>

                <Typography>
                    <Title level={3}>Response Details</Title>
                    <Paragraph>
                        Response details
                    </Paragraph>

                    <ul style={{listStyleType:'square'}}>
                        <li>Request Headers</li>
                        <li>Request Parameters</li>
                        <li>Sample Request for Pay Page</li>
                        <li>How to Calculate X-AUTH/Checksum header</li>
                    </ul>

                </Typography>

                <Title level={3}>Request Details</Title>

                {/* Request Header */}
                <Typography>
                    <Title level={5}>Request Headers</Title>

                    <Table 
                         columns={RequestheaderColumns} 
                         dataSource={RequestHeaderdata} 
                         scroll={{ x: 700 }}
                         />
                </Typography>

                {/* Request Parameters */}
                <Typography>
                    <Title level={5}>Request Parameters</Title>

                    <Table 
                         columns={RequestParameterColumns} 
                         dataSource={RequestParameterdata} 
                         pagination={false}
                         scroll={{ x: 800 }}
                         />
                </Typography>

                <Title level={5}>Sample Request for Pay Page</Title>

                <Card style={{ margin: '16px', padding: '16px', borderRadius: '8px' }}>
                    <Title level={5}>Sample Payload - Base64 Decoded</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '16px',
                        borderRadius: '8px',
                        position: 'relative'
                        }}
                    >
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                        {sampleRequestPayload}
                        </pre>
                        <Button
                        icon={<CopyOutlined />}
                        style={{ position: 'absolute', top: '16px', right: '16px' }}
                        onClick={handleRequestPayLoadCopy}
                        />
                    </Card>
                </Card>
                <Paragraph style={{ marginTop: '16px' }}>
                    Convert the JSON Payload to Base64 Encoded Payload
                </Paragraph>

                <Paragraph style={{ marginTop: '16px' }}>
                    The above JSON request payload should be converted to the Base64 Encoded Payload 
                    and then the request should be sent in the below format.
                </Paragraph>

                <Card style={{ margin: '16px', padding: '16px', borderRadius: '8px' }}>
                    <Title level={5}>Sample Request -  Base64 Encoded</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '16px',
                        borderRadius: '8px',
                        position: 'relative'
                        }}
                    >
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                        {sampleRequestBase64EncodedPayload}
                        </pre>
                        <Button
                        icon={<CopyOutlined />}
                        style={{ position: 'absolute', top: '16px', right: '16px' }}
                        onClick={handleRequestPayLoadCopy}
                        />
                    </Card>
                </Card>


                <Title level={5}>How to Calculate X-AUTH/Checksum header</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    Formula: SHA256(Base64 encoded payload + “/api/pg/prod/v1/pay/” + secret key) + **** + index
                </Paragraph>

                <Title level={5}>Base64 encoded payload:</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                        ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4
                        NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEM
                        TIzIiwKICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCi
                        AgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd
                        2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5
                        IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=
                </Paragraph>

                <Title level={5}>API End Point</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    /api/pg/sandbox/v1/pay/
                </Paragraph>

                <Title level={5}>Sample Secret Key</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    eyxueb0cd02cf4e23e6c6aff0399
                </Paragraph>

                <Title level={5}>Sample INDEX</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    1
                </Paragraph>

                <Title level={5}>Final Computation</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    <b>SHA256</b>(ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEMTIzIiwKICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCiAgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=/pg/v1/pay099eb0cd-02cf-4e2a-8aca-3e6c6aff0399) + ### + 1
                </Paragraph>

                <Title level={5}>Checksum Value</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    d7a8e4458caa6fcd781166bbdc85fec76740c18cb9baa9a4c48cf2387d554180###1
                </Paragraph>

                </div>
            </Content>
        </Layout>
    );
};
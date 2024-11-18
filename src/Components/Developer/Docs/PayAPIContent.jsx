import { Layout,Typography, Card, Button, Tag} from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
import { ResponseHeaderTable, ResponseHeaderTabledata, RequestheaderColumns, 
         RequestParameterColumns, RequestHeaderdata, RequestParameterdata,
         ResponseParameterColumn, ResponseParameterTabledata, sampleRequestPayload,
         sampleResponsePayload, sampleRequestBase64EncodedPayload, sampleErrorResponsePayload,
         ErrorResponseParameterTabledata } from './ColumnData';



const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;


const CompanyShortName = import.meta.env.VITE_COMPANY_SHORT_NAME;



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





// PAY API Docs
export default function PayAPIContent() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

      }, []);

      // Copy the Content
      const handleCopy = (text) => {
        if (text === 'sampleResponsePayload') {
          navigator.clipboard.writeText(sampleResponsePayload);
        } else if (text === 'sampleRequestPayload') {
          navigator.clipboard.writeText(sampleRequestPayload);
        } else if (text === 'sampleRequestBase64EncodedPayload'){
          navigator.clipboard.writeText(sampleRequestBase64EncodedPayload);
        }
        
      };
    

    return (
        // <Layout style={{ marginRight: isMobile ? 0 : 295 }}>
        <Layout style={{ marginRight: 0 }}>

            <div style={{ background: '#fff' }}>
              <Title level={2} style={{ margin: '15px' }}>Developer Docs</Title>
            </div>

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                

                <Typography>
                    <Title level={4}>End Points</Title>
                    <Table 
                       columns={columns} 
                       dataSource={data} 
                       pagination={false}
                       scroll={{ x: 700 }}
                       />
                </Typography>

                <Typography style={{marginTop:20}}>
                    <Title level={4}>Request Details</Title>
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

                {/* <Typography style={{marginTop:20}}>
                    <Title level={4}>Response Details</Title>
                    <Paragraph>
                        Response details
                    </Paragraph>

                    <ul style={{listStyleType:'square'}}>
                        <li>Request Headers</li>
                        <li>Request Parameters</li>
                        <li>Sample Request for Pay Page</li>
                        <li>How to Calculate X-AUTH/Checksum header</li>
                    </ul>

                </Typography> */}

                <Title level={4}>Request Details</Title>

                {/* Request Header */}
                <Typography>
                    <Title level={5}>Request Headers</Title>

                    <Table 
                         columns={RequestheaderColumns} 
                         dataSource={RequestHeaderdata} 
                         scroll={{ x: 700 }}
                         pagination={false}
                         />
                </Typography>

                {/* Request Parameters */}
                <Typography style={{marginTop:20}}>
                    <Title level={5}>Request Parameters</Title>

                    <Table 
                         columns={RequestParameterColumns} 
                         dataSource={RequestParameterdata} 
                         pagination={false}
                         scroll={{ x: 800 }}
                         />
                </Typography>

                {/* Sample Request for Pay Page */}
                <Title level={5}>Sample Request for Pay Page</Title>

                <Card style={{ margin: '16px', padding: '2px', borderRadius: '8px' }}>
                    <p>Sample JSON Payload</p>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '0px',
                        borderRadius: '8px',
                        position: 'relative'
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                          {sampleRequestPayload}
                        </SyntaxHighlighter>

                        <Button
                          icon={<CopyOutlined />}
                          style={{ position: 'absolute', top: '16px', right: '16px' }}
                          onClick={()=> {handleCopy('sampleRequestPayload')}}
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

                <Card style={{ margin: '16px', padding: '0px', borderRadius: '8px' }}>
                    <p>Sample Request -  Base64 Encoded</p>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '0px',
                        borderRadius: '8px',
                        position: 'relative'
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                          {sampleRequestBase64EncodedPayload}
                        </SyntaxHighlighter>

                        <Button
                          icon={<CopyOutlined />}
                          style={{ position: 'absolute', top: '16px', right: '16px' }}
                          onClick={()=> {handleCopy('sampleRequestBase64EncodedPayload')}}
                          />
                    </Card>
                </Card>

                <Title level={5}>How to Calculate X-AUTH/Checksum header</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    <span style={{color:'grey'}}>Formula: SHA256(Base64 encoded payload + “/api/pg/prod/v1/pay/” + secret key) + **** + index</span>
                </Paragraph>

                <Title level={5}>Base64 encoded payload:</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    <i style={{color:'grey'}}>
                        ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4
                        NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEM
                        TIzIiwKICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL3JlZGlyZWN0LXVybCIsCi
                        AgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd
                        2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5
                        IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=
                    </i>
                </Paragraph>

                <Title level={5}>API End Point</Title>

                <Paragraph style={{ marginTop: '16px', color:'grey' }}>
                    /api/pg/sandbox/v1/pay/
                </Paragraph>

                <Title level={5}>Sample Secret Key</Title>

                <Paragraph style={{ marginTop: '16px', color:'grey'}}>
                    eyxueb0cd02cf4e23e6c6aff0399
                </Paragraph>

                <Title level={5}>Sample INDEX</Title>

                <Paragraph style={{ marginTop: '16px' }}>
                    1
                </Paragraph>

                <Title level={5}>Final Computation</Title>

                <Paragraph style={{ marginTop: '16px', color:'grey' }}>
                    <i>
                      <b>SHA256</b>
                      (ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25
                      JZCI6ICJNVDc4NTA1OTAwNjgxODgxMDQiLAogICJtZXJjaGFudFVzZXJJZCI6ICJNVUlEMTIzIiw
                      KICAiYW1vdW50IjogMTAwMDAsCiAgInJlZGlyZWN0VXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRl
                      L3JlZGlyZWN0LXVybCIsCiAgInJlZGlyZWN0TW9kZSI6ICJSRURJUkVDVCIsCiAgImNhbGxiYWNrVX
                      JsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6IC
                      I5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSI
                      KICB9Cn0=/pg/v1/pay099eb0cd-02cf-4e2a-8aca-3e6c6aff0399) + ### + 1
                    </i>
                </Paragraph>

                <Title level={5}>Checksum Value</Title>

                <Paragraph style={{ marginTop: '16px', color:'grey' }}>
                    d7a8e4458caa6fcd781166bbdc85fec76740c18cb9baa9a4c48cf2387d554180###1
                </Paragraph>

                <Title level={4}>Response Details</Title>
                    <Title level={5}>Sample Response</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {sampleResponsePayload}
                        </SyntaxHighlighter>

                        <Button
                          icon={<CopyOutlined />}
                          style={{ position: 'absolute', top: '16px', right: '16px' }}
                          onClick={()=> {handleCopy('sampleResponsePayload')}}
                          />
                    </Card>

                    {/* Response Header */}
                    <Typography style={{marginTop:15}}>
                        <Title level={5}>Response Headers</Title>

                        <Table 
                            columns={ResponseHeaderTable} 
                            dataSource={ResponseHeaderTabledata} 
                            scroll={{ x: 700 }}
                            pagination={false}
                            />
                    </Typography>

                    {/* Response Parameters */}
                    <Typography style={{marginTop:20}}>
                        <Title level={5}>Response Parameters</Title>

                        <Table 
                            columns={ResponseParameterColumn} 
                            dataSource={ResponseParameterTabledata} 
                            pagination={false}
                            scroll={{ x: 800 }}
                          />
                    </Typography>

                    {/* Sample Error Response */}
                    <Title level={5}>Sample Error Response</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {sampleErrorResponsePayload}
                        </SyntaxHighlighter>

                        <Button
                          icon={<CopyOutlined />}
                          style={{ position: 'absolute', top: '16px', right: '16px' }}
                          onClick={()=> {handleCopy('sampleResponsePayload')}}
                          />
                    </Card>

                    {/* Response Header */}
                    <Typography style={{marginTop:15}}>
                        <Title level={5}>Error Response Headers</Title>

                        <Table 
                            columns={ResponseHeaderTable} 
                            dataSource={ResponseHeaderTabledata} 
                            scroll={{ x: 700 }}
                            pagination={false}
                            />
                    </Typography>

                    {/* Response Parameters */}
                    <Typography style={{marginTop:20}}>
                        <Title level={5}>Error Response Parameters</Title>

                        <Table 
                            columns={ResponseParameterColumn} 
                            dataSource={ErrorResponseParameterTabledata} 
                            pagination={false}
                            scroll={{ x: 800 }}
                          />
                    </Typography>
                </div>

            </Content>
        </Layout>
    );
};
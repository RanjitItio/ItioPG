import { Layout,Typography, Card, Button, Divider } from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { RequestheaderColumns, CheckStatusPathParametersTableData,
        CheckStatusPathParametersColumn, CheckStatusRequestHeaderTableData,
        CheckStatusSampleSuccessResponse, CheckStatusSampleFailResponse
 } from './ColumnData';



const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;


const CompanyShortName = import.meta.env.VITE_COMPANY_SHORT_NAME;


// Check status API Docs
export default function CheckStatusAPIDocs() {
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
        if (text === 'CheckStatusSampleSuccessResponse'){
            navigator.clipboard.writeText(CheckStatusSampleSuccessResponse);
        } else if (text === 'CheckStatusSampleFailResponse') {
            navigator.clipboard.writeText(CheckStatusSampleFailResponse);
        } 
    };


    return (
        // <Layout style={{ marginRight: isMobile ? 0 : 295 }}>
        <Layout style={{ marginRight: 0 }}>

        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>

            <Typography>
                <Title style={{ color: '#1890ff' }} level={3}>Check Status API</Title>
                <div style={{display:'flex', justifyContent:'flex-start'}}>
                    <Button shape="circle" style={{background:'#00c9a7', color:'white', width:'50px'}}>
                        POST
                    </Button>
                    <Paragraph>https://python-uat.oyefin.com/api/v1/pg/prod/merchant/transaction/status/{'{merchantPublicUrl}'}/{'{merchantOrderID}'}</Paragraph>
                </div>

                <Paragraph>This API is used for checking the status of an existing transaction.</Paragraph>

                <Divider />

                <Typography>

                    <Paragraph style={{ fontSize: '16px' }}>
                            Once the customer is redirected back to the merchant website/app, 
                            merchants should check with their server if they have received the 
                            [Server-to-Server Callback] response. 
                            If not, it is mandatory to make a Transaction Status API check with {CompanyShortName} 
                            backend systems to know the actual status of the payment and, then accordingly 
                            process the result..
                    </Paragraph>

                    <Paragraph style={{ fontSize: '16px' }}>
                        The payment status can be Success, Failed or Pending. When Pending, merchants should retry until the status changes to Success or Failed
                    </Paragraph>

                </Typography>

                <Paragraph style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    <Title level={5}>S2S and Check Status API Handling</Title>

                    <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>
                        <li>Once the customer is redirected back to the merchant website/app, 
                            merchants should check with their server if they have received the 
                            Server-to-Server Callback response. If not, 
                            it is mandatory to make a Transaction Status API check with {CompanyShortName} backend 
                            systems to know the actual status of the payment and, then accordingly 
                            process the result.
                        </li>

                        <li>The payment status can be Success, Failed or Pending. When Pending, 
                            merchants should retry until the status changes to Success or Failed.
                        </li>
                    </ul>

                </Paragraph>

                <Paragraph style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>
                    Check Status API – Reconciliation [MANDATORY]
                </Paragraph>

                <ol style={{ marginLeft: '20px' }}>
                    <p>If the payment status is Pending, then Check Status API should be called in the following interval:</p>

                    <li>
                        <Paragraph>
                            The first status check at 20-25 seconds post transaction start, then
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Every 3 seconds once for the next 30 seconds,
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Every 6 seconds once for the next 60 seconds,
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Every 10 seconds for the next 60 seconds,
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Every 30 seconds for the next 60 seconds, and then
                        </Paragraph>
                    </li>
                    <li>
                        <Paragraph>
                            Every 1 min until timeout (20 mins).
                        </Paragraph>
                    </li>
                </ol>

                <Divider />

            </Typography>

            {/* Request Header */}
            <Title level={3}>Request Header</Title>
            <Table 
                columns={RequestheaderColumns} 
                dataSource={CheckStatusRequestHeaderTableData}
                pagination={false}
                scroll={{ x: 800 }}
                />


            {/* Path Parameter */}
            <Typography style={{marginTop:30}}>
                <Title level={3}>Path Parameter</Title>
                <Table
                    columns={CheckStatusPathParametersColumn} 
                    dataSource={CheckStatusPathParametersTableData}
                    pagination={false}
                    scroll={{ x: 800 }}
                    />
            </Typography>


            {/* Sample Response */}
            <Title level={3}>Sample Response - Success</Title>
                <Card style={{ margin: '16px', padding: '0px', borderRadius: '8px' }}>
                    <p>Sample Payload</p>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '0px',
                        borderRadius: '8px',
                        position: 'relative',
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {CheckStatusSampleSuccessResponse}
                        </SyntaxHighlighter>

                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('CheckStatusSampleSuccessResponse')}}
                            />
                    </Card>
                </Card>

                <Title level={3}>Sample Response - Failed</Title>
                <Card style={{ margin: '16px', padding: '0px', borderRadius: '8px' }}>
                    <p>Sample Payload</p>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '0px',
                        borderRadius: '8px',
                        position: 'relative',
                        }}
                    >
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {CheckStatusSampleFailResponse}
                        </SyntaxHighlighter>

                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('CheckStatusSampleFailResponse')}}
                            />
                    </Card>
                </Card>
        </div>

        </Content>
    </Layout>
    );
};


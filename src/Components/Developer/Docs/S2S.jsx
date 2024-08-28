import { Layout,Typography, Card, Button, Divider } from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CallbackHeaderColumn, CallbackTableData, Base64DecodedCallbackResponse,
        sampleCallbackURLResponse } from './ColumnData';



const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;




// S2S Callback Response
export default function S2SCallBack() {
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
        if (text === 'sampleCallbackURLResponse'){
            navigator.clipboard.writeText(JSON.stringify(sampleCallbackURLResponse));
        } else if (text === 'sampleCallbackURLResponse') {
            navigator.clipboard.writeText(JSON.stringify(sampleCallbackURLResponse));
        } else if (text === 'Base64DecodedCallbackResponse') {
            navigator.clipboard.writeText(JSON.stringify(Base64DecodedCallbackResponse));
        } else if (text === 'Base64DecodedCallbackResponse') {
            navigator.clipboard.writeText(JSON.stringify(Base64DecodedCallbackResponse));
        }
       };


    return (
        <Layout style={{ marginRight: isMobile ? 0 : 295 }}>

            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                <Typography>
                    <Title style={{ color: '#1890ff' }} level={3}>Server to Server Callback</Title>
                    <Divider />

                    <Paragraph style={{ fontSize: '16px', lineHeight: '1.7' }}>
                    <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>
                        <li>Server to server callbacks are initiated from the Itio server to the URL provided by the merchant when the payment reaches any terminal state (SUCCESS or FAIL)</li>

                        <li>There are two ways to enable the server to server callbacks.</li>
                    </ul>
                    </Paragraph>

                    <Paragraph style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                        Options to enable callbacks:
                    </Paragraph>

                    <ol style={{ marginLeft: '20px' }}>
                        <li>
                            <Paragraph>
                                Either Register your static callback URL with Itio. This is a one-time process.
                            </Paragraph>
                        </li>
                        <li>
                            <Paragraph>
                                Or, Send the callback URL along with each payment request
                            </Paragraph>
                        </li>
                    </ol>

                    <Divider />
                    <Paragraph>
                        <strong>Note:</strong> The URL is specified in the request parameter <code>callbackUrl</code>
                    </Paragraph>

                </Typography>

            
                <Typography>
                    <Title level={3} style={{ textAlign: 'start', marginBottom: '20px' }}>Payload</Title>
                    <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                        The payload that is going to be sent to the merchant on the specified callback URL will have a <strong>base64 encoded JSON</strong>.
                    </Paragraph>

                    <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                        Upon base64 decoding the response, you should get a JSON with a format similar to the response returned by the <strong>transaction status API</strong>.
                    </Paragraph>

                    <Paragraph style={{ fontSize: '16px', color: '#595959' }}>
                        This is the best-case callback that would be sent from the Itio server to the merchants’ server. In the event of a callback failure, the merchants must use the <strong>transaction status API</strong> and take the transaction to closure.
                    </Paragraph>

                </Typography>


                {/* Callbac Headers */}
                <Typography>
                    <Title level={3}>Callback Headers</Title>

                    <Table 
                         columns={CallbackHeaderColumn} 
                         dataSource={CallbackTableData} 
                         scroll={{ x: 700 }}
                         pagination={false} />

                </Typography>


                {/* Callback Response - Success */}
                <Typography style={{marginTop:15}}>
                <Title level={3}>Sample Callback Response – Success</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}>
                        
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {JSON.stringify(sampleCallbackURLResponse, null, 2)}
                        </SyntaxHighlighter>

                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('sampleCallbackURLResponse')}}
                            />
                    </Card>
                </Typography>

                <Typography style={{marginTop:15}}>
                <Title level={3}>Base64 Decoded Sample Response</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}>
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {JSON.stringify(Base64DecodedCallbackResponse, null, 2)}
                        </SyntaxHighlighter>

                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('Base64DecodedCallbackResponse')}}
                            />
                    </Card>
                </Typography>


                {/* Callback Response - Failure */}
                <Typography style={{marginTop:15}}>
                <Title level={3}>Sample Callback Response – Failure</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}>
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {JSON.stringify(sampleCallbackURLResponse, null, 2)}
                        </SyntaxHighlighter>

                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('sampleCallbackURLResponse')}}
                            />
                    </Card>
                </Typography>

                <Typography style={{marginTop:15}}>
                <Title level={3}>Base64 Decoded Sample Response</Title>
                    <Card
                        style={{
                        backgroundColor: '#f5f5f5',
                        padding: '1px',
                        borderRadius: '10px',
                        position: 'relative'
                        }}>
                        <SyntaxHighlighter language="json" style={coy} showLineNumbers>
                            {JSON.stringify(Base64DecodedCallbackResponse, null, 2)}
                        </SyntaxHighlighter>
                        
                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={()=> {handleCopy('Base64DecodedCallbackResponse')}}
                            />
                    </Card>
                </Typography>

                </div>

            </Content>
        </Layout>
    );
};
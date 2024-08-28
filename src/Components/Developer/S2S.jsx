import { Layout,Typography, Card, Button} from 'antd';
import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { CopyOutlined } from '@ant-design/icons';
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


      const handleRequestPayLoadCopy = () => {
        navigator.clipboard.writeText(samplePayload);
      };


    return (
        <Layout style={{ marginRight: isMobile ? 0 : 295 }}>

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                <Typography>
                    <Title level={3}>Server to Server Callback</Title>
                    <ul>
                        <li>Server to server callbacks are initiated from the Itio server to the URL provided by the merchant when the payment reaches any terminal state (SUCCESS or FAIL)</li>

                        <li>There are two ways to enable the server to server callbacks.</li>
                    </ul>

                    <ol>
                        <li>Either Register your static callback URL with PhonePe. This is a one-time process.</li>
                        <li>Or, Send the callback URL along with each payment request</li>
                    </ol>

                    <p>The URL is specified in the request parameter callbackUrl</p>
                </Typography>

                <Typography>
                    <Title level={3}>Payload</Title>
                    <p>The payload that is going to be sent to the merchant on the specified callback URL will have a base64 encoded JSON.</p>
                    <p>Upon base64 decoding the response, you should get a JSON with a format similar to the response returned by transaction status API.</p>

                    <p>This is the best case callback that would be sent from the Itio server to the merchants’ server. In the event of a callback failure, the onus is on the merchants to use the transaction status API and take the transaction to closure.</p>
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
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                            {JSON.stringify(sampleCallbackURLResponse, null, 2)}
                        </pre>
                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={handleRequestPayLoadCopy}
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
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                            {JSON.stringify(Base64DecodedCallbackResponse, null, 2)}
                        </pre>
                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={handleRequestPayLoadCopy}
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
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                            {JSON.stringify(sampleCallbackURLResponse, null, 2)}
                        </pre>
                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={handleRequestPayLoadCopy}
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
                        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', marginBottom: '0' }}>
                            {JSON.stringify(Base64DecodedCallbackResponse, null, 2)}
                        </pre>
                        <Button
                            icon={<CopyOutlined />}
                            style={{ position: 'absolute', top: '16px', right: '16px' }}
                            onClick={handleRequestPayLoadCopy}
                            />
                    </Card>
                </Typography>

                </div>

            </Content>
        </Layout>
    );
};
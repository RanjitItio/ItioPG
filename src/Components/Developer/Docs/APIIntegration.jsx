import { useState, useEffect } from "react";
import { Layout,Typography, Card, Button, Tag} from 'antd';
import { Table } from 'antd';


const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;



const CompanyShortName = import.meta.env.VITE_COMPANY_SHORT_NAME;



////// API Integrations Process
export default function APIINtegration({setSelectedKey}) {
    // const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // useEffect(() => {
    //     const handleResize = () => {
    //       setIsMobile(window.innerWidth < 768);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);

    //   }, []);


    return (
        // <Layout style={{ marginRight: isMobile ? 0 : 295 }}>
        <Layout style={{ marginRight: 0 }}>

            <div style={{ background: '#ffff' }}>
              <Title level={2} style={{ margin: '15px' }}>Developer Docs</Title>
            </div>

            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                    <Typography>
                        <Title level={3}>Document Illustration</Title>
                        <p>
                            The document is provided by Ition Innovex Pvt. Ltd. and outlines standardized API integration guidelines for our merchants. 
                            We reserve the right to make updates to the document at any time and retain the final authority on its interpretation.
                        </p>

                        <ol>
                            <li>By utilizing this document, you can implement functionalities such as online payments, order information retrieval, order refunds, and more.</li>
                            <li>This document is intended for use by merchants' administrators, maintainers, and developers.</li>
                        </ol>
                    </Typography>

                    <Typography>
                        <Title level={3}>API Integration</Title>
                        <ol>
                            <li>
                                Initiating Payment request
                            </li>
                            <li>
                                Redirecting User to complete the Payment
                            </li>
                            <li>
                                Redirecting user to Merchant web page
                            </li>
                            <li>
                                Status verification post redirection to merchant website
                            </li>
                            <li>
                                Handling Payment Success, Pending and Failure
                            </li>
                        </ol>
                    </Typography>


                    <Title level={4}>Step:1 Initiating Payment Request</Title>
                        <p>
                            The merchant initiates a payment request via a server-to-server call to the PAY API. (<a onClick={()=> setSelectedKey('2')} style={{color:'#0081cf'}}>PAY API</a>), In the response to this PAY API call,
                            a URL for that particular transaction is returned to process the payment.
                        </p>
                        <p>
                            Refer here for <a onClick={()=> setSelectedKey('2')} style={{color:'#0081cf'}}><u>PAY API</u></a>
                        </p>

                    <Title level={4}>Step:2 Redirecting user to complete the payment</Title>
                        <p>
                            The Merchant does a client side redirection to the URL returned in Step 1.
                            This will take the customer to the respective bank page for processing the payment using Cards/Net Banking.
                        </p>

                    <Title level={4}>Step 3: Redirecting user to Merchant web page</Title>
                        <p>
                            Once the user has completed the payment, {CompanyShortName} will redirect to the redirectUrl passed in the request body
                            to give the UI control back to the merchant website.
                        </p>

                    <Title level={4}>Step 4: Status verification post redirection to merchant website</Title>
                        <p>
                            The merchant should check with their server if the S2S response is received.
                        </p>
                        <p>
                            Refer here for <a onClick={()=> setSelectedKey('3')} style={{color:'#0081cf'}}><u>Server-to-Server Callback</u></a>
                        </p>
                         <ul>
                            <li>
                                If S2S is received, the amount should be validated on the server side and the 
                                payment status has to be updated on the merchant website.
                            </li>
                            <li>
                                If S2S is not received, then the PG Check Status API should be called and the amount should be validated 
                                in the response. The order status should be updated based on the transaction status provided by {CompanyShortName}.
                            </li>
                         </ul>

                         <p>Refer Here for <a onClick={()=> setSelectedKey('4')} style={{color:'#0081cf'}}>Check Status API</a></p>


                    <Title level={4}>Step 5. Handling Payment Success, Pending and Failure</Title>
                         <p>
                            The S2S callback or PG Status API response will return the actual payment status. 
                            The payment status falls within these three categories and merchants should handle it.
                         </p>

                         <ul>
                            <li>
                                <b>Payment Success</b>
                            </li>
                            <p>
                                If success response is received in merchant’s server, 
                                then the success status has to be passed to the website and notify the customer 
                                with Payment Success page.
                            </p>

                            <li><b>Payment Failure</b></li>
                            <p>
                                If failure response is received in merchant’s server, 
                                then the failure status has to be passed to the website and notify the customer with Payment Failure page 
                                & ask the customer to retry payment.
                            </p>

                            <li><b>Payment Pending</b></li>
                            <p>
                                If pending response is received in merchant’s server, then the merchant can handle it in two ways depending on the use case.
                            </p>
                            
                            <ul>
                                <li><b>Option 1:</b> Pending status can be passed to the website and notify the customer with Payment Pending page. 
                                    Ask the customer to wait for the terminal status and the status of the transaction should be shown in the order 
                                    history page.
                                </li>

                                <li><b>Option 2:</b>Even though the payment status is Pending, 
                                    Failure status can be passed to the website and notify the customer with Payment Failure page 
                                    along with the refund message(If any amount is debited, the amount will be refunded back).
                                </li>
                            </ul>
                         </ul>
                </div>

            </Content>
        </Layout>
    );
};


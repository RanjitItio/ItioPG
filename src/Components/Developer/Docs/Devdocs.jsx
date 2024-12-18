import 'antd/dist/antd.js'
import { Layout, Menu, Affix, Typography, Button, Drawer } from 'antd';
import { MenuOutlined, CodeOutlined, SyncOutlined } from '@ant-design/icons';
import PayAPIContent from './PayAPIContent';
import { useState, useEffect } from 'react';
import S2SCallBack from './S2S';
import CheckStatusAPIDocs from './CheckStatus';
import APIINtegration from './APIIntegration';


const { Sider } = Layout;
const { Title } = Typography;




// Developer Tools
export default function DevDocs() {

    const [visible, setVisible]     = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile]   = useState(window.innerWidth < 768);
    const [selectedKey, setSelectedKey] = useState('1');  // Clicked bar state

    const toggleDrawer = () => {
        setVisible(!visible);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };


    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    // Method to check the clicked bar
    const handleMenuClick = (key) => {
      setSelectedKey(key);
    };

      let content;

      switch (selectedKey) {
        
        case '1':
          content = <APIINtegration 
                setSelectedKey={setSelectedKey}
            />;
          break;
        case '2':
          content = <PayAPIContent />;
          break;
        case '3':
          content = <S2SCallBack />;
          break;
        case '4':
          content = <CheckStatusAPIDocs />;
          break;
        default:
          content = <PayAPIContent />;
          break;
      };


  return (
    <>
        <Layout style={{ minHeight: '100vh' }}>
            {!isMobile ? (
                <Sider
                  width={250}
                  collapsible
                  collapsed={collapsed}
                  onCollapse={toggleCollapsed}
                  style={{ background: '#fff', height: '100vh', overflow: 'auto' }}
                >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[selectedKey]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={({key}) => handleMenuClick(key)}
                    items={[
                    
                    {
                        key: '1',
                        icon: <CodeOutlined />,
                        label: 'API Integration',
                    },
                    
                    {
                        key: '2',
                        icon: <CodeOutlined />,
                        label: 'PAY API',
                    },
                    {
                        key: '3',
                        icon: <SyncOutlined />,
                        label: 'Server to Server Callback',
                    },
                    {
                        key: '4',
                        icon: <SyncOutlined />,
                        label: 'Check Status',
                    },
                    ]}
                />
        </Sider>
      ) : (
        <>
          <Button
             type="primary"
             icon={<MenuOutlined />}
             onClick={toggleDrawer}
             style={{ position: 'fixed', left: 0, top: 0, zIndex: 1000, backgroundColor: 'white', color: 'black' }}
          />

          <Drawer
            title="Menu"
            placement="left"
            closable={true}
            onClose={toggleDrawer}
            open={visible}
          >
            <Menu
                mode="inline"
                defaultSelectedKeys={[selectedKey]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={({ key }) => handleMenuClick(key)}
                items={[
                {
                    key: '1',
                    icon: <CodeOutlined />,
                    label: 'API Integration',
                },
                {
                    key: '2',
                    icon: <CodeOutlined />,
                    label: 'PAY API',
                },
                {
                    key: '2',
                    icon: <SyncOutlined />,
                    label: 'Server to Server Callback',
                },
                {
                    key: '3',
                    icon: <SyncOutlined />,
                    label: 'Check Status',
                },
                ]}
            />
          </Drawer>
        </>
      )}

      {/* Payment API Content */}
      <Layout.Content style={{ padding: '0px' }}>
          {content}
      </Layout.Content>


      {/* {!isMobile && (
        <Sider
          width={300}
          style={{
            background: 'grey',
            position: 'fixed',
            right: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            color: '#fff',
          }}
          className="right-sidebar"
        >
          <Affix offsetTop={10}>
            <div>
              <Title level={4} style={{ color: '#fff' }}>Node.js</Title>
              <pre style={{ color: '#fff', background: '#333', padding: '16px' }}>
                {`
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://python-uat.oyefin.com/api/pg/prod/v1/pay/',
  headers: { 'Content-Type': 'application/json' },
  data: {
    // your data here
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});
                `}
              </pre>
            </div>
          </Affix>
        </Sider>
      )} */}
    </Layout>
  
  </>

    );
};
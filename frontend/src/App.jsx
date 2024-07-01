import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';


import AuthContext from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';
import ShowCapturedMap from './pages/ShowCaptured';
import CaptureMap from './pages/CaptureMap';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './components/Logout';

const { Header, Content } = Layout;
const { Title } = Typography;

const MenuItems = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    const items = isAuthenticated
    ? [
        { key: 'home', label: 'Home', path: '/home', icon: <HomeOutlined /> },
        { key: 'capturemap', label: 'Capture', path: '/capture', icon: <PlusOutlined /> },
        { key: 'logout', label: 'Logout', onClick: logout, icon: <LogoutOutlined /> },
    ]
    : [
        { key: 'login', label: 'Login', path: '/login', icon: <LoginOutlined /> },
        { key: 'register', label: 'Register', path: '/register', icon: <UserAddOutlined /> },
    ];

    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {items.map((item) =>
          item.onClick ? (
            <Menu.Item key={item.key} onClick={item.onClick} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ) : (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    );
  };

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login />} />
    </Routes>
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/capture" element={<CaptureMap />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/maps/:mapId" element={<ShowCapturedMap />} />
      <Route path="/show-captured" element={<ShowCapturedMap />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            wordSpacing: '10px',
            backgroundColor: '#001529',
            padding: '0 24px',
          }}
        >
          <Title level={3} style={{ color: 'white', margin: 0, lineHeight: '64px', marginRight: "20px" }}>
            GeoSnapCap
          </Title>
          <MenuItems />
        </Header>
        <Content style={{ padding: '0 48px', backgroundColor: '#fff' }}>
          <div
            style={{
              backgroundColor: '#fff',
              minHeight: 280,
              padding: 24,
              borderRadius: '8px',
            }}
          >
            <AppRoutes />
          </div>
        </Content>
      </Layout>
    </AuthProvider>
  );
};

export default App;

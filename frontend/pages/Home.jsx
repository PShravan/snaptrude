import React, { useState, useEffect } from 'react';
import { Layout, Typography, message, List, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const [savedMaps, setSavedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    fetchSavedMaps();
  }, []);

  const fetchSavedMaps = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/maps');
      setSavedMaps(response.data);
    } catch (error) {
      message.error('Failed to retrieve saved maps');
    }
  };

  const handleMapSelect = (map) => {
    setSelectedMap(map);
  };

  return (
    <Layout>
      <Header>
        <Title style={{ color: 'white' }}>Snaptrude Capture</Title>
      </Header>
      <Content style={{ padding: '20px' }}>
        <Button type="primary" onClick={fetchSavedMaps} style={{ marginTop: '10px' }}>
          Refresh Saved Maps
        </Button>
        <List
          style={{ marginTop: '20px' }}
          header={<div>Saved Maps</div>}
          bordered
          dataSource={savedMaps}
          renderItem={item => (
            <List.Item onClick={() => handleMapSelect(item)}>
              <Link to={'/maps/' + item._id}>
                <Typography.Text>{item._id} -- {item.createdAt}</Typography.Text>
              </Link>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Home;

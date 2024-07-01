import React, { useState, useEffect } from 'react';
import { Typography, message, List, Button, Image, Card } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const { Meta } = Card;

const Home = () => {
  const [savedMaps, setSavedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  const fetchSavedMaps = async () => {
    try {
      if (localStorage.token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      }
      const response = await axios.get('http://localhost:5555/api/maps');
      setSavedMaps(response.data);
    } catch (error) {
      message.error('Failed to retrieve saved maps');
    }
  };

  useEffect(() => {
    fetchSavedMaps();
  }, []);

  const handleMapSelect = (map) => {
    setSelectedMap(map);
  };

  return (
    <>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  width={100}
                  height={100}
                  src={`data:image/png;base64,${item.image}`}
                  alt="map thumbnail"
                  style={{ marginRight: '10px'}}
                />
                <div style={{ marginLeft: '10px' }}>
                  <Typography.Text>
                    Region: {item.region.join(', ')}
                  </Typography.Text>
                  <br />
                  <Typography.Text>
                    Timestamp: {moment(item.createdAt).format('h:mm A, MMMM Do YYYY')}
                  </Typography.Text>
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;

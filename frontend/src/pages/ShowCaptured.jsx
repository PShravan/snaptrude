import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, message } from 'antd';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import BabylonComponent from '../components/BabylonComponent';

const { Title } = Typography;

const ShowCapturedMap = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const params = useParams();
  const mapId = params.mapId;
  const [capturedImage, setCapturedImage] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMapDetail();
    }
  }, [isAuthenticated]);

  const fetchMapDetail = async () => {
    setLoading(true);
    try {
      if (localStorage.token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      }
      const response = await axios.get(process.env.REACT_APP_BACKEND_DOMAIN + '/api/maps/' + mapId);
      const mapData = response.data;
      setCapturedImage(`data:image/png;base64,${mapData.image}`);
      setRegion(mapData.region);
    } catch (error) {
      message.error('Failed to retrieve map details');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Spin spinning={loading}>
        {capturedImage && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Title level={4}>Captured Image Applied to 3D Cuboid</Title>
              <BabylonComponent imageUrl={capturedImage} />
            </div>
            <div>
              <Title level={4}>Selected Map</Title>
              <div style={{ textAlign: 'center' }}>
                <img src={capturedImage} alt="Selected Map" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
              </div>
            </div>
          </div>  
        )}
      </Spin>
    </div>
  );
};

export default ShowCapturedMap;

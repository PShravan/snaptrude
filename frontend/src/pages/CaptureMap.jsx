import React, { useState, useContext } from 'react';
import { Layout, Typography, message } from 'antd';
import html2canvas from 'html2canvas';
import axios from 'axios';

import AuthContext from '../context/AuthContext';
import MapComponent from '../components/MapComponent';
import BabylonComponent from '../components/BabylonComponent';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const CaptureMap = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [capturedImage, setCapturedImage] = useState(null);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCapture = async (bounds) => {
    setLoading(true);
    
    const googleMapElement = document.getElementById("google-map")
    setRegion(bounds);
    html2canvas(googleMapElement, { useCORS: true }).then(async (canvas) => {
      const imageUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageUrl);
      await saveMapData(imageUrl, bounds);
    });
  };

  const saveMapData = async (imageUrl, region) => {
    try {
      const formData = new FormData();
      const blob = await fetch(imageUrl).then(res => res.blob());
      formData.append('image', blob, 'map.png');
      formData.append('region', region);
      
      if (localStorage.token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
      }
      await axios.post(process.env.REACT_APP_BACKEND_DOMAIN + '/api/map/capture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        setLoading(false);
        message.success('Map data saved successfully');
        navigate('/maps/' + res.data.data._id);
      });
    } catch (error) {
      setLoading(false);
      console.error('Failed to save map data', error);
      message.error('Failed to save map data');
    }
  };

  return (
    <>
      <MapComponent onCapture={handleCapture} />
      {capturedImage && (
        <div style={{ marginTop: '20px' }}>
          <Title level={4}>Captured Image Applied to 3D Cuboid</Title>
          <BabylonComponent imageUrl={capturedImage} />
        </div>
      )}
    </>
  );
};

export default CaptureMap;

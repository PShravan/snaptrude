import React, { useState } from 'react';
import { Layout, Typography, message } from 'antd';
import html2canvas from 'html2canvas';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import BabylonComponent from '../components/BabylonComponent';
import { useNavigate } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

const { Header, Content } = Layout;
const { Title } = Typography;

const CaptureMap = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleCapture = async (bounds) => {
    setLoading(true);
    const googleMapElement = document.querySelector('.gm-style');
    setRegion(bounds);
    html2canvas(googleMapElement).then(async (canvas) => {
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

      await axios.post('http://localhost:5555/api/map/capture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        setLoading(false);
        message.success('Map data saved successfully');
        navigate('/home');
      });
    } catch (error) {
      setLoading(false);
      console.error('Failed to save map data', error);
      message.error('Failed to save map data');
    }
  };

  return (
    <>
      <Layout>
        <Header>
          <Title style={{ color: 'white' }}>Snaptrude Capture</Title>
        </Header>
        <Content style={{ padding: '20px' }}>
          <MapComponent onCapture={handleCapture} />
          {capturedImage && (
            <div style={{ marginTop: '20px' }}>
              <Title level={4}>Captured Image Applied to 3D Cuboid</Title>
              <BabylonComponent imageUrl={capturedImage} />
            </div>
          )}
        </Content>
      </Layout>
    </>
  );
};

export default CaptureMap;

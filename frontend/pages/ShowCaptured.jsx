import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import BabylonComponent from '../components/BabylonComponent';
import axios from 'axios';

const { Title } = Typography;

const ShowCapturedMap = () => {
  const params = useParams(); 
  const mapId = params.mapId

  const [capturedImage, setCapturedImage] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    fetchMapDetail();
  }, []);

  const fetchMapDetail = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/maps/' + mapId);
      const mapData = response.data;
      setCapturedImage(`data:image/png;base64,${mapData.image}`);
      setRegion(mapData.region);
    } catch (error) {
      message.error('Failed to retrieve saved maps');
    }
  };

  return (
    <>
      <div>
        {capturedImage && (
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Captured Image Applied to 3D Cuboid</Title>
            <BabylonComponent imageUrl={capturedImage} />
          </div>
        )}
        {capturedImage && (
          <div style={{ marginTop: '20px' }}>
            <Title level={4}>Selected Map</Title>
            <div>
              <img src={capturedImage} alt="Selected Map" style={{ width: '100%' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowCapturedMap;

import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Button } from 'antd';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 21.76,
  lng: 78.87
};

const MapComponent = ({ onCapture }) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY // Add your API key here
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleCapture = () => {
    const googleMap = mapRef.current;
    const bounds = googleMap.getBounds().toUrlValue();
    onCapture(bounds);
  };

  return isLoaded ? (
    <>
      <div id="google-map">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </div>
      <Button type="primary" onClick={handleCapture} style={{ marginTop: '10px' }}>
        Capture Region
      </Button>
    </>
  ) : <></>;
};

export default React.memo(MapComponent);

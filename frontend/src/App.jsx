import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CaptureMap from '../pages/CaptureMap';
import ShowCapturedMap from '../pages/ShowCaptured';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/capture' element={<CaptureMap />} />
      <Route path='/maps/:mapId' element={<ShowCapturedMap />} />
    </Routes>
  );
};

export default App;

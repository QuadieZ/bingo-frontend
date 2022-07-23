import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Bingo, Home } from './Pages';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/bingo" element={<ProtectedRoutes><Bingo /></ProtectedRoutes>} />
    </Routes>
  );
}

export default App;

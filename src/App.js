import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { Bingo, Home } from './Pages';

function App() {
  const [completed, setCompleted] = useState()
  const [isBingo, setIsBingo] = useState()

  return (
    <Routes>
      <Route exact path="/" element={<Home setCompleted={setCompleted} setIsBingo={setIsBingo} />} />
      <Route exact path="/bingo" element={<ProtectedRoutes><Bingo completed={completed} isBingo={isBingo} setCompleted={setCompleted} /></ProtectedRoutes>} />
    </Routes>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/langingPage/landingPage';
import HomePage from './components/homePage/homePage';
import CreateActivity from './components/createActivity/createActivity';
import Detail from './components/detail/detail'
import style from './App.css' 

function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/activities" element={<CreateActivity />} />
        <Route path="/detail/:id" element={<Detail/>}/>
     </Routes>
    </div>
  );
}

export default App;
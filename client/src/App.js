import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './theme/styles.css';
import {CourseVisualizer} from './components/CourseVisualizer';
import {Navbar} from './components/Navbar';
import {Login} from './components/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Login/>
        </>
      }/>
      <Route path="/dashboard" element={
        <div className="App">
        <Navbar />
        <CourseVisualizer />
      </div>
      }/>
    </Routes>
    
  );
}

export default App;
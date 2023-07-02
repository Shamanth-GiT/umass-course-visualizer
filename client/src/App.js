import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './theme/styles.css';
import {CourseVisualizer} from './components/CourseVisualizer';
import {Navbar} from './components/Navbar';
import {Login} from './components/Login';
import {Discovery} from './components/Discovery';

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
      <Route path="/discovery" element={
        <>
          <Navbar />
          <Discovery />
        </>
      }/>
    </Routes>
  );
}

export default App;
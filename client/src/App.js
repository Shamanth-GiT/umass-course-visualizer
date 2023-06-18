import React from 'react';
import './styles.css';
import {CourseVisualizer} from './CourseVisualizer';
import {Navbar} from './Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <CourseVisualizer />
    </div>
  );
}

export default App;
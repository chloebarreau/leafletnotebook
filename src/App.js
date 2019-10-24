import React from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload';

function App() {
  return (
    <div>
      <header>
        <p>
          Hello! This will be the fun abode of Chloe and Grace CS106. 
        </p>
        
        Image Upload
        <Upload />
      </header>
    </div>
  );
}

export default App;

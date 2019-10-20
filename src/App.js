import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello! This will be the fun abode of Chloe and Grace CS106. 
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <button class="ui button" class="ui blue button">
          <i class="upload icon"></i> Upload 
          
        </button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

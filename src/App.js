import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextEditor from './components/TextEditor';
import Tools from './components/Tools';
import { Grid, Icon, Menu, Segment, Sidebar, Modal, Button,} from 'semantic-ui-react'

function App() {

  return (
    <div>
      <Tools />
    </div>
  );
}

export default App;

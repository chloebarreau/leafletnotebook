import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TextEditor from './components/TextEditor';
import Tools from './components/Tools';
import { Grid, Icon, Menu, Segment, Sidebar, Modal, Button,} from 'semantic-ui-react'

function App() {

  return (
<HashRouter>
        <Route path="/" component={Tools} />
    </HashRouter>
  );
}

export default App;



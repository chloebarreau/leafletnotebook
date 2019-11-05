import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextEditor from './components/TextEditor';
import Tools from './components/Tools';
import { Grid, Icon, Menu, Segment, Sidebar,} from 'semantic-ui-react'

function App() {

  return (
    <div>
      
      <Menu secondary attached='top'>
        <Menu.Item>
          🌱Leaflet Notebook
        </Menu.Item>
      </Menu>
{/*}
      <Grid>
        <Grid.Column style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
          <Segment>
            This is an stretched grid column. Editable transcript text and/or notes rendering can go here.
          </Segment>
        </Grid.Column>
      </Grid>
  */}
      <Tools />

    </div>
  );
}

export default App;

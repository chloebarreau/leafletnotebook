import React from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload';
import { Grid, Icon, Menu, Segment } from 'semantic-ui-react'

function App() {

  return (
    
    <div>
      <Menu attached='top'>
        <Menu.Item
        >
          🌱Leaflet Notebook
        </Menu.Item>
        <Menu.Menu position='right'></Menu.Menu>
        
        <Menu.Menu position='right'>
        <div className='ui right aligned category item'>
        <Upload />
        </div>
      </Menu.Menu>
      </Menu>
      
      <Grid>
        <Grid.Column style = {{display: 'flex',  justifyContent:'center', alignItems:'center', margin: '10px'}}>
          <Segment>
            This is an stretched grid column. Editable transcript text and/or notes rendering can go here.
          </Segment>
        </Grid.Column>
      </Grid>

      <Grid columns={2} divided style = {{margin: '10px'}}>
    <Grid.Row stretched>
      <Grid.Column>
        <Segment>1</Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>1</Segment>
        <Segment>2</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </div>
  );
}

export default App;

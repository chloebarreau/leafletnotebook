import React from 'react';
import Upload from './Upload'
import TextEditor from './TextEditor'
import News from './News';
import { Grid, Icon, Menu, Segment, Header } from 'semantic-ui-react'

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleText: "Upload your audio file and an image of your notes"
    };
    this.handleResultChange = this.handleResultChange.bind(this);
  }

  handleResultChange(data) {
    this.setState({
      sampleText: data
    });
  }

  render() {
    var text = this.state.sampleText; // JSON.parse(this.state.sampleText);


    return (
      <div>
        <Grid columns={2} style={{ margin: '10px' }}>
          <Grid.Row stretched>
            <Grid.Column width={11}>
              <Segment style={{ overflow: 'auto', maxHeight: '93vh' }}>
                <h3>{this.state.sampleText}</h3>
                <p>Highlight some words and click "Search Highlight" to find news stories related to those words!</p>
              </Segment>
              {/*<TextEditor />  ADD  BACK IN WHEN READY */}
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
              <Header as='h3'>Notes</Header>
                <Upload onDataFetched={this.handleResultChange} />
              </Segment>
              <Segment>
              <Header as='h3'>Quote Bank</Header>
              </Segment>
              <Segment style={{ overflow: 'auto', maxHeight: '58vh' }}>
                <News />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Tools;
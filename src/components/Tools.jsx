import React from 'react';
import Upload from './Upload'
import TextEditor from './TextEditor'
import { Grid, Icon, Menu, Segment } from 'semantic-ui-react'

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
        <Grid columns={2} divided style={{ margin: '10px' }}>
          <Grid.Row stretched>
            <Grid.Column width={10}>
              <Segment>{this.state.sampleText}</Segment>
              {/*<TextEditor />  ADD  BACK IN WHEN READY */}
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment>
                <Upload onDataFetched={this.handleResultChange} />
              </Segment>
              <Segment>2</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Tools;
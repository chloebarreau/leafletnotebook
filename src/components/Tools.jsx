import React from 'react';
import Upload from './Upload'
import TextEditor from './TextEditor'
import News from './News';
import QuoteBank from './QuoteBank';
import { Grid, Menu, Header, Segment, Modal, Tab, Button } from 'semantic-ui-react'

const  panes = [
  { menuItem: 'Tab 1', render: () => <Upload onDataFetched={this.handleResultChange}/>},
  { menuItem: 'Tab 2', render: () => <QuoteBank /> },
  { menuItem: 'Tab 3', render: () => <Segment style={{ overflow: 'auto', maxHeight: '50vh' }}><News /></Segment>},
]

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleText: "Upload your audio file and an image of your notes",
      uploaded: "false",
      quotes: ""
    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleHighlightClick = this.handleHighlightClick.bind(this);
  }

  handleResultChange(data) {
    this.setState({
      sampleText: data
    });
  }

  handleUpload() {
    this.setState({
      uploaded: "true"
    });
  }

  handleHighlightClick() {
    this.setState({ quotes: "There are certain things that jump out to me about these incidents."}, function () {
      console.log("added");
    });
  }

  render() {
    var text = this.state.sampleText; // JSON.parse(this.state.sampleText);

    return (
      <div>

      <Menu secondary attached='top'>
        <Menu.Item>
          🌱LEAFLET NOTEBOOK
        </Menu.Item>  
        <Menu.Item position='right'>
        <Modal style={{alignItems: 'center', margin: 'auto',}} trigger={<Button><i class="upload icon"></i>Upload</Button>}>
          <Header icon='upload' content='Upload Audio and Notes' />
            <Modal.Description>
                <button type="submit" class="ui blue button" onClick={this.handleUpload}>
                  Transcribe audio
                </button>
                <Upload onDataFetched={this.handleResultChange}/>
            </Modal.Description>
          </Modal>
        </Menu.Item>      
      </Menu>    

        <Grid columns={2} style={{ margin: '10px' }}>
          <Grid.Row stretched>
            <Grid.Column width={11}>
              <Segment style={{ overflow: 'auto', maxHeight: '90vh' }}>
                <h3>{this.state.sampleText}</h3>
                {this.state.uploaded == "true" && <div>
                <p>SHAPIRO: You were one of 18 people in the top one-tenth of 1% who signed a letter supporting a wealth tax for households with $50 million or more in assets. Just briefly, why?</p>
    <p>DISNEY: Well, nothing in history ever moved forward just because people advocated for their own interests. Things really change when people are traitors to their class. And my class needs some really good traitors these days.</p>
    <p>SHAPIRO: Have you been treated as a traitor for signing this letter?</p>
    <p>DISNEY: Oh, my goodness gracious, yes.</p>
    <p>SHAPIRO: Really?</p>
    <p>DISNEY: But, you know, it is just really important. We're not in a democracy all assigned with the task of advocating for ourselves. We're assigned with the task of trying to create the best and strongest and fairest country we can create. And what I've watched over the last 30 years is rich people going from terribly rich to awfully rich to obscenely and insanely rich. And we have to draw a line.</p>
    <p>SHAPIRO: If you and your cohort of wealthy individuals gave your money to philanthropic causes instead of being taxed, you could direct it to education or homelessness or whatever your cause may be. Why would you rather see it go to the federal government?</p>
    <p>DISNEY: Here's the world I want to live in. I want to live in a world that doesn't need philanthropy. And if Jeff Bezos earned less and paid his people more and didn't have $37 billion to put into a philanthropy and figure out what to do with, there really wouldn't be that much of the philanthropy that was needed. I would rather not to be needed as a philanthropist. And I will never stop feeding the hungry and housing the homeless and all the other things that I want to do.</p>
    <p>But I would so much prefer that public schools function, that roads don't break your axles, you know, that people have health care - which they have a right to have - that low-income people who work full-time at minimum wage don't need food stamps to get through their days. That's the world I want to live in.</p>
    <p>SHAPIRO: On an issue that is related but separate, I want to ask about your very public criticism of the current CEO of Disney for his compensation package. You have no formal role with the Disney Company. For people who have not been following this very public back-and-forth, what is the nut of your critique here?</p>
    <p>DISNEY: The nut of my critique is that I know that company pretty well? Obviously, it's a big, sophisticated company. And it's grown a lot since I, you know, worked sort of in a way with it. When you're in what is setting up to be the largest media and entertainment conglomerate on the planet in the history of the world...</p>   </div>} </Segment>
              {/*<TextEditor />  ADD  BACK IN WHEN READY */}
            </Grid.Column>
            <Grid.Column width={5}>

              <Tab menu={{ secondary: true, pointing: true }} 
              panes = {[
                { menuItem: 'Notes', render: () => <Segment></Segment>},
                { menuItem: 'Quotebank', render: () => <QuoteBank /> },
                { menuItem: 'News', render: () => <Segment style={{ overflow: 'auto', maxHeight: '70vh' }}><News /></Segment>},
              ]}
              />

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Tools;
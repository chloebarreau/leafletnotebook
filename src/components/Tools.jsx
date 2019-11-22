import React from 'react';
import UploadNotes from './UploadNotes'
import UploadAudio from './UploadAudio'
import TextEditor from './TextEditor'
import News from './News';

import QuoteBank from './QuoteBank';
import { Grid, Menu, Header, Segment, Modal, Tab, Button, Icon } from 'semantic-ui-react'

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      uploaded: "false",
      quotes: "",

      audioURL: '', // added
      audioText: [], // DEMO: '1::  Okay, we can just I definitely do think ', "2:: that my time here. I've definitely felt like my disability has been more of a concern in the end, you know that in a positive way. Like I feel more looked after then I ", "1:: have an any educational institution. That's wonderful. That's crazy. And even like like this is such a good dumb example, but like on like the row every house is accessible at least the first floor. Oh, wow, like that's not something that you will find. ", '2:: Our ', "1:: universities. Yeah, and so the idea like even like if I don't ", "2:: want to go like I'd say, I don't want to go to a party like I don't know but the idea ", "1:: that I it's it's a choice I get to make whether I ", "2:: want to go or not, right? That's a really large. Yeah privilege. I don't I wouldn't have gotten really anywhere ", "1:: else. Yeah, like that's awesome. Yeah, I didn't even realize that that's right. Like I because I was driving to the like the dumb president reception. That was such a dumb event. Oh, yeah, you guys had to go to the
      timestamps: [],
      uploaded: "false",

      imageURL: '',
      imageText: '',
      uploadedNotes: "true",

    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleHighlightClick = this.handleHighlightClick.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    // Calling a function on the Child DOM element
    this.uploadInput.focus();
  }


  handleUploadAudio(ev) { //added
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        console.log(body.text);
        this.setState({
          audioURL: "http://localhost:5000/static/" + body.filename,
          audioText: body.text,
          timestamps: body.timestamps,
          uploaded: "true"
        });

        console.log("Video transcript: " + this.state.audioText);
        console.log("Timestamps: " + this.state.timestamps);
      });
    });
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        console.log(body.text);
        this.setState({
          imageURL: "http://localhost:5000/static/" + body.filename,
          imageText: body.text,
          uploadedNotes: "true"
        });
        console.log(this.state.imageText);
      });
    });
  }

  handleClickDemo() {
    this.setState({
      uploadedNotes: "true"
    });
  }

  setRef(ref) {
    this.uploadInput = ref;
  }

  handleResultChange(data) {
    data = data.substring(0, data.indexOf(".flac"));
    this.setState({
      title: data
    });
  }

  handleUpload() {
    this.setState({
      uploaded: "true"
    });
  }

  handleHighlightClick() {
    this.setState({ quotes: "There are certain things that jump out to me about these incidents." }, function () {
      console.log("added");
    });
  }

  render() {
    return (
      <div>
        <Grid columns={2} style={{ margin: '10px' }}>
          <Grid.Row>
            <Grid.Column width={11}>
              <Menu secondary>
                <Menu.Item>
                  <span className="large-text">Leaflet</span>
                </Menu.Item>
                <Menu.Item position='right'>
                  <Modal style={{ alignItems: 'center', margin: 'auto', }} trigger={<Button className="light-green-btn">Upload</Button>}>
                    <Header icon='upload' content='Upload Audio and Notes' />
                    <Modal.Description>
                      <button type="submit" class="ui blue button" onClick={this.handleUpload}>
                        Transcribe audio
                </button>
                      
                    </Modal.Description>
                  </Modal>
                </Menu.Item>
              </Menu>

          

              <UploadAudio
                onDataFetched={this.handleResultChange}
                title={this.state.title}
                setRef={this.setRef}
                handleUploadAudio={this.handleUploadAudio.bind(this)}
                audioURL={this.state.audioURL}
                audioText={this.state.audioText}
                timestamps={this.state.timestamps}
                uploaded={this.state.uploaded}
              />
              {/*}
              <Segment className="no-border" style={{ overflow: 'auto', maxHeight: '90vh' }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <h2>{this.state.title}</h2>
                  <div className="right-btn">
                    <Button icon size='mini' onClick={this.downloadTxtFile}><Icon name='share square outline icon' /></Button>
                  </div>
                </div>
                <UploadAudio onDataFetched={this.handleResultChange} />
              </Segment>

    */}
              {/* FOR DEMO PURPOSES!!!
            <button type="submit" class="ui button" class="ui blue button" onClick={this.handleUpload}>
            <i class="upload icon"></i> Upload and Transcribe
            </button>
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
    <p>DISNEY: The nut of my critique is that I know that company pretty well? Obviously, it's a big, sophisticated company. And it's grown a lot since I, you know, worked sort of in a way with it. When you're in what is setting up to be the largest media and entertainment conglomerate on the planet in the history of the world...</p>   </div>} 
    */}

              {/*<TextEditor />  ADD  BACK IN WHEN READY */}
            </Grid.Column>

            <Grid.Column width={5}>
              <span className="green-background">
                <div className="smallMargin">
                  <Tab menu={{ secondary: true, pointing: true }}
                    panes={[
                      {
                        menuItem: 'Notes', render: () => <div style={{ maxHeight: "90vh", overflow: "auto" }}>
                          <UploadNotes
                        onDataFetched={this.handleResultChange}
                        title={this.state.title}
                        setRef={this.setRef}
                        handleUploadImage={this.handleUploadImage.bind(this)}
                        imageURL={this.state.imageURL}
                        imageText={this.state.image}
                        timestamps={this.state.timestamps}
                        uploaded={this.state.uploadedNotes} 
                        handleClickDemo={this.state.handleClickDemo}/>
                        </div>
                      },
                      { menuItem: 'Quote Bank', render: () => <div style={{ maxHeight: "90vh", overflow: "auto" }}><QuoteBank /></div> },
                      { menuItem: 'News', render: () => <div style={{ maxHeight: "90vh", overflow: "auto" }}><News /></div> },
                    ]}
                  />
                </div>
              </span>
            </Grid.Column>

          </Grid.Row>
          {/*}
          <figure>
              <figcaption>Listen to the T-Rex:</figcaption>
              <audio 
                  controls
                  src="../S2_EP2.mp3">
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
          </figure>
                  */}
        </Grid>
      </div>
    );
  }
}

export default Tools;
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
      quotes: "",

      audioURL: '', // added
      audioText: ['1::  Okay, we can just I definitely do think ', "2:: that my time here. I've definitely felt like my disability has been more of a concern in the end, you know that in a positive way. Like I feel more looked after then I ", "1:: have an any educational institution. That's wonderful. That's crazy. And even like like this is such a good dumb example, but like on like the row every house is accessible at least the first floor. Oh, wow, like that's not something that you will find. ", '2:: Our ', "1:: universities. Yeah, and so the idea like even like if I don't ", "2:: want to go like I'd say, I don't want to go to a party like I don't know but the idea ", "1:: that I it's it's a choice I get to make whether I ", "2:: want to go or not, right? That's a really large. Yeah privilege. I don't I wouldn't have gotten really anywhere ", "1:: else. Yeah, like that's awesome. Yeah, I didn't even realize that that's right. Like I because I was driving to the like the dumb president reception. That was such a dumb event. Oh, yeah, you guys had to go to the"],
      timestamps: [],
      roundedTimestamps: [],
      uploaded: "false",

      imageURL: '',
      imageText: '',
      uploadedNotes: "true", // TRUE FOR DEMO, CHANGE TO FALSE FOR REAL USE

      highlighted: "fox",
      myRequestedRefs: {}
    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleHighlightClick = this.handleHighlightClick.bind(this);
    this.setRef = this.setRef.bind(this);

    this.playWord = this.playWord.bind(this);
    this.playQuote = this.playQuote.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.addHighlight = this.addHighlight.bind(this);
    this.getRefsFromChild = this.getRefsFromChild.bind(this);
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
        
        console.log("before rounding")
        var roundedTimestamps = [];
        if (this.state.timestamps.length > 0) {
          this.state.timestamps.forEach(roundTimestamps);
        }
        function roundTimestamps(item) {
          roundedTimestamps.push(Math.round(item));
        }
        this.setState({ roundedTimestamps: roundedTimestamps });

        console.log(this.state.roundedTimestamps)

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

  addHighlight = (event) => {
    //console.log(event.target.currentTime)
      var allTimes = this.state.timestamps,
        goal = event.target.currentTime;

      var closestTime = allTimes.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });

      var wordIndex = this.state.timestamps.indexOf(closestTime) + 1;
      //var wordToHighlight = this.refs[wordIndex].innerText;
      this.setState({ highlighted: wordIndex.toString() });
  }

  keyPress(event) {
    switch (event.keyCode) {
      case 32: // space bar       
        event.preventDefault();
        if (this.state.playing) {
          this.audio.pause();
          this.setState({ playing: false })
        } else {
          this.audio.play();
          this.setState({ playing: true })
        }
        break;
      case 37: // left arrow key; rewinds by 5 secs
        this.audio.currentTime -= 5;
        break;
      case 39: // right arrow key; skips 5 secs
        this.audio.currentTime += 5;
        break;
    }
  }

  playWord(event) { // plays word when clicked, only works for audio files < 1 min
    const id = event.target.id;
    const seconds = this.state.timestamps[id];
    console.log(id, seconds);
    this.audio.currentTime = seconds;
    this.audio.play();
  }

  playQuote(event) { // plays word when clicking on timestamp in transcript
    const note = event.currentTarget.textContent;
    const indexColon = note.indexOf(":");
    console.log("colon index: " +indexColon)
    var timestamp = note.substring(indexColon + 1);
    timestamp = parseInt(timestamp)
    this.audio.currentTime = timestamp;
    this.audio.play();
  }

  getRefsFromChild(childRefs) {
    this.setState({
      myRequestedRefs: childRefs
    });
    console.log("requested refs:" + childRefs["word0"]); // this should have *info*, *contact* as keys
  }  

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress, false);
    this.audio.addEventListener("timeupdate", this.addHighlight, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress, false);
    this.audio.removeEventListener("timeupdate", this.addHighlight, false);
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
                  {this.state.uploaded && this.state.uplaodedNotes && <Modal style={{ alignItems: 'center', margin: 'auto', }} trigger={<Button className="light-green-btn">Upload</Button>}>
                    <Header icon='upload' content='Upload Audio and Notes' />
                    <Modal.Description>
                      <button type="submit" class="ui blue button" onClick={this.handleUpload}>
                        Transcribe audio
                </button>
                      
                    </Modal.Description>
                  </Modal>}
                </Menu.Item>
              </Menu>

          

              <UploadAudio
                highlighted={this.state.highlighted}
                playWord={this.playWord.bind(this)}
                passRefUpward={this.getRefsFromChild} 

                onDataFetched={this.handleResultChange}
                title={this.state.title}
                setRef={this.setRef}
                handleUploadAudio={this.handleUploadAudio.bind(this)}
                audioURL={this.state.audioURL}
                audioText={this.state.audioText}
                timestamps={this.state.timestamps}
                roundedTimestamps={this.state.roundedTimestamps}
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

            <TextEditor audioText={this.state.audioText.join()}/> 
            </Grid.Column>

            <Grid.Column width={5}>
              <span className="green-background">
                <div className="smallMargin">
                  <Tab menu={{ secondary: true, pointing: true }} renderActiveOnly={false} 
                    panes={[
                      {
                        menuItem: 'Notes', pane: <Tab.Pane style={{ maxHeight: "90vh", overflow: "auto"}}>
                          <UploadNotes
                        playQuote={this.playQuote}
                        onDataFetched={this.handleResultChange}
                        title={this.state.title}
                        setRef={this.setRef}
                        handleUploadImage={this.handleUploadImage.bind(this)}
                        imageURL={this.state.imageURL}
                        imageText={this.state.image}
                        timestamps={this.state.timestamps}
                        roundedTimestamps={this.state.roundedTimestamps}
                        uploaded={this.state.uploadedNotes} 
                        handleClickDemo={this.state.handleClickDemo}/>
                        </Tab.Pane>
                      },
                      { menuItem: 'Quote Bank', pane: <Tab.Pane attached><div style={{ minHeight: "80vh", maxHeight: "90vh", overflow: "auto" }}><QuoteBank /></div></Tab.Pane> },
                      { menuItem: 'Related News', pane: <Tab.Pane attached><div style={{ maxHeight: "90vh", overflow: "auto" }}><News /></div> </Tab.Pane>},
                    ]}
                  />
                </div>
              </span>
            </Grid.Column>

          </Grid.Row>
          <figure>
            <audio id="audio" ref={(audio) => { this.audio = audio }} controls currentTime="5"
              src="http://localhost:5000/static/fieldinterview.flac"> {/*{this.props.audioURL} FOR FINAL*/}
              Your browser does not support the
              <code>audio</code> element.
              </audio>
          </figure>
        </Grid>
      </div>
    );
  }
}

export default Tools;
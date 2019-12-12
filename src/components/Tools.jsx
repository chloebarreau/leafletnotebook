import React from 'react';
import UploadNotes from './UploadNotes'
import UploadAudio from './UploadAudio'
import News from './News';

import QuoteBank from './QuoteBank';
import { Grid, Menu, Header, Segment, Modal, Tab, Button, Icon } from 'semantic-ui-react'

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Interview with Joey",
      quotes: "",

      audioURL: '', // added
      audioText: ['1::  I definitely do think ', '2:: that my time here. I definitely felt like my disability has been more of a concern in the end, you know that in a positive way. Like I feel more looked after than I ', "1:: have in any educational institution. That's wonderful. That's crazy. And even like like this is the to go dumb example, but like", "2:: on like the row every house is accessible at least the first floor. Oh, wow, like that's not something that you will find at other universities.", "1:: Yeah. Yeah, and so like the idea like even like if I don't ", "2:: want to go like I'd say, I don't want to go too far. Like I don't know but ", "1:: the idea that I it's it's a choice I get to make whether I ", "2:: want to go or not, right? That's a really large. Yeah privilege. I don't I wouldn't have gotten really anywhere else. Yeah, like that's awesome. Yeah, I ", "1:: didn't even realize that that's and like I because I was driving to the"],
      timestamps: [0, 0.2, 0.3, 0.8, 1.0, 1.3, 2.4, 2.7, 3.1, 4.1, 4.4, 4.7, 4.9, 5.7, 6.3, 6.8, 7.0, 7.5, 7.9, 8.0, 8.0, 9.1, 9.2, 9.3, 9.5, 9.5, 9.6, 9.8, 9.9, 9.9, 10.5, 10.6, 11.3, 11.5, 11.8, 12.3, 12.5, 12.8, 13.0, 13.1, 14.1, 14.4, 14.6, 15.2, 15.7, 15.9, 16.5, 16.7, 18.2, 18.4, 18.7, 19.9, 20.1, 20.3, 20.3, 20.5, 20.6, 20.8, 21.0, 21.5, 21.6, 22.2, 22.4, 22.7, 22.9, 23.6, 24.0, 24.3, 24.5, 24.9, 25.0, 25.2, 25.3, 25.5, 26.0, 26.2, 27.0, 27.3, 27.5, 27.7, 28.0, 28.2, 28.3, 28.4, 28.7, 28.7, 28.9, 29.6, 30.0, 30.5, 31.5, 31.6, 31.8, 31.9, 32.2, 32.6, 32.9, 33.0, 33.2, 33.2, 33.4, 33.6, 33.7, 33.8, 34.1, 34.3, 34.5, 34.6, 34.7, 34.9, 34.9, 35.0, 35.1, 35.3, 35.6, 35.6, 35.8, 36.5, 36.9, 37.0, 37.2, 37.4, 37.7, 37.9, 38.2, 38.3, 38.9, 39.1, 39.3, 39.4, 39.7, 40.0, 40.1, 40.4, 40.5, 40.6, 40.7, 41.1, 41.7, 42.0, 42.0, 42.4, 43.0, 43.2, 43.7, 43.8, 44.4, 44.5, 44.8, 44.9, 45.2, 45.4, 45.7, 45.9, 46.2, 46.6, 46.8, 47.6, 47.8, 47.9, 48.0, 48.5, 48.8, 49.2, 49.5, 49.7, 49.9, 50.2, 50.5, 50.5, 50.7, 51.1, 51.3],
      convertedTimestamps: ["0.00", "0.2", "0.3", "0.8", "1.0", "0:01", "2.4", "2.7", "3.1", "4.1", "4.4", "4.7", "4.9", 5.7, 6.3, 6.8, 7.0, 7.5, 7.9, 8.0, 8.0, 9.1, 9.2, 9.3, 9.5, 9.5, 9.6, 9.8, 9.9, 9.9, 10.5, 10.6, 11.3, 11.5, 11.8, 12.3, 12.5, 12.8, 13.0, "0:13", 14.1, 14.4, 14.6, 15.2, 15.7, 15.9, 16.5, 16.7, 18.2, 18.4, 18.7, 19.9, 20.1, 20.3, 20.3, 20.5, 20.6, 20.8, 21.0, 21.5, 21.6, "0:22", 22.4, 22.7, "0:23", 23.6, 24.0, 24.3, 24.5, 24.9, 25.0, 25.2, "0:25", 25.5, "0:26", 26.2, 27.0, 27.3, 27.5, 27.7, 28.0, 28.2, 28.3, 28.4, 28.7, 28.7, 28.9, "0:29", 30.0, 30.5, 31.5, 31.6, 31.8, 31.9, 32.2, 32.6, 32.9, 33.0, 33.2, 33.2, "0:33", 33.6, 33.7, 33.8, 34.1, 34.3, 34.5, 34.6, 34.7, 34.9, 34.9, 35.0, 35.1, 35.3, 35.6, 35.6, 35.8, 36.5, "0:37", 37.0, 37.2, 37.4, 37.7, 37.9, 38.2, 38.3, 38.9, 39.1, 39.3, 39.4, 39.7, 40.0, "0:40", 40.4, 40.5, 40.6, 40.7, 41.1, 41.7, 42.0, 42.0, 42.4, 43.0, 43.2, 43.7, 43.8, 44.4, 44.5, 44.8, 44.9, 45.2, 45.4, 45.7, 45.9, 46.2, 46.6, 46.8, 47.6, 47.8, "0:48", 48.0, 48.5, 48.8, 49.2, 49.5, 49.7, 49.9, 50.2, 50.5, 50.5, 50.7, 51.1, 51.3],
      roundedTimestamps: [],
      uploaded: "true",

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
        var convertedTimestamps = [];
        if (this.state.timestamps.length > 0) {
          this.state.timestamps.forEach(roundTimestamps);
        }
        function roundTimestamps(item) {
          var round = Math.round(item)
          roundedTimestamps.push(round);
          if (round < 10) {
            convertedTimestamps.push("0:" + "0" + round.toString())
          } else {
            convertedTimestamps.push("0:" + round.toString())
          }
        }
        this.setState({ 
          roundedTimestamps: roundedTimestamps,
          convertedTimestamps: convertedTimestamps 
         });

        console.log("converted:", this.state.convertedTimestamps)

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
      /*
      case 32: // space bar    
        if (this.state.playing) {
          this.audio.pause();
          this.setState({ playing: false })
        } else {
          this.audio.play();
          this.setState({ playing: true })
        }
      break;*/
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
                ref={elem => this.uploadAudio = elem}
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
                convertedTimestamps={this.state.convertedTimestamps}
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
              src="http://localhost:5000/static/DemoInterview.flac"> {/*{this.props.audioURL} FOR FINAL*/}
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
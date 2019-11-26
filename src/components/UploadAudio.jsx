// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
    this.playWord = this.playWord.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  fileInputRef = React.createRef();

  /*} not working 
    editTranscript(e, index) {
      console.log(e.target.textContent);
      let tmpArr = this.props.audioText;
    
      if (index % 2 === 1) { // second speaker
        tmpArr[index] = "2:: " + e.target.textContent;
      }
      else {
        tmpArr[index] = "1:: " + e.target.textContent;
      }
      this.setState({ audioText: tmpArr})
      console.log("after setstate: " + this.props.audioText)
    }
  */
  keyPress(event) {
    switch (event.keyCode) {
      case 32: //SpaceBar       
        event.preventDefault();
        if (this.state.playing) {
          this.audio.pause();
          this.setState({ playing: false })
        } else {
          this.audio.play();
          this.setState({ playing: true })
        }
        break;
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress, false);
  }

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(this.props.audioText.map((item) => (item + "\n")), { type: 'text/plain' });
    console.log(this.props.quotes)
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  playWord(event) { // plays word when clicked, only works for audio files < 1 min
    const id = event.target.id;
    const seconds = parseInt(this.props.timestamps[id]);
    this.audio.currentTime = seconds;
    this.audio.autoplay = true;
  }

  render() {
    var indexNumber = -1;

    return (
      <div className="transcript">
        <Segment className="no-border" style={{ overflow: 'auto', maxHeight: '90vh' }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            {this.props.uploaded == "false" && <div>
              <label for="hidden-new-audio-file" class="ui button green">
                Upload Audio
          </label>
              <input type="file" id="hidden-new-audio-file"
                //ref={(ref) => { this.uploadInput = ref; }}
                ref={this.props.setRef}
                onChange={this.props.handleUploadAudio} // changed to call props
                style={{ display: "none" }}>
              </input>
            </div>
            }

            <h2>{this.props.title}</h2>
            <div className="right-btn">
              <Button icon size='mini' onClick={this.downloadTxtFile}><Icon name='share square outline icon' /></Button>
            </div>
          </div>
          <form onSubmit={this.handleUploadAudio} encType="multipart/form-data"> {/* change Audio to Text to revert*/}

            <br />
            <ul>
              <div>
                {this.props.audioText.map((item, index) => {
                  if ((item.includes("2:: ")) && item.substring(4, item.length) != "")
                    return (<div>
                      <li key={index} className="speaker-red">
                        <div className="timestamp">
                          {this.props.timestamps[indexNumber]}0:04 {/* FAKE TIMESTAMP FOR DEMO PUPROSES*/}
                        </div>
                        {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{" " + word}</span>)}
                      </li>
                    </div>)
                  else
                    return (
                      <div>
                        <li key={index} className="speaker-yellow">
                          <div className="timestamp">
                            {this.props.timestamps[indexNumber]}0:04
                      </div>
                          {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{word + " "}</span>)}
                        </li>
                      </div>)
                })}
              </div>
            </ul>
            {/*}
        <ul>
          {Object.keys(this.state.imageText).map(key =>
            <li>{key} - {this.state.imageText[key]}</li>
          )
          }

        </ul>
        */}
          </form>
          <figure>
            <audio id="audio" ref={(audio) => { this.audio = audio }} controls currentTime="5"
              src="http://localhost:5000/static/fieldinterview.flac"> {/*{this.props.audioURL} FOR FINAL*/}
              Your browser does not support the
              <code>audio</code> element.
              </audio>
          </figure>
        </Segment>
      </div>
    );
  }
}

export default Main;
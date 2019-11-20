// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioURL: '',
      audioText: [],
      timestamps: [],
      uploaded: "false",
    };
    this.handleUploadAudio = this.handleUploadAudio.bind(this);
    this.playWord = this.playWord.bind(this);

    this.editTranscript= this.editTranscript.bind(this);
  }

  fileInputRef = React.createRef();


  editTranscript(e, index) {
    let tmpArr = this.state.audioText;
  
    if (index % 2 === 1) { // second speaker
      tmpArr[index] = "2:: " + e.target.textContent;
      console.log(e.target.textContent + " index: " + index)
    }
    else {
      tmpArr[index] = "1:: " + e.target.textContent;
    }
    this.setState({ audioText: tmpArr})
    
  }




  handleUploadAudio(ev) {
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
        this.props.onDataFetched(body.filename); {/* send audio's filename to Tools component */ }

        console.log("Video transcript: " + this.state.audioText);
        console.log("Timestamps: " + this.state.timestamps);
      });
    });
  }

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(this.state.audioText.map((item) => (item + "\n")), { type: 'text/plain' });
    console.log(this.state.quotes)
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  playWord(event) {
    const id = event.target.id;
    console.log(this.state.timestamps[id]);
  }

  render() {
    var indexNumber = -1;

    return (
      <div className="transcript">
        <Segment className="no-border" style={{ overflow: 'auto', maxHeight: '90vh' }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h2>{this.props.title}</h2>
            <div className="right-btn">
              <Button icon size='mini' onClick={this.downloadTxtFile}><Icon name='share square outline icon' /></Button>
            </div>
          </div>
          <form onSubmit={this.handleUploadAudio} encType="multipart/form-data"> {/* change Audio to Text to revert*/}
            {this.state.uploaded == "false" && <div>

              <label for="hidden-new-audio-file" class="ui button">
                Upload Audio
          </label>
              <input type="file" id="hidden-new-audio-file"
                ref={(ref) => { this.uploadInput = ref; }}
                onChange={this.handleUploadAudio}
                style={{ display: "none" }}>
              </input>
            </div>
            }
            <br />
            <ul>
            <div>
              {this.state.audioText.map((item, index) => {
                if ((item.includes("2::")) && item.substring(4, item.length) != "")
                  return (<li key={index} className="speaker-red" contentEditable="true" suppressContentEditableWarning="true" onBlur={(e) => this.editTranscript(e, index)}>
                    {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{word + " "}</span>)}
                  </li>)
                else
                  return (<li key={index} className="speaker-yellow" contentEditable="true" onBlur={(e) => this.editTranscript(e, index)}>
                    {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{word + " "}</span>)}
                  </li>)
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
          <audio id="audio-player" controls
            src={this.state.audioURL}>
            Your browser does not support the
              <code>audio</code> element.
              </audio>
        </Segment>
      </div>
    );
  }
}

export default Main;
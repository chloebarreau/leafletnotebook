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


    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadAudio = this.handleUploadAudio.bind(this);
    this.playWord = this.playWord.bind(this);
  }

  fileInputRef = React.createRef();

  handleUpload() {
    this.setState({
      uploaded: "true"
    });
    console.log("onchenged")
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
          timestamps: body.timestamps
        });
        //this.props.onDataFetched(this.state.body.filename); {/* send audio's filename to Tools component */ }

        console.log("Video transcript: " + this.state.audioText);
        console.log("Timestamps: " + this.state.timestamps);
      });
    });
  }

  playWord(event) {
    const id = event.target.id;
    console.log(this.state.timestamps[id]);
  }

  render() {
    var indexNumber = -1;

    var aud = document.getElementById("auioPlayer");


    return (
      <div className="transcript">
        <form onSubmit={this.handleUploadAudio} encType="multipart/form-data"> {/* change Audio to Text to revert*/}
          <div>
            <label for="hidden-new-audio-file" class="ui button">
              Upload Audio
          </label>
            <input type="file" id="hidden-new-audio-file"
              ref={(ref) => { this.uploadInput = ref; }}
              onChange={this.handleUploadAudio}
              style={{ display: "none" }}>
            </input>
          </div>
          <br />
          <ul>
            {this.state.audioText.map((item) => {
              console.log(indexNumber)
              if (item.includes("2::") && item.substring(4, item.length) != "")
                return (<li className="speaker-red">
                  {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{word + " "}{console.log(indexNumber + " " + word)}</span>)}
                </li>)
              else
                return (<li className="speaker-yellow">
                  {item.trim().substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++} onClick={this.playWord}>{word + " "}{console.log(indexNumber + " " + word)}</span>)}
                </li>)
            })}
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
      </div>
    );
  }
}

export default Main;
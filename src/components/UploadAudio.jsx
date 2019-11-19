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
        console.log("Video transcript: " + this.state.audioText);
        console.log("Timestamps: " + this.state.timestamps);
      });
    });
  }

  render() {
    var indexNumber = 0;
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
          if (item.includes("2::"))
            return (<li className="speaker-red">
              {item.substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++}>{word + " "}</span>)}
              </li>)
          else
            return (<li className="speaker-yellow">
              {item.substring(4, item.length).split(" ").map((word) => <span className="word" id={indexNumber++}>{word + " "}</span>)}
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
      </div>
    );
  }
}

export default Main;
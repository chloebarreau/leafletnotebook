// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audioURL: '',
      audioText: '',

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
        });
        console.log("Video transcript:" + this.state.audioText); 
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadAudio} encType="multipart/form-data"> {/* change Audio to Text to revert*/}
        <div>
          <label for="hidden-new-file" class="ui blue button">
            <i class="upload icon"></i> Upload Audio
          </label>
          <input type="file" id="hidden-new-file"
            ref={(ref) => { this.uploadInput = ref; }}
            onChange={this.handleUploadAudio}
            style={{ display: "none" }}>
          </input>
        </div>
        <br />
        Text {this.state.audioText}
{/*}
        <ul>
          {Object.keys(this.state.imageText).map(key =>
            <li>{key} - {this.state.imageText[key]}</li>
          )
          }

        </ul>
        */}
      </form>
    );
  }
}

export default Main;
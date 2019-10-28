// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Icon, Menu, Segment } from 'semantic-ui-react'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      imageText: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  fileInputRef = React.createRef();

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        console.log(body);
        this.setState({ 
          imageURL: "http://localhost:5000/static/" + body.filename,
          imageText: JSON.stringify(body.text),
        });
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage} encType="multipart/form-data">
        <div>
        {/* https://benmarshall.me/styling-file-inputs/ */}
          {/* <input ref={(ref) => { this.uploadInput = ref; }} type="file" /> */}
          <Button as="label" htmlFor="file">
            Choose File
          </Button>
          <input hidden type="file" id="file" onChange={this.uploadInput} />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
            <button type="submit" class="ui button" class="ui blue button">
            <i class="upload icon"></i> Upload 
            </button>
        </div>

        <p>{this.state.imageText}</p>

      </form>
    );
  }
}

export default Main;
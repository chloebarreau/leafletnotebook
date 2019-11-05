// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment } from 'semantic-ui-react'

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
        this.props.onDataFetched(this.state.imageText);  {/* send image's text data to Notes component */}
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage} encType="multipart/form-data">
        <div>
          {/* https://benmarshall.me/styling-file-inputs/ */}
          {/* with this code I'm unable to save the chosen files on my computer, get error 
          <Button as="label" htmlFor="file">
            Choose File
          </Button>
          <input hidden type="file" id="file" onChange={this.uploadInput} />
          */}
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
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
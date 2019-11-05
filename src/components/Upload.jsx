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
        console.log(body.text);
        this.setState({
          imageURL: "http://localhost:5000/static/" + body.filename,
          imageText: body.text,
        });
        console.log(this.state.imageText);
        this.props.onDataFetched(this.state.imageText.title); {/* send image's text data to Tools component */ }
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
<ul>
        { Object.keys(this.state.imageText).map(key => 
    <li>{key} - {this.state.imageText[key]}</li>
)
}

</ul>
        
        {/*}.map((items, index) => {
          return (
            <ul key={index}>
              {Object.keys(items).map((key) => {
                return (
                  <li key={key + index}>{key}:{items[key]}</li>
                )
              })}
            </ul>
          )
        })}*/}

      </form>
    );
  }
}

export default Main;
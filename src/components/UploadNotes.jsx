// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment, Header, Grid, Popup } from 'semantic-ui-react'

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      imageText: '',
      uploaded: "false",
    };


    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  fileInputRef = React.createRef();


  handleUpload() {
    this.setState({
      uploaded: "true"
    });
    console.log("onchenged")
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
          uploaded: "true"
        });
        console.log(this.state.imageText);
        this.props.onDataFetched(this.state.imageText.title); {/* send image's text data to Tools component */ }
      });
    });
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <form onSubmit={this.handleUploadImage} encType="multipart/form-data"> {/* change Audio to Text to revert*/}

              <div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Header as='h3'>Notes</Header>
                <div className="right-btn">
                <Popup content='This links timestamps in your notes to the audio' wide position='left center' trigger={<Button circular size='mini' icon='question' />} />
                </div>
              </div>

                <label for="hidden-new-file" className="ui button">
                  Upload Notes
          </label>
                <input type="file" id="hidden-new-file"
                  ref={(ref) => { this.uploadInput = ref; }}
                  onChange={this.handleUploadImage}
                  style={{ display: "none" }}>
                </input>

              </div>
              <br />
              {/*}
        {this.state.uploaded == "true" &&
          <div>
            <ul>
              <li>0:28 - "my class needs some really good traitors these days"</li>
              <li>1:09 - "create the best and fairest country"</li>
              <li>2:13 - "want to live in a world that doesn't need philanthropy"</li>
              <li>2:41 - "prefer that public schools function..."</li>
            </ul>
          </div>
        }
      */}
              {this.state.uploaded == "true" &&
                <Segment className="notes">
                  <ul>
                    {Object.keys(this.state.imageText).map(key => {
                      if (key !== "title")
                        return (
                          <li>
                            <div className="timestamp">
                              {key}
                            </div>
                            <div className="note">
                              {this.state.imageText[key]}
                            </div>
                          </li>)
                      return
                    }
                    )
                    }
                  </ul>
                </Segment>
              }

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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default UploadImage;
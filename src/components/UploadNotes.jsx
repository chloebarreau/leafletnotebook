// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment, Header, Grid, Popup } from 'semantic-ui-react'
import { HashLink as Link } from 'react-router-hash-link';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
      imageText: '',
      uploaded: "true",
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  fileInputRef = React.createRef();

  handleClick() {
    this.setState({
      uploaded: "true"
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
            <form onSubmit={this.handleClick} encType="multipart/form-data"> {/* !!!!!!!!! change back to ={this.handleUploadImage} when not in demo mode!!!*/}

              <div>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Header as='h3'>Notes</Header>
                
                <Link to="/#tag">Your link text</Link>
                <div className="right-btn">
                <Popup content='This links timestamps in your notes to the audio' wide position='left center' trigger={<Button circular size='mini' icon='question' />} />
                </div>
              </div>

            <Button onClick={this.handleClick}>Upload Notes</Button>
{/*} REAL UPLOAD BUTTON
                <label for="hidden-new-file" className="ui button">
                  Upload Notes
          </label>
                <input type="file" id="hidden-new-file"
                  ref={(ref) => { this.uploadInput = ref; }}
                  onChange={this.handleUploadImage}  
                  style={{ display: "none" }}>
                </input>
    */}

              </div>
              <br />
             
        {this.state.uploaded == "true" &&
        <Segment className="notes">
            <ul>
              <li><Link to={"/#tag"}><div className="timestamp">0:28</div></Link> - <div className="note">"my class needs some really good traitors these days"</div></li>
              <li><div className="timestamp">1:09</div> - <div className="note">"create the best and fairest country"</div></li>
              <li><div className="timestamp">2:13</div> - <div className="note">"want to live in a world that doesn't need philanthropy"</div></li>
              <li><div className="timestamp">2:41</div> - <div className="note">"prefer that public schools function..."</div></li>
            </ul>
          </Segment>
        }
      {/*}
              {this.state.uploaded == "true" &&
                <Segment className="notes">
                  <ul>
                    {Object.keys(this.state.imageText).map(key => {
                      if (key !== "title")
                        return (
                          <li><Link to={"/#" + {key}}> ///edited!!!
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
            */}
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
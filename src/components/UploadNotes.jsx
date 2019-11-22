// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment, Header, Grid, Popup } from 'semantic-ui-react'
import { HashLink as Link } from 'react-router-hash-link';

class UploadNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  fileInputRef = React.createRef();
  render() {
    console.log("timestamps inside notes:" + this.props.timestamps)
    var roundedTimestamps = [];
    console.log("before rounding")
    if (this.props.timestamps.length > 0) {
      console.log("inside and rounding")
      this.props.timestamps.forEach(roundTimestamps);
    }

    function roundTimestamps(item) {
      roundedTimestamps.push(Math.round(item));
      console.log(roundedTimestamps)
    }

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <form onSubmit={this.handleClick} encType="multipart/form-data"> {/* !!!!!!!!! change back to ={this.handleUploadImage} when not in demo mode!!!*/}

              <div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Header as='h3'>Notes</Header>

                  <div className="right-btn">
                    <Popup content='This links timestamps in your notes to the audio' wide position='left center' trigger={<Button circular size='mini' icon='question' />} />
                  </div>
                </div>

                <Button onClick={this.props.handleClickDemo}>Upload Notes</Button>
                {/*} REAL UPLOAD BUTTON, DO NOT DELETE:
                <label for="hidden-new-file" className="ui button">
                  Upload Notes
          </label>
                <input type="file" id="hidden-new-file"
                  //ref={(ref) => { this.uploadInput = ref; }}
                  ref={this.props.setRef} 
                  onChange={this.props.handleUploadImage}  
                  style={{ display: "none" }}>
                </input>
    */}

              </div>
              <br />


              <Segment className="notes">
                <ul>
                  <li><Link to={"/#" + roundedTimestamps.indexOf(4).toString()}><div className="timestamp">0:04</div></Link> - <div className="note">"my class needs some really good traitors these days"</div></li>
                  <li><Link to={"/#" + roundedTimestamps.indexOf(16).toString()}><div className="timestamp">0:16</div></Link> - <div className="note">"create the best and fairest country"</div></li>
                  <li><Link to={"/#" + roundedTimestamps.indexOf(24).toString()}><div className="timestamp">0:24</div></Link> - <div className="note">"want to live in a world that doesn't need philanthropy"</div></li>
                  <li><Link to={"/#" + roundedTimestamps.indexOf(48).toString()}><div className="timestamp">0:48</div></Link> - <div className="note">"prefer that public schools function..."</div></li>
                </ul>
              </Segment>

              {/*}
              {this.props.uploaded == "true" &&
                <Segment className="notes">
                  <ul>
                    {Object.keys(this.props.imageText).map(key => {
                      if (key !== "title")
                        return (
                          <li><Link to={"/#" + {key}}> ///edited!!!
                            <div className="timestamp">
                              {key}
                            </div>
                            <div className="note">
                              {this.props.imageText[key]}
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

export default UploadNotes;
// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment, Header, Grid, Popup } from 'semantic-ui-react'
import { HashLink as Link } from 'react-router-hash-link';

const stylePop = {
  borderRadius: 0,
  opacity: 0.7,
  padding: '2em',
}

class UploadNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  fileInputRef = React.createRef();

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <form onSubmit={this.handleClick} encType="multipart/form-data"> {/* !!!!!!!!! change back to ={this.handleUploadImage} when not in demo mode!!!*/}

              <div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  {/*<Header as='h3'>Notes</Header>*/} {/*<Button onClick={this.props.handleClickDemo} className="green-btn">Upload Notes</Button>*/}
                {/*} REAL UPLOAD BUTTON, DO NOT DELETE:
                <label for="hidden-new-file" className="ui button green">
                  Upload Notes
          </label>
                <input type="file" id="hidden-new-file"
                  //ref={(ref) => { this.uploadInput = ref; }}
                  ref={this.props.setRef} 
                  onChange={this.props.handleUploadImage}  
                  style={{ display: "none" }}>
                </input>
    */}

                  <div className="right-btn">
                    <Popup content='This links timestamps in your notes to the audio. Click the timestamps to hear the original quote!' basic size='mini' trigger={<div className="gray-background" ><Icon name='question' avatar style={{display: "inline-block", margin: "9px auto auto auto"}}/></div>} />
                  </div>
                </div>
              </div>
              <br />


              <Segment className="notes">
                <ul>
                  <li onClick={this.props.playQuote}><div className="timestamp">0:22</div><div className="note">Row's accessible</div></li>
                  <li onClick={this.props.playQuote}><div className="timestamp">0:37</div><div className="note">ability to choose</div></li>
                  <li onClick={this.props.playQuote}><div className="timestamp">0:43</div><div className="note">unique privilege at Stanford</div></li>
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
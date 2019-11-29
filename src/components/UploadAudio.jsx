// Main code from https://medium.com/excited-developers/file-upload-with-react-flask-e115e6f2bf99
import React from 'react';
import { Button, Input, Icon, Menu, Segment } from 'semantic-ui-react'
import Highlight from 'react-highlighter'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
  }

  fileInputRef = React.createRef();

 componentDidMount() {
  // pass the requested ref here
  this.props.passRefUpward(this.refs);
  console.log(this.refs)

} 

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(this.props.audioText.map((item) => (item + "\n")), { type: 'text/plain' });
    console.log(this.props.quotes)
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    var indexNumber = -1;

    return (
      <div className="transcript">
        <Segment className="no-border" style={{ overflow: 'auto', maxHeight: '90vh' }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            {this.props.uploaded == "false" && <div>
              <label for="hidden-new-audio-file" class="ui button green">
                Upload Audio
          </label>
              <input type="file" id="hidden-new-audio-file"
                //ref={(ref) => { this.uploadInput = ref; }}
                ref={this.props.setRef}
                onChange={this.props.handleUploadAudio} // changed to call props
                style={{ display: "none" }}>
              </input>
            </div>
            }

            <h2>{this.props.title}</h2>
            <div className="right-btn">
              <Button icon size='mini' onClick={this.downloadTxtFile}><Icon name='share square outline icon' /></Button>
            </div>
          </div>
          <form onSubmit={this.handleUploadAudio} encType="multipart/form-data"> {/* change Audio to Text to revert*/}
            <br />
            <ul>
              <div>

                {this.props.audioText.map((item, index) => {
                  if ((item.includes("2:: ")) && item.substring(4, item.length) != "")
                    return (<div>
                      <li key={index} className="speaker-red">
                        <div className="timestamp">
                          <span className="speaker">Speaker 2</span>
                          {this.props.timestamps[indexNumber]}0:04 {/* FAKE TIMESTAMP FOR DEMO PUPROSES*/}
                          <Button floated='right' className="news-button"
                          size='mini' circular name='newspaper'>
                            <Icon name='newspaper'/>
                            <span>CNN News: SNP Down after closing...</span>
                          </Button>
                        </div>
                        {item.trim().substring(4, item.length).split(" ").map((word) => {
                          var className = this.props.highlighted == indexNumber+1 ? 'highlight' : 'not-highlight';
                          return <span className={className} id={indexNumber++} ref={indexNumber} onClick={this.props.playWord}>{" " + word}</span>})}
                      </li>
                    </div>)
                  else
                    return (
                      <div>
                        <li key={index} className="speaker-yellow">
                          <div className="timestamp">
                          <span className="speaker">Speaker 1</span>
                            {this.props.timestamps[indexNumber]}0:04
                      </div>
                          {item.trim().substring(4, item.length).split(" ").map((word) => {
                            var className = this.props.highlighted == indexNumber+1 ? 'highlight' : 'not-highlight';
                            return <span className={className} id={indexNumber++} ref={indexNumber} onClick={this.props.playWord}>{" " + word}</span>})}
                        </li>
                      </div>)
                })}

              </div>
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
        </Segment>
      </div>
    );
  }
}

export default Main;
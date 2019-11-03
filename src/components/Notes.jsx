import React from 'react';
import Upload from './Upload';

class Notes extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleResultChange = this.handleResultChange.bind(this);
  }

  handleResultChange(data) {
    console.log("Data: "+ data)
  }

  render() {
    return (
        <div>
            <Upload onDataFetched={this.handleResultChange}/>
        </div>
    );
  }
}

export default Notes;
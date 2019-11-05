// Import React!
import React from 'react'
import { Form, TextArea } from 'semantic-ui-react'

// Define our app...
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Render the editor.
  render() {
    return (
      <div>
        
        <Form>
          <TextArea style={{ minHeight: 630 }} placeholder='Transcript' value={this.state.value} onChange={this.handleChange}/>
        </Form>
      </div>
    )
  }
}

export default TextEditor;
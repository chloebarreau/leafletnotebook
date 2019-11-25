// Import React!
import React from 'react'
import { Form, Button, Segment, Icon } from 'semantic-ui-react'
import { EditorState, ContentState, Editor, RichUtils, getDefaultKeyBinding} from 'draft-js'

const basicTextStylePlugin = {
  keyBindingFn(event) {
    return getDefaultKeyBinding(event);
  },

  handleKeyCommand(command, { getEditorState, setEditorState }) {
    const editorState = getEditorState();
    const newEditorState = RichUtils.handleKeyCommand(
      editorState, command
    );
    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  }
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      editorState: EditorState.createWithContent(ContentState.createFromText('Hello')),
    };
     /* Create an array of plugins to be passed to `Editor` */
     this.plugins = [
      basicTextStylePlugin,
    ];
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateEditorState(editorState){
    this.setState({editorState});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  // Render the editor.
  render() {
    return (
      <Segment>
        <Button icon size='mini' onClick={this._onBoldClick.bind(this)}><Icon name='bold'/></Button>
        <Button icon size='mini' onClick={this._onItalicClick.bind(this)}><Icon name='italic'/></Button>
        <div className="editor" onClick={this.focus}>
          <Editor 
            editorState={this.state.editorState}
            onChange={this.updateEditorState.bind(this)}
            plugins={this.plugins}
            handleKeyCommand={this.handleKeyCommand}
            spellCheck={true}
          ></Editor>
        </div>
      </Segment>
    )
  }
}

export default TextEditor;
import React from 'react';
import { Card, Button, Segment, Header, Icon } from 'semantic-ui-react'

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      quotes: []
    };
    this.addQuote = this.addQuote.bind(this)
  }

  addQuote() {
    var selection = window.getSelection().toString();
    const newQuote = { 'id': this.state.count + 1, 'value': selection };
    console.log(newQuote);
    this.setState({
      quotes: [...this.state.quotes, newQuote],
      count: this.state.count + 1
    });
  }

  delete(item) {
    const quotes = this.state.quotes.filter(i => i !== item)
    this.setState({ quotes })
    console.log("item: " + item.id)
  }

  render() {
    return (
      <div>
        <Segment style={{ overflow: 'auto', maxHeight: '50vh' }}>
          <Header as='h3'>Quote Bank</Header>
          <Button size='mini' onClick={this.addQuote}>Add Quote</Button>
          <Card.Group>
            {this.state.quotes.map((quote) => (
              <Card fluid>
                <Card.Content>
                  <Card.Description>{quote.value}
                  
                  <Button basic icon color='red' size="mini" floated='right' onClick={this.delete.bind(this, quote)}>
                    <Icon name='trash alternate outline' />
                  </Button>
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </div>
    );
  }
}
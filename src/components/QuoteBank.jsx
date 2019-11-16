import React from 'react';
import { Card, Button, Segment, Grid, Header, Icon } from 'semantic-ui-react'

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

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(this.state.quotes.map((quote) => (quote.value + "\n\n")), { type: 'text/plain' });
    console.log(this.state.quotes)
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <div>
        <Grid padded>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Quote Bank</Header>
              <Button size='mini' onClick={this.addQuote} className="green-btn">Add Highlight</Button>
              <Button size='mini' onClick={this.downloadTxtFile}><Icon name='share square outline icon' /></Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <p>Highlight quotes and add them here!</p>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
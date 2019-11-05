import React from 'react';
import { Grid, Card, Icon, Image, Dropdown, Input, Header } from 'semantic-ui-react'

const sortOptions = [
  {
    key: 'Relevance',
    text: 'Relevance',
    value: 'relevancy',
  },
  {
    key: 'Publish date',
    text: 'Publish date',
    value: 'publishedAt',
  },
  {
    key: 'Popularity',
    text: 'Popularity',
    value: 'popularity',
  },
]

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      order: "", // default (empty string) order is by publication time
      refreshing: true
    };
  }
  // Called after a component is mounted
  componentDidMount() {
    var url = 'https://newsapi.org/v2/everything?language=en&q=apple&sortBy=' + this.state.order + '&apiKey=b0bf77db986a4036b14d6e70b20142c7' //3260f1f5672447929f1fb8f3ec7199f4'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          articles: result.articles,
          refreshing: false,
        });
      }
      )
  }

  componentDidUpdate() {
    var url = 'https://newsapi.org/v2/everything?language=en&q=apple&sortBy=' + this.state.order + '&apiKey=b0bf77db986a4036b14d6e70b20142c7'
    console.log(url)
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          articles: result.articles,
          refreshing: false,
        });
      }
      )
  }

  handleClick(event, data) {
    console.log("value: " + data.value)
    this.setState({ order: data.value });
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Related News</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input action='Search' placeholder='' />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Dropdown
                placeholder='Sort by'
                selection
                options={sortOptions}
                onChange={(event, data) => this.handleClick(event, data)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card.Group>
                {this.state.articles.map((item) => <Article
                  image={item.urlToImage}
                  title={item.title}
                  source={item.source.name}
                  description={item.description}
                  date={item.publishedAt}
                  url={item.url}
                />)}
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function Article(props) {
  return (
    <Card fluid href={props.url} target="_blank">
      {/*<Image src={props.image} wrapped ui={false} />*/}
      <Card.Content>
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>{props.source}</Card.Meta>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='clock outline icon' />
          {props.date}
        </a>
      </Card.Content>
    </Card>
  );
}
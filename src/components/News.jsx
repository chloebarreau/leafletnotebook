import React from 'react';
import { Grid, Card, Icon, Image, Dropdown, Input, Header, Button } from 'semantic-ui-react'

const sortOptions = [
  {
    key: 'Relevance',
    text: 'Relevance (Default)',
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
      order: "", // default (empty string) order is by relevancy
      query: "",
      refreshing: true
    };
    this.handleHighlightClick = this.handleHighlightClick.bind(this)
  }
  // Called after a component is mounted
  componentDidMount() {
    this.getNews();
  }

  getNews() {
    var url;
    if (this.state.query) {
      url = 'https://newsapi.org/v2/everything?language=en&q=' + this.state.query + '&sortBy=' + this.state.order + '&apiKey=b0bf77db986a4036b14d6e70b20142c7'
    } else {
      url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b0bf77db986a4036b14d6e70b20142c7';
    }
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

  handleHighlightClick() {
    var selection = window.getSelection().toString();
    console.log(selection);
    this.setState({ query: selection}, function () {
      console.log("selection query:" + this.state.query);
      this.getNews();
    });
  }

  handleSearchChange(event, data) {
    console.log(data.value);
    this.setState({ query: data.value });
  }

  handleSearchClick(event) {
    this.getNews();
  }

  handleOrderClick(event, data) {
    this.setState({ order: data.value }, function () {
      console.log("order:" + this.state.order);
      this.getNews();
    });
    console.log("data value" + data.value)
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Related News</Header>
              <Button size='mini' onClick={this.handleHighlightClick}>Search Highlight</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input action={{
                icon: "search icon",
                onClick: (event) => this.handleSearchClick(event)
              }}
                onChange={(event, data) => this.handleSearchChange(event, data)}
                placeholder='Search' />
            </Grid.Column>

          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Dropdown
                placeholder='Sort by'
                selection
                options={sortOptions}
                onChange={(event, data) => this.handleOrderClick(event, data)}
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
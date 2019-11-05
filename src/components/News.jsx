import React from 'react';
import { getNews } from './getNews';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
  }
  // Called after a component is mounted
  componentDidMount() {
    var targetUrl = 'https://newsapi.org/v2/everything?q=apple&apiKey=3260f1f5672447929f1fb8f3ec7199f4'
    fetch(targetUrl)
      .then(blob => blob.json())
      .then(result => {
        this.setState({
          articles: result.articles,
          refreshing: false,
        });
      }
      )
  }
  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }

  render() {
    return (
      <ul>
        {this.state.articles.map((item) => <Article title={item.title} />)}
      </ul>
    );
  }
}

function Article(props) {
  return <li>{props.title}</li>;
}
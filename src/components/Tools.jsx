import React from 'react';
import Upload from './Upload'
import TextEditor from './TextEditor'
import News from './News';
import QuoteBank from './QuoteBank';
import { Grid, Icon, Menu, Segment, Header, Button } from 'semantic-ui-react'

class Tools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleText: "Upload your audio file and an image of your notes",
      uploaded: "false",
      quotes: ""
    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleHighlightClick = this.handleHighlightClick.bind(this);
  }

  handleResultChange(data) {
    this.setState({
      sampleText: data
    });
  }

  handleUpload() {
    this.setState({
      uploaded: "true"
    });
  }

  handleHighlightClick() {
    this.setState({ quotes: "There are certain things that jump out to me about these incidents."}, function () {
      console.log("added");
    });
  }

  render() {
    var text = this.state.sampleText; // JSON.parse(this.state.sampleText);

    return (
      <div>
        <Grid columns={2} style={{ margin: '10px' }}>
          <Grid.Row stretched>
            <Grid.Column width={11}>
              <Segment style={{ overflow: 'auto', maxHeight: '90vh' }}>
                <h3>{this.state.sampleText}</h3>
                <button type="submit" class="ui button" class="ui blue button" onClick={this.handleUpload}>
            <i class="upload icon"></i> Upload
            </button>
                {this.state.uploaded == "true" && <div><p>TERRY GROSS, HOST: </p>
    <p>This is FRESH AIR. I'm Terry Gross. Even if cybersecurity isn't a subject you think about a lot, the data breach of credit card information from Target and Neiman Marcus customers has probably increased your level of cyber-anxiety. My guest, P.W. Singer, is the co-author of the new book "Cybersecurity and Cyberwar: What Everyone Needs to Know."</p>
    <p>It's about issues that face the military, government, businesses and individuals, and the decisions facing us when trying to balance security with freedom of speech and the ideals of an open Internet. Singer is the director of the 21st Century Defense Initiative at the Brookings Institution. He's the author of previous books about private military contractors, child soldiers, and how advances in robotics are changing war.</p>
    <p>P.W. Singer, welcome to FRESH AIR. Let's start with the Target security breach, which was followed by the Neiman Marcus security breach. And at Target, I know they not only got credit card numbers, that included the code verification value, that three-number code on the back of the card that you're often asked for when you're paying for something by phone. And they got other personal data.</p>
    <p>What do those breaches signify in the world of cybersecurity?</p>
    <p>P.W. SINGER: There are certain things that jump out to me about these incidents. And look, there'll be more of them. The first is they're good illustrations of how cybersecurity issues affect us all. You know, even if you look at the kind of shopper who is at Target versus the kind of shopper who sends their personal buyer out to Neiman Marcus, they're both being hit here.</p>
    <p>The second is in terms of the question for these companies, and at least in some of the information that's been following from - whether it's Target or other ones like Snapchat - is that companies may not have been taking security in the cyber realm as seriously as they should and in terms of how they communicate that when incidents happen.</p>
    <p>There are certain industries that have done quite well because the incentives are really well-aligned, when we think about the banking industry, versus those others, whether it's consumer or the power grid, where they haven't been taking it seriously enough, again, because the incentives aren't there.</p>
    <p>The third is the lessons for you and I, and in the book we explore at the end, there's a series of fairly simple steps we can take. We overcomplicate this. And one of them is, frankly, don't use the same password for all your different accounts because the fear in these incidents is someone can daisy chain across your accounts.</p>
    <p>GROSS: So what I heard about Target and the Neiman Marcus breaches, it just made me wonder, like, what is the safest way to pay for something now? Obviously cash, but then you're carrying around a lot of cash with you. But if you're paying with a credit card, do you think it's any safer to pay in the store or by phone or through the Internet?</p>
    <p>SINGER: You're never ever going to have 100 percent security, and that's true whether I'm talking about you and, you know, buying online for everything from, you know, socks to concert tickets to you name it, to the nation, when we think about our military role. You're never going to have 100 percent security in this space.</p>
    </div>} </Segment>
              {/*<TextEditor />  ADD  BACK IN WHEN READY */}
            </Grid.Column>
            <Grid.Column width={5}>
              <Segment>
              <Header as='h3'>Notes</Header>
                <Upload onDataFetched={this.handleResultChange} />
              </Segment>

              <QuoteBank />

              <Segment style={{ overflow: 'auto', maxHeight: '50vh' }}>
                <News />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Tools;
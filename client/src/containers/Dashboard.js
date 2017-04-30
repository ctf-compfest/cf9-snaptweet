import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Button from '../components/Button';
import Card from '../components/Card';
import TweetCard from '../components/TweetCard';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      tweet: '',
    };

    this.fetchPosts = this.fetchPosts.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();

    // 30 seconds poll
    setInterval(this.fetchPosts, 1000 * 30);
  }

  onChange(label) {
    return e => this.setState({ [label]: e.target.value });
  }

  fetchPosts() {
    this.props.store.fetchPosts();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submitPost();
    }
  }

  async submitPost() {
    try {
      if (this.state.tweet === '') throw new Error("Tweet can't be empty");
      await this.props.store.submitPost(this.state.tweet);
      this.setState({ tweet: '' });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    const isLoggedIn = !!this.props.store.loggedIn.get();

    return (
      <div>
        {isLoggedIn &&
          <Card>
            <TweetInput
              placeholder="What's happening?"
              onChange={this.onChange('tweet')}
              onKeyPress={this.handleKeyPress}
              value={this.state.tweet}
            />
            <ButtonContainer>
              <Button onClick={this.submitPost}>Post</Button>
            </ButtonContainer>
          </Card>}
        <div>
          {!this.props.store.posts.length &&
            <EmptyTweetContainer>No Tweets :(</EmptyTweetContainer>}
          {this.props.store.posts.map(post => (
            <TweetCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TweetInput = styled.textarea`
  width: 100%;
  border: 0;
  background: inherit;
  color: ${props => props.theme.black};
  font-size: 1.4rem;
  font-family: ${props => props.theme.mainFont};
  outline: 0;
`;

const EmptyTweetContainer = styled.div`
  margin-top: 2rem;
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.headingFont};
  font-size: 2rem;
`;

export default inject('store')(observer(Dashboard));

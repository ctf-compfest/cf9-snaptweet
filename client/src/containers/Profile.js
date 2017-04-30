import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Button from '../components/Button';
import TweetCard from '../components/TweetCard';

class Dashboard extends Component {
  constructor() {
    super();

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    this.fetchUser();

    // 30 seconds poll
    setInterval(this.fetchUser, 1000 * 30);
  }

  componentWillReact() {
    const user = this.props.store.user.get();
    if (!user) {
      this.fetchUser();
    }
  }

  onChange(label) {
    return e => this.setState({ [label]: e.target.value });
  }

  fetchUser() {
    this.props.store.fetchUser(this.props.match.params.username);
  }

  render() {
    const isLoggedIn = !!this.props.store.loggedIn.get();
    const user = this.props.store.user.get();

    if (isLoggedIn && user) {
      return (
        <div>
          <h3>{user.username}'s Tweets</h3>
          {this.props.store.loggedIn.get().role === 'admin' &&
            <Button>Send Backup</Button>}
          <div>
            {user.posts
              .map(post =>
                Object.assign({}, post, { author: { username: user.username } })
              )
              .map(post => <TweetCard key={post.id} post={post} />)}
          </div>
        </div>
      );
    } else {
      return <div>:(</div>;
    }
  }
}

export default inject('store')(observer(Dashboard));

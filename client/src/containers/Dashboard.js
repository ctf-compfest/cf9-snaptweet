import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

class Dashboard extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  login() {
    this.props.store.login('guest', 'guest');
  }

  logout() {
    this.props.store.logout();
  }

  fetchPosts() {
    this.props.store.fetchPosts();
  }

  componentDidMount() {
    this.props.store.refreshLogin();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>
          <code>
            {JSON.stringify(this.props.store, null, 2)}
          </code>
        </pre>
        <button onClick={this.login}>Login</button>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.fetchPosts}>Fetch Posts</button>
      </div>
    );
  }
}

export default inject('store')(observer(Dashboard));

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { observer } from 'mobx-react';
import Button from './Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React {this.props.store.counter}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <Button />
        </p>
      </div>
    );
  }
}

export default observer(App);

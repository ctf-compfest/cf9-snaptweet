import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { observable, action } from 'mobx';

export const store = observable({
  counter: 0,
});

store.countUp = action(function up() {
  store.counter++;
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

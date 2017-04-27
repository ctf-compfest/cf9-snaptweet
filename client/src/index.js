import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Store from './stores';
import * as apiService from './services/api';
import './index.css';

const store = new Store(apiService);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Store from './stores';
import WebFontLoader from 'webfontloader';
import * as apiService from './services/api';
import './index.css';

const store = new Store(apiService);

WebFontLoader.load({
  google: {
    families: ['Nunito:700', 'Source Sans Pro'],
  },
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

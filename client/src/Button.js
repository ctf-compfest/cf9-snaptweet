import React from 'react';
import { store } from './index';

export default props => <button onClick={store.countUp}>+</button>;

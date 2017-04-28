import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Provider } from 'mobx-react';

import NavBar from '../components/NavBar';
import Dashboard from './Dashboard';
import Login from './Login';

const theme = {
  mainFont: "'Source Sans Pro', sans-serif",
  headingFont: "'Nunito', sans-serif",
  black: '#333333',
  gray: '#5E5E5E',
  white: '#FCFAF9',
  primary: '#48E5C2',
  alt: '#36AF95',
  secondary: '#CE724E',
};

export default class App extends Component {
  componentDidMount() {
    this.props.store.refreshLogin();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ThemeProvider theme={theme}>
          <Router>
            <div>
              <NavBar store={this.props.store} />
              <Container>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
              </Container>
            </div>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

const Container = styled.div`
  max-width: 75rem;
  width: 100%;
  margin: 0 auto;
  font-family: ${props => props.theme.mainFont}
`;

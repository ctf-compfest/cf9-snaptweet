import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export default observer(
  class NavBar extends Component {
    render() {
      const loggedIn = this.props.store.loggedIn.get();
      return (
        <Nav>
          <Title><Link to="/">SnapTweet</Link></Title>
          <Menu>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            {!!loggedIn &&
              <MenuItem>
                <Link to="/profile">{loggedIn.username}</Link>
              </MenuItem>}
            {!loggedIn &&
              <MenuItem>
                <Link to="/login">Login</Link>
              </MenuItem>}
            {!!loggedIn &&
              <MenuItem>
                <button onClick={() => this.props.store.logout()}>
                  Logout
                </button>
              </MenuItem>}
          </Menu>
        </Nav>
      );
    }
  }
);

const Nav = styled.div`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.white};
  padding: 1rem 2rem;
  display: flex;
`;

const Title = styled.h1`
  font-family: ${props => props.theme.headingFont};
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Menu = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  margin-left: 1rem;
  background: ${props => props.theme.white};
  padding: .25rem 1rem;
  border-radius: .25rem;

  * {
    font-family: ${props => props.theme.headingFont};
    text-decoration: none;
    color: ${props => props.theme.gray};
    font-weight: 700;
    cursor: pointer;
    font-size: 1rem;
    background: transparent;
    margin: 0;
    border: 0;
  }
`;

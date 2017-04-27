import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Field, Label, Input } from '../components/Form';
import Button from '../components/Button';
import styled from 'styled-components';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      registering: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;
    this.props.store.login(username, password);
  }

  render() {
    const { username, password } = this.state;
    const loggedIn = this.props.store.loggedIn.get();

    console.log(loggedIn);

    if (!loggedIn)
      return (
        <Container>
          <form onSubmit={this.onSubmit}>
            <Field>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                onChange={this.onChange('username')}
                value={username}
              />
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.onChange('password')}
                value={password}
              />
            </Field>
            <ButtonContainer>
              <Button transparent>Register</Button>
              <Button type="submit" large marginLeft>Login</Button>
            </ButtonContainer>
          </form>
        </Container>
      );
    else return <Redirect to="/" />;
  }
}

const Container = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  margin-top: 5rem;
  padding: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default inject('store')(observer(Login));

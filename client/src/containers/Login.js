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
      email: '',
      password: '',
      confirmPassword: '',
      registering: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.toggleRegister = this.toggleRegister.bind(this);
  }

  onChange(field) {
    return event => this.setState({ [field]: event.target.value });
  }

  toggleRegister() {
    this.setState({ registering: !this.state.registering });
  }

  onLogin(e) {
    e.preventDefault();

    const { username, password } = this.state;
    this.props.store.login(username, password);
  }

  onRegister(e) {
    e.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert('Mismatch password confirmation');
    }

    this.props.store.register(username, email, password);
  }

  renderLogin() {
    const { username, password } = this.state;
    return (
      <Container>
        <form onSubmit={this.onLogin}>
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
            <Button type="button" transparent onClick={this.toggleRegister}>
              Register
            </Button>
            <Button type="submit" large marginLeft>Login</Button>
          </ButtonContainer>
        </form>
      </Container>
    );
  }

  renderRegister() {
    const { username, password, email, confirmPassword } = this.state;
    return (
      <Container>
        <form onSubmit={this.onRegister}>
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
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange('email')}
              value={email}
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
          <Field>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              onChange={this.onChange('confirmPassword')}
              value={confirmPassword}
            />
          </Field>
          <ButtonContainer>
            <Button type="button" transparent onClick={this.toggleRegister}>
              Login
            </Button>
            <Button type="submit" large marginLeft>Register</Button>
          </ButtonContainer>
        </form>
      </Container>
    );
  }

  render() {
    const { registering } = this.state;
    const loggedIn = this.props.store.loggedIn.get();

    if (!loggedIn && registering) return this.renderRegister();
    else if (!loggedIn && !registering) return this.renderLogin();
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

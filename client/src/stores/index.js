import { observable, action } from 'mobx';

export class User {
  id = null;
  username = observable('');
  email = observable('');
  role = observable('');
  posts = observable(null);

  constructor(data = {}) {
    this.update(data);
  }

  delete() {
    this.update({});
  }

  update(json) {
    this.id = json.id || json._id || null;
    this.username = json.username || '';
    this.email = json.email || '';
    this.role = json.role || '';
    this.posts = json.posts || null;
  }
}

export class Post {
  id = null;
  author = observable(null);
  body = observable('');
  created_at = observable(null);
  expired_on = observable(null);

  constructor(data = {}) {
    this.update(data);
  }

  delete() {
    this.update({});
  }

  update(json) {
    this.id = json.id || json._id || null;
    this.author = json.author || null;
    this.body = json.body || '';
    this.created_at = json.created_at || null;
    this.expired_on = json.expired_on || null;
  }
}

export default class Store {
  service;
  token = observable(null);
  loggedIn = observable(null);
  posts = observable([]);
  user = observable(null);

  constructor(service) {
    this.service = service;
  }

  register = action(async function(username, email, password) {
    try {
      await this.service.register(username, email, password);
      await this.login(username, password);
    } catch (err) {
      alert('Register failed');
    }
  });

  login = action(async function(username, password) {
    try {
      const data = await this.service.login(username, password);
      if (data.token) {
        this.token.set(data.token);
        localStorage.token = data.token;
        await this.fetchLogin(this.token);
      }
    } catch (err) {
      alert('Login failed');
    }
  });

  logout = action(function() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.loggedIn.set(null);
  });

  fetchLogin = action(async function(token) {
    try {
      const data = await this.service.fetchLogin(token);

      if (data) {
        this.loggedIn.set(new User(data));
      }
    } catch (err) {
      this.logout();
    }
  });

  fetchUser = action(async function(username) {
    const data = await this.service.fetchUser(username);
    if (data) {
      this.user.set(new User(data));
    }
  });

  fetchPosts = action(async function() {
    const data = await this.service.fetchPosts();
    if (data) {
      this.posts.replace(data.map(post => new Post(post)));
    }
  });

  submitPost = action(async function(body) {
    await this.service.submitPost(body);
    return await this.fetchPosts();
  });

  refreshLogin = action(function() {
    if (localStorage.token) {
      this.token.set(localStorage.token);
      this.fetchLogin(this.token);
    }
  });
}

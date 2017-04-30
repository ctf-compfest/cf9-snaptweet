import axios from 'axios';

export async function login(username, password) {
  const response = await axios.post('/api/login', { username, password });
  const token = response.data.token;

  if (token) {
    setToken(token);
    return { token };
  }

  return {};
}

export async function register(username, email, password) {
  const response = await axios.post('/api/users', {
    username,
    email,
    password,
  });
  return response.data;
}

export async function fetchLogin(token) {
  setToken(token);
  const response = await axios.get('/api/users/me');
  return response.data;
}

export async function fetchUser(username) {
  const response = await axios.get(`/api/users/${username}?populate=true`);
  return response.data;
}

export async function fetchPosts() {
  const response = await axios.get('/api/posts?populate=true');
  return response.data;
}

export async function submitPost(body) {
  return await axios.post('/api/posts', { body });
}

function setToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

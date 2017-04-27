import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export async function login(username, password) {
  const response = await axios.post('/api/login', { username, password });
  const token = response.data.token;

  if (token) {
    setToken(token);
    return { token };
  }

  return {};
}

export async function fetchLogin(token) {
  setToken(token);
  const response = await axios.get('/api/users/me');
  return response.data;
}

export async function fetchPosts() {
  const response = await axios.get('/api/posts?populate=true');
  return response.data;
}

function setToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

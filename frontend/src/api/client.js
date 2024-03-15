import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
};
const authAxios = axios.create(defaultOptions);
authAxios.interceptors.request.use(async (config) => {
  const userToken = `${await localStorage.getItem('token')}`;
  config.headers.Authorization = userToken ? `Bearer ${userToken}` : '';
  return config;
});
export default authAxios;

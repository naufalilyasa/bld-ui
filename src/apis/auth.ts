import axios, {AxiosInstance, AxiosPromise} from 'axios';
import {User} from '../stores/CredentialStore';

export const authApi: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const login = (email: string, password: string): AxiosPromise => {
  return authApi.request({
    method: 'POST',
    url: '/api/auth/signin',
    data: {
      email,
      password,
    },
  });
};

export const register = (user: User): AxiosPromise => {
  return authApi.request({
    method: 'POST',
    url: '/api/auth/signup',
    data: {
      ...user,
    },
  });
};

export default {
  login,
  register,
};

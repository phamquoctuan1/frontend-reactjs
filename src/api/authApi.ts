import { LoginGooglePayload, LoginPayload } from 'features/auth/authSlice';
import { User } from 'models';
import { UserRespone } from 'models/common';
import axiosClient from './axiosClient';

const productApi = {
  getUser(data: any): Promise<any> {
    const url = '/auth/user';
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${data} `,
      },
    });
  },
  updateUser(data: Partial<User>): Promise<any> {
    const url = '/user/update';
    return axiosClient.patch(url, data);
  },
  forgetUser(data: any): Promise<User> {
    const url = '/auth/forgetuser';
    return axiosClient.post(url, data);
  },
  recovertUser(data: any): Promise<string> {
    const url = `/auth/password-reset/${data.id}/${data.token}`;
    return axiosClient.post(url, { password: data.password });
  },

  login(data: LoginPayload): Promise<User> {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  loginGoogle(data: LoginGooglePayload): Promise<UserRespone> {
    const url = '/auth/google/login';
    return axiosClient.post(url, data);
  },
  register(data: User): Promise<User> {
    const url = '/auth/register';
    return axiosClient.post(url, data);
  },
};

export default productApi;

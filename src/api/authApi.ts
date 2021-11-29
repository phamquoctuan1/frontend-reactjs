import { LoginGooglePayload, LoginPayload } from 'features/auth/authSlice';
import { User } from 'models';
import { UserRespone } from 'models/common';
import axiosClient from './axiosClient';

const authApi = {
  getUser(data: any): Promise<any> {
    const url = '/auth/user';
    return axiosClient.get(url, {
      headers: {
        authorization: `Bearer ${data} `,
      },
    });
  },
  refreshToken(data: any): Promise<any> {
    const url = '/auth/refreshtoken';
    return axiosClient.post(url, data);
  },
  activeUser(data: any): Promise<string> {
    const url = `/auth/verify/${data.id}/${data.token}`;
    return axiosClient.get(url);
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
  getOrderReview(data: any): Promise<any> {
    const url = `/user/getorder/${data}`;
    return axiosClient.get(url);
  },
  getOrderDetails(data: any): Promise<any> {
    const url = `/user/getorderdetail/${data}`;
    return axiosClient.get(url);
  },
};

export default authApi;

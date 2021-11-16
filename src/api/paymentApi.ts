import axiosClient from './axiosClient';

const paymentApi = {
  getPayment(data: any) {
    const url = '/payment/checkout';
    return axiosClient.post(url, data);
  },
};
export default paymentApi;

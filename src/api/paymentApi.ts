import axiosClient from './axiosClient';

const paymentApi = {
  getPaymentNormal(data: any) {
    const url = 'payment/checkout/normal';
    return axiosClient.post(url, data);
  },
  getPaymentMomo(data: any) {
    const url = '/payment/checkout/momo';
    return axiosClient.post(url, data);
  },
  getPaymentVNPay(data: any) {
    const url = '/payment/checkout/vnpay';
    return axiosClient.post(url, data);
  },
};
export default paymentApi;

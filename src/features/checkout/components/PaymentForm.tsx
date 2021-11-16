import { Grid, Typography } from '@material-ui/core';
import paymentApi from 'api/paymentApi';
import { useAppSelector } from 'app/hooks';
import Button from 'components/common/Button';
import { selectCurrentUser } from 'features/auth/authSlice';
import { selectValueCart } from 'features/cart/cartItemsSlice';
import React from 'react';
import momoLogo from '../logo/logo-momo.jpg';
import vnpayLogo from '../logo/vnpay.jpg';

export default function PaymentForm() {
  const cartItems = useAppSelector(selectValueCart);
  const user = useAppSelector(selectCurrentUser);
  const handleCheckOutMomo = async () => {
    const list = cartItems.map((item) => {
      const items = {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
      return items;
    });
    const order = { userId: user?.id, listItems: list };
    const payUrl = await paymentApi.getPayment(order);
    window.location.replace(payUrl.toString());
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom align='center'>
        Phương thức thanh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button
            size='block'
            backgroundColor='momo'
            onClick={() => {
              handleCheckOutMomo();
            }}
          >
            <img src={momoLogo} alt='' />
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button size='block' backgroundColor='color'>
            <img src={vnpayLogo} alt='' />
          </Button>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button size='block'>Thanh toán khi nhận hàng</Button>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}

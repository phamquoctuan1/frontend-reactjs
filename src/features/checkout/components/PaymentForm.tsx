import {
  Box,
 Button,
  Container, Grid, makeStyles, Typography
} from '@material-ui/core';
import paymentApi from 'api/paymentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError } from 'axios';
import ButtonCpn from 'components/common/Button';
import { selectCurrentUser } from 'features/auth/authSlice';
import { cartActions, selectValueCart } from 'features/cart/cartItemsSlice';
import React , {  useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { selectCheckoutInfo } from '../checkoutSlice';
import momoLogo from '../logo/logo-momo.jpg';
import vnpayLogo from '../logo/vnpay.jpg';

   const useStyles = makeStyles((theme) => ({
     box: {
       display: 'flex',
       justifyContent: 'center',
       flexWrap: 'wrap',
     },
   }));
export default function PaymentForm() {
  const infoCheckout = useAppSelector(selectCheckoutInfo); 
  const addressDetails =
    infoCheckout.city +
    ' ' +
    infoCheckout.district +
    ' ' +
    infoCheckout.ward +
    ' ' +
    infoCheckout.address;
  const MySwal = withReactContent(Swal);
  const dispatch = useAppDispatch();
  const  [active, setActive] = useState(false)
  const cartItems = useAppSelector(selectValueCart);
  const user = useAppSelector(selectCurrentUser);
  const handleCheckOutMomo = async () => {
      setActive((prev) => !prev);
    const list = cartItems.map((item) => {
      const items = {
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
      };
      return items;
    });
    const order = {
      userId: user?.id,
      name_customer:infoCheckout.name,
      listItems: list,
      fee: infoCheckout.fee,
      phone: infoCheckout.phone,
      address: addressDetails,
    };
    const payUrl = await paymentApi.getPaymentMomo(order);
    window.location.replace(payUrl.toString());
  };
  const handleCheckOutVNPay = async () => {
       setActive((prev) => !prev);
    const list = cartItems.map((item) => {
      const items = {
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        color: item.color,
        size: item.size,
      };
      return items;
    });
    const order = {
      name_customer: infoCheckout.name,
      userId: user?.id,
      listItems: list,
      fee: infoCheckout.fee,
      phone: infoCheckout.phone,
      address: addressDetails,
    };
    const payUrl = await paymentApi.getPaymentVNPay(order);
    window.location.replace(payUrl.toString());
  };
   const handleCheckOutNormal = async () => {
      setActive((prev) => !prev);
     try {
       const list = cartItems.map((item) => {
         const items = {
           name: item.name,
           productId: item.productId,
           quantity: item.quantity,
           price: item.price,
           color: item.color,
           size: item.size,
         };
         return items;
       });
        const order = {
          name_customer: infoCheckout.name,
          userId: user?.id,
          listItems: list,
          fee: infoCheckout.fee,
          phone: infoCheckout.phone,
          address: addressDetails,
        };
       const payUrl  = await paymentApi.getPaymentNormal(order);
      
       // window.location.replace(payUrl.toString());
       if (Boolean(payUrl))
         dispatch(cartActions.clearCart());
        MySwal.fire(
          'Thanh toán thành công!',
          'Bạn có thể tiếp tục mua hàng hoặc kiểm tra đơn hàng tại hồ sơ',
          'success'
        );
     } catch (error) {
        let msg = (error as AxiosError).response?.data.message;     
       toast.error(msg, {
         position: 'top-right',
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
     }
   };
   const classes = useStyles();
  return (
    <Container maxWidth='lg'>
      <Link to='/checkout'>
        <Button variant='contained' color='primary'>
          Quay lại
        </Button>
      </Link>
      <Container component='main' maxWidth='sm'>
        <Typography component='h1' variant='h4' align='center'>
          Phương thức thanh toán
        </Typography>
        <Box className={classes.box} mt={3}>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ButtonCpn
                  size='block'
                  backgroundColor='momo'
                  disabled={active}
                  onClick={() => {
                    handleCheckOutMomo();
                  }}
                >
                  <img
                    src={momoLogo}
                    alt=''
                   
                  />
                </ButtonCpn>
              </Grid>
              <Grid item xs={12} md={6}>
                <ButtonCpn
                  size='block'
                  backgroundColor='color'
                  disabled={active}
                  onClick={() => {
                    handleCheckOutVNPay();
                  }}
                >
                  <img
                    src={vnpayLogo}
                    alt=''
                  
                  />
                </ButtonCpn>
              </Grid>

              <Grid item xs={12} sm={12}>
                <ButtonCpn
                  size='block'
                  disabled={active}
                  onClick={() => {
                    handleCheckOutNormal();
                  }}
                >
                  Thanh toán khi nhận hàng
                </ButtonCpn>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </React.Fragment>
        </Box>
      </Container>
    </Container>
  );
}

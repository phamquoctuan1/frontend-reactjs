import {
  Button,
  Container, Typography
} from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { cartActions } from 'features/cart/cartItemsSlice';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddressForm from './components/AddressForm';


export default function CheckoutPage() {
 const MySwal = withReactContent(Swal);
  const dispatch = useAppDispatch();
    const { search } = useLocation();
    const { vnp_ResponseCode, resultCode, message } = queryString.parse(search);
    useEffect(() => {
      if (resultCode) {
        if (Number(resultCode) === 0) {
          dispatch(cartActions.clearCart());
          MySwal.fire(
            message as string,
            'Bạn có thể tiếp tục mua hàng hoặc kiểm tra đơn hàng tại hồ sơ',
            'success'
          );
        } else {
           MySwal.fire(
             message as string,
             'Bạn vui lòng kiểm tra và thanh toán lại đơn hàng',
             'error'
           );
        }
      }
      if (vnp_ResponseCode) {
        if (vnp_ResponseCode === '00') {
          dispatch(cartActions.clearCart());
          MySwal.fire(
            message as string,
            'Bạn có thể tiếp tục mua hàng hoặc kiểm tra đơn hàng tại hồ sơ',
            'success'
          );
        } else {
         MySwal.fire(
           message as string,
           'Bạn vui lòng kiểm tra và thanh toán lại đơn hàng',
           'error'
         );
        }
      }
    }, [resultCode, message, vnp_ResponseCode, dispatch, MySwal]);

  return (
    <Container maxWidth='lg'>
      <Link to='/cart'>
        <Button variant='contained' color='primary'>
          Quay lại
        </Button>
      </Link>
      <Container component='main' maxWidth='sm'>
        <Typography component='h1' variant='h4' align='center'>
          Thông tin
        </Typography>   
            <AddressForm />    
      </Container>
    </Container>
  );
}

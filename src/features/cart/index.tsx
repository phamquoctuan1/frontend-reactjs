import { Box } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { Helmet } from 'components/common';
import Button from 'components/common/Button';
import { selectCurrentUser } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { selectValueCart } from './cartItemsSlice';
import CartItem from './components/CartItem';
import queryString from 'query-string';
export default function Cart() {
  const { search } = useLocation();
  const { resultCode, message } = queryString.parse(search);

  useEffect(() => {
    if (resultCode) {
      if (Number(resultCode) === 0) {
        alert(message);
        localStorage.removeItem('cartItems');
      } else {
        alert(message);
      }
    }
  }, [resultCode, message]);

  const cartItems = useAppSelector(selectValueCart);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useAppSelector(selectCurrentUser);
 
  const handleCheckOut = () => {
    alert('Không có sản phẩm nào trong giỏ hàng vui lòng thêm để thanh toán');
  };
  useEffect(() => {
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  return (
    <Helmet title='Giỏ hàng'>
      <div className='cart'>
        <div className='cart__info'>
          <div className='cart__info__txt'>
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className='cart__info__txt__price'>
              <span>Thành tiền:</span> <span>{totalPrice}</span>
            </div>
          </div>
          <div className='cart__info__btn'>
            {user ? (
              <Box mb={2}>
                {totalPrice > 0 ? (
                  <Link to='/checkout'>
                    <Button
                      size='block'
                      // onClick={() => {
                      //   handleCheckOut();
                      // }}
                    >
                      Thanh toán
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size='block'
                    onClick={() => {
                      handleCheckOut();
                    }}
                  >
                    Thanh toán
                  </Button>
                )}
              </Box>
            ) : (
              <Box mb={3}>
                <Link to='/login'>
                  <Button size='block'>Vui lòng đăng nhập để đặt hàng</Button>
                </Link>
              </Box>
            )}
            <Link to='/catalog'>
              <Button size='block'>Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className='cart__list'>
          {cartItems.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
    </Helmet>
  );
}

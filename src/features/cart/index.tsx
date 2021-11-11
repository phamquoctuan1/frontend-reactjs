import { Helmet } from 'components/common';
import Button from 'components/common/Button';
import React from 'react';
import { Link } from 'react-router-dom';


export default function Cart() {
  return (
    <Helmet title='Giỏ hàng'>
      <div className='cart'>
        <div className='cart__info'>
          <div className='cart__info__txt'>
            <p>Bạn đang có {0} sản phẩm trong giỏ hàng</p>
            <div className='cart__info__txt__price'>
              <span>Thành tiền:</span> <span>{0}</span>
            </div>
          </div>
          <div className='cart__info__btn'>
            <Button size='block'>Đặt hàng</Button>
            <Link to='/catalog'>
              <Button size='block'>Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className='cart__list'>
          {/* {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))} */}
        </div>
      </div>
    </Helmet>
  );
}

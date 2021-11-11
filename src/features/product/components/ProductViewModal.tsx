import Button from 'components/common/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ProductView from './ProductView';

const ProductViewModal = () => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  return (
    <div
      className={`product-view__modal ${product === undefined ? '' : 'active'}`}
    >
      <div className='product-view__modal__content'>
        <ProductView product={product} />
        <div className='product-view__modal__content__close'>
          <Button size='sm' onClick={() => {}}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;

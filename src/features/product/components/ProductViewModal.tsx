import productApi from 'api/productApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Button from 'components/Common/Button';
import { ProductResponse } from 'models';
import React, { useEffect, useState } from 'react';
import {
  productActions,
  selectClassName,
  selectValueSlug,
} from '../productSlice';
import ProductView from './ProductView';
const ProductViewModal = () => {
  const dispatch = useAppDispatch();
  const productSlug = useAppSelector(selectValueSlug);
  const classNameModal = useAppSelector(selectClassName);
  const [product, setProduct] = useState<any>(undefined);
  useEffect(() => {
    const getProduct = async () => {
      try {
        if (productSlug) {
          const productFetch: ProductResponse = await productApi.getBySlug(
            productSlug
          );

          setProduct(productFetch.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productSlug, dispatch]);

  const handleClickClosed = () => {
    dispatch(productActions.setClassName(''));
  };

  return (
    <div className={`product-view__modal ${classNameModal}`}>
      <div className='product-view__modal__content'>
        <ProductView product={product} />
        <div className='product-view__modal__content__close'>
          <Button size='sm' onClick={() => handleClickClosed()}>
            đóng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;

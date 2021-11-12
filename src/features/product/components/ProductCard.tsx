import { useAppDispatch } from 'app/hooks';
import React from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils';
import Button from '../../../components/common/Button';
import { productActions } from '../productSlice';

export interface ProductCardProps {
  img01?: string;
  img02?: string;
  name?: string;
  price?: number;
  slug?: string;
}

export const ProductCard = (props: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(productActions.set(props.slug as string));
    dispatch(productActions.setClassName('active'));
  };
  return (
    <div className='product-card'>
      <Link to={`/catalog/${props.slug}`}>
        <div className='product-card__image'>
          <img src={props.img01} alt='' />
          <img src={props.img02} alt='' />
        </div>
        <h3 className='product-card__name'>{props.name}</h3>
        <div className='product-card__price'>
          {numberWithCommas(props.price)}
          <div className='product-card__price__old'>
            <del>{399000}</del>
          </div>
        </div>
      </Link>
      <div className='product-card__btn'>
        <Button
          size='sm'
          icon='bx bx-cart'
          animate={true}
          onClick={() => {
            handleClick();
          }}
        >
          chọn mua
        </Button>
      </div>
    </div>
  );
};

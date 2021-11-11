import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';

export interface ProductCardProps {
  img01: string;
  img02: string;
  name: string;
  price: number;
  slug: string;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <div className='product-card'>
      <Link to={`/catalog/${props.slug}`}>
        <div className='product-card__image'>
          <img src={props.img01} alt='' />
          <img src={props.img02} alt='' />
        </div>
        <h3 className='product-card__name'>{props.name}</h3>
        <div className='product-card__price'>
          {props.price}
          <span className='product-card__price__old'>
            <del>{399000}</del>
          </span>
        </div>
      </Link>
      <div className='product-card__btn'>
        <Button size='sm' icon='bx bx-cart' animate={true}>
          chọn mua
        </Button>
      </div>
    </div>
  );
};

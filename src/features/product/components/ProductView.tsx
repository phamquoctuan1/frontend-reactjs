import Button from 'components/common/Button';
import React, { useEffect, useState } from 'react';

export interface ProductCardProps {
  title: string;
  price: string;
  image01: string;
  image02: string;
  categorySlug: string;
  colors: string[];
  slug: string;
  size: string[];
  description: string;
}
export interface ProductViewProps {
  product: any;
}

const ProductView = (props: ProductViewProps) => {
  let product = props.product;

  if (product === undefined)
    product = {
      title: '',
      price: '',
      image01: '',
      image02: '',
      categorySlug: '',
      colors: [],
      slug: '',
      size: [],
      description: '',
    };

  const [previewImg, setPreviewImg] = useState<string>(product.image01);

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState<string>('');

  const [size, setSize] = useState<string>('');

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type: string) => {
    if (type === 'plus') {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  useEffect(() => {
    setPreviewImg(product.image01);
    setQuantity(1);
    setColor('');
    setSize('');
  }, [product]);

  //   const check = () => {
  //     if (color === undefined) {
  //       alert('Vui lòng chọn màu sắc!');
  //       return false;
  //     }

  //     if (size === undefined) {
  //       alert('Vui lòng chọn kích cỡ!');
  //       return false;
  //     }

  //     return true;
  //   };

  return (
    <div className='product'>
      <div className='product__images'>
        <div className='product__images__list'>
          <div
            className='product__images__list__item'
            onClick={() => setPreviewImg(product.image01)}
          >
            <img src={product.image01} alt='' />
          </div>
          <div
            className='product__images__list__item'
            onClick={() => setPreviewImg(product.image02)}
          >
            <img src={product.image02} alt='' />
          </div>
        </div>
        <div className='product__images__main'>
          <img src={previewImg} alt='' />
        </div>
        <div
          className={`product-description ${descriptionExpand ? 'expand' : ''}`}
        >
          <div className='product-description__title'>Chi tiết sản phẩm</div>
          <div
            className='product-description__content'
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
          <div className='product-description__toggle'>
            <Button
              size='sm'
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </div>
        </div>
      </div>
      <div className='product__info'>
        <h1 className='product__info__title'>{product.title}</h1>
        <div className='product__info__item'>
          <span className='product__info__item__price'>{product.price}</span>
        </div>
        <div className='product__info__item'>
          <div className='product__info__item__title'>Màu sắc</div>
          <div className='product__info__item__list'>
            {product.colors.map((item: any, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item ? 'active' : ''
                }`}
                onClick={() => setColor(item)}
              >
                <div className={`circle bg-${item}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className='product__info__item'>
          <div className='product__info__item__title'>Kích cỡ</div>
          <div className='product__info__item__list'>
            {product.size.map((item: any, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item ? 'active' : ''
                }`}
                onClick={() => setSize(item)}
              >
                <span className='product__info__item__list__item__size'>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className='product__info__item'>
          <div className='product__info__item__title'>Số lượng</div>
          <div className='product__info__item__quantity'>
            <div
              className='product__info__item__quantity__btn'
              onClick={() => updateQuantity('minus')}
            >
              <i className='bx bx-minus'></i>
            </div>
            <div className='product__info__item__quantity__input'>
              {quantity}
            </div>
            <div
              className='product__info__item__quantity__btn'
              onClick={() => updateQuantity('plus')}
            >
              <i className='bx bx-plus'></i>
            </div>
          </div>
        </div>
        <div className='product__info__item'>
          <Button onClick={() => {}}>thêm vào giỏ</Button>
          <Button onClick={() => {}}>mua ngay</Button>
        </div>
      </div>
      <div
        className={`product-description mobile ${
          descriptionExpand ? 'expand' : ''
        }`}
      >
        <div className='product-description__title'>Chi tiết sản phẩm</div>
        <div
          className='product-description__content'
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className='product-description__toggle'>
          <Button
            size='sm'
            onClick={() => setDescriptionExpand(!descriptionExpand)}
          >
            {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

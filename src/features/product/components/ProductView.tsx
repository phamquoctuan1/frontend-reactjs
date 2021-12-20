import { useAppDispatch } from 'app/hooks';
import Button from 'components/common/Button';
import { cartActions } from 'features/cart/cartItemsSlice';
import { Product, Size } from 'models';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { productActions } from '../productSlice';
import { toast } from 'react-toastify';
import { numberWithCommas } from 'utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export interface ProductViewProps {
  product?: Product;
}
const ProductView = ({ product }: ProductViewProps) => {
  const MySwal = withReactContent(Swal);
  if (product === undefined)
    product = {
      name: '',
      price: 0,
      quantity: 0,
      description: '',
      imageInfo: [],
      sizeInfo: [],
      colorInfo: [],
      promoteInfo: [],
     discount_percentage:'',
      slug: '',
    };

  const history = useHistory();
  const dispatch = useAppDispatch();
  const [previewImg, setPreviewImg] = useState<any>(product.imageInfo[0]?.url);

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
    setPreviewImg(product?.imageInfo[0]?.url);
    setQuantity(1);
    setColor('');
    setSize('');
  }, [product]);

  const check = () => {
    if (color === '') {
      MySwal.fire(
        'Vui lòng chọn màu sắc!',
        '',
        'warning'
      );
      return false;
    }
    if (size === '') {
      MySwal.fire('Vui lòng chọn kích cỡ!', '', 'warning');
      return false;
    }
    return true;
  };
  const addToCart = () => {
    if (check()) {
      let newItem = {
        productId: product?.id,
        image: product?.imageInfo[0].url,
        name: product?.name,
        slug: product?.slug,
        color: color,
        size: size,
        price: product?.price,
        quantity: quantity,
      };
      if (dispatch(cartActions.addItem(newItem))) {
        MySwal.fire(
          'Thêm vào giỏ hàng thành công!',
          'Bạn có thể tiếp tục mua hàng!',
          'success'
        );
        // toast.success('Thêm vào giỏ hàng thành công', {
        //   position: 'top-center',
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   // toastId: 1,
        // });
      } else {
        toast.error('Thêm vào giỏ hàng thất bại thử lại sau', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const goToCart = () => {
    if (check()) {
      
     let newItem = {
       productId: product?.id,
       image: product?.imageInfo[0].url,
       name: product?.name,
       slug: product?.slug,
       color: color,
       size: size,
       price: product?.price,
       quantity: quantity,
     };
      if (dispatch(cartActions.addItem(newItem))) {
        dispatch(productActions.setClassName(''));
        history.push('/cart');
      }
    }
  };

  return (
    <div className='product'>
      <div className='product__images'>
        <div className='product__images__list'>
          <div
            className='product__images__list__item'
            onClick={() => setPreviewImg(product?.imageInfo[0]?.url)}
          >
            <img src={product.imageInfo[0]?.url} alt='' />
          </div>
          <div
            className='product__images__list__item'
            onClick={() => setPreviewImg(product?.imageInfo[1]?.url)}
          >
            <img src={product.imageInfo[1]?.url} alt='' />
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
            dangerouslySetInnerHTML={{ __html: product.description as string }}
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
        <h1 className='product__info__title'>{product.name}</h1>
        <div className='product__info__item'>
          <span className='product__info__item__price'>
            {numberWithCommas(product.price)}
          </span>
        </div>
        <div className='product__info__item'>
          <div className='product__info__item__title'>Màu sắc</div>
          <div className='product__info__item__list'>
            {product.colorInfo.map((item: any, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  color === item.name ? 'active' : ''
                }`}
                onClick={() => setColor(item.name)}
              >
                <div className={`circle bg-${item.code}`}></div>
              </div>
            ))}
          </div>
        </div>
        <div className='product__info__item'>
          <div className='product__info__item__title'>Kích cỡ</div>
          <div className='product__info__item__list'>
            {product.sizeInfo?.map((item: Size, index: number) => (
              <div
                key={index}
                className={`product__info__item__list__item ${
                  size === item.name ? 'active' : ''
                }`}
                onClick={() => setSize(item.name)}
              >
                <span className='product__info__item__list__item__size'>
                  {item.name}
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
          <Button
            onClick={() => {
              addToCart();
            }}
          >
            thêm vào giỏ
          </Button>
          <Button
            onClick={() => {
              goToCart();
            }}
          >
            mua ngay
          </Button>
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
          dangerouslySetInnerHTML={{ __html: product.description as string }}
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

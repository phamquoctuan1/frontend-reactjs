import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import React, { useRef } from 'react';
import category from '../../../assets/fake-data/category';
import colors from '../../../assets/fake-data/product-color';
import size from '../../../assets/fake-data/product-size';

export default function CatalogFilter() {
  const filterRef = useRef<HTMLDivElement>(null);

  const showHideFilter = () => filterRef.current?.classList.toggle('active');

  return (
    <>
      <div className='catalog__filter' ref={filterRef}>
        <div
          className='catalog__filter__close'
          onClick={() => showHideFilter()}
        >
          <i className='bx bx-left-arrow-alt'></i>
        </div>
        <div className='catalog__filter__widget'>
          <div className='catalog__filter__widget__title'>
            danh mục sản phẩm
          </div>
          <div className='catalog__filter__widget__content'>
            {category.map((item, index) => (
              <div
                key={index}
                className='catalog__filter__widget__content__item'
              >
                <CheckBox label={item.display} onChange={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <div className='catalog__filter__widget'>
          <div className='catalog__filter__widget__title'>màu sắc</div>
          <div className='catalog__filter__widget__content'>
            {colors.map((item, index) => (
              <div
                key={index}
                className='catalog__filter__widget__content__item'
              >
                <CheckBox label={item.display} onChange={() => {}} />
              </div>
            ))}
          </div>
        </div>

        <div className='catalog__filter__widget'>
          <div className='catalog__filter__widget__title'>kích cỡ</div>
          <div className='catalog__filter__widget__content'>
            {size.map((item, index) => (
              <div
                key={index}
                className='catalog__filter__widget__content__item'
              >
                <CheckBox label={item.display} />
              </div>
            ))}
          </div>
        </div>

        <div className='catalog__filter__widget'>
          <div className='catalog__filter__widget__content'>
            <Button size='sm' onClick={() => {}}>
              xóa bộ lọc
            </Button>
          </div>
        </div>
      </div>
      <div className='catalog__filter__toggle'>
        <Button size='sm' onClick={() => showHideFilter()}>
          bộ lọc
        </Button>
      </div>
    </>
  );
}

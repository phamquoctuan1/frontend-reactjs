import categoryApi from 'api/categoryApi';
import productApi from 'api/productApi';
import { useAppDispatch } from 'app/hooks';
import {
  Grid,
  Helmet,
  ProductCard,
  Section,
  SectionBody,
} from 'components/common';
import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import { Category, Color, Product, Size } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from 'utils/product-color';
import { size } from 'utils/product-size';
export interface initialFilterType {
  _page?: 0;
  _limit?: 12;
  category: string[];
  color: string[];
  size: string[];
}
const initialFilter: initialFilterType = {
  _page: 0,
  _limit: 12,
  category: [],
  color: [],
  size: [],
};
export default function Catalog() {
  const [productList, setProductList] = useState<Product[]>();
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(initialFilter);
  const [category, setCategory] = useState<Category[]>();
  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await categoryApi.getAll();
        setCategory(category.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, []);

  const filterRef = useRef<HTMLDivElement>(null);
  const showHideFilter = () => filterRef.current?.classList.toggle('active');

  const clearFilter = () => setFilter(initialFilter);

  const handleOnchangeCategory = (value: Category) => {
    const currentIdx: number = filter.category.indexOf(value.slug);
    const newCategory = [...filter.category];
    if (currentIdx === -1) {
      newCategory.push(value.slug);
    } else {
      newCategory.splice(currentIdx, 1);
    }
    setFilter({ ...filter, category: newCategory });
    console.log(currentIdx);
  };

  const handleOnchangeColor = (value: Color) => {
    const currentIdx: number = filter.color.indexOf(value.code);
    const newColor = [...filter.color];
    if (currentIdx === -1) {
      newColor.push(value.code);
    } else {
      newColor.splice(currentIdx, 1);
    }
    setFilter({ ...filter, color: newColor });
  };

  const handleOnchangeSize = (value: Size) => {
    const currentIdx: number = filter.size.indexOf(value.name);
    const newSize = [...filter.size];
    if (currentIdx === -1) {
      newSize.push(value.name);
    } else {
      newSize.splice(currentIdx, 1);
    }
    setFilter({ ...filter, size: newSize });
  };

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const productListData = await productApi.getAll(filter);
        setProductList(productListData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductList();
  }, [filter, dispatch]);

  return (
    <Helmet title='Sản phẩm'>
      <div className='catalog'>
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
              {category?.map((item, index) => (
                <div
                  key={index}
                  className='catalog__filter__widget__content__item'
                >
                  <CheckBox
                    label={item.name}
                    onChange={() => handleOnchangeCategory(item)}
                    checked={
                      filter.category.indexOf(item.slug) === -1 ? false : true
                    }
                  />
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
                  <CheckBox
                    label={item.name}
                    onChange={() => handleOnchangeColor(item)}
                    checked={
                      filter.color.indexOf(item.code) === -1 ? false : true
                    }
                  />
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
                  <CheckBox
                    label={item.name}
                    onChange={() => handleOnchangeSize(item)}
                    checked={
                      filter.size.indexOf(item.name) === -1 ? false : true
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget__content'>
              <Button size='sm' onClick={clearFilter}>
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
        <div className='catalog__content'>
          <Section>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productList?.map((item, index) => (
                  <ProductCard
                    key={index}
                    img01={item.imageInfo[0]?.url}
                    img02={item.imageInfo[1]?.url}
                    name={item.name}
                    price={Number(item.price)}
                    slug={item.slug}
                  />
                ))}
              </Grid>
            </SectionBody>
          </Section>
        </div>
      </div>
    </Helmet>
  );
}

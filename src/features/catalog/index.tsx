import { Box, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Helmet, Section, SectionBody } from 'components/Common';
import ButtonBnt from 'components/Common/Button';
import CheckBox from 'components/Common/CheckBox';
import SearchForm from 'components/Common/SearchForm';
import { productActions, selectProductList } from 'features/product/productSlice';
import { Color, ListResponse, Product, Size } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import InputRange from 'react-input-range';
import { numberWithCommas } from 'utils';
import { colors } from 'utils/product-color';
import { size } from 'utils/product-size';
import '../../assets/css/index.css';
import InfinityList from './components/InfinityList';

export interface initialFilterType {
  _page?: number;
  _limit?: number;
  name: string | undefined;
  categoryId: number|undefined;
  color: string[];
  size: string[];
  price?: number;
}
const initialFilter: initialFilterType = {
  name: undefined,
  _page: 1,
  _limit: 30,
  color: [],
  size: [],
  categoryId:undefined,
  price: undefined,
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function Catalog() {
  const priceSearchTimeoutRef = useRef<any>(null)
  const classes = useStyles();
  const productList = useAppSelector(selectProductList)
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState(initialFilter);
   const [price, setPrice] = useState(100000);

 

  const filterRef = useRef<HTMLDivElement>(null);
  const showHideFilter = () => filterRef.current?.classList.toggle('active');

  const clearFilter = () => setFilter(initialFilter);

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
  const handleOnchangePrice = (value: any) => {
   
    if (priceSearchTimeoutRef.current){
      clearTimeout(priceSearchTimeoutRef.current);
    }

    priceSearchTimeoutRef.current = setTimeout(() => {
          setPrice(value);
          setFilter({ ...filter, price: value });
    },100)
     
  }

  const handleSearchSubmit = async (formValues: any) => {
    setFilter({ ...filter, name: formValues.name });
  };
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const productListData :ListResponse<Product> = await productApi.getAll(filter);
        dispatch(productActions.fetchProductListSuccess(productListData))
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
              <SearchForm
                initialValues={{ name: '' }}
                onSubmit={handleSearchSubmit}
              />
            </div>

            {/* <div className='catalog__filter__widget__title'>
              danh mục sản phẩm
            </div>
            <div className='catalog__filter__widget__content'>
              <Button color='primary' size='medium' onClick={clearFilter}>
                Tất cả
              </Button>
            <div></div>
             
            </div> */}
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
            <div className='catalog__filter__widget__title'>Giá từ</div>
            <div className='catalog__filter__widget__content'>
              <InputRange
                maxValue={300000}
                minValue={100000}
                formatLabel={(value) => numberWithCommas(value)}
                value={price}
                onChange={(value) => handleOnchangePrice(value)}
              />
            </div>
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget__content'>
              <ButtonBnt size='sm' onClick={clearFilter}>
                xóa bộ lọc
              </ButtonBnt>
            </div>
          </div>
        </div>
        <div className='catalog__filter__toggle'>
          <ButtonBnt size='sm' onClick={() => showHideFilter()}>
            bộ lọc
          </ButtonBnt>
        </div>
        <div className='catalog__content'>
          {productList?.length !== 0 ? (
            <Section>
              <SectionBody>
                <InfinityList product={productList} />
              </SectionBody>
            </Section>
          ) : (
            <Section>
              <SectionBody>
                <Box className={classes.root}>
                  <h1>Không tìm thấy sản phẩm nào theo yêu cầu</h1>
                  <ButtonBnt onClick={()=>clearFilter()}>Quay lại</ButtonBnt>
                </Box>
              </SectionBody>
            </Section>
          )}
        </div>
      </div>
    </Helmet>
  );
}

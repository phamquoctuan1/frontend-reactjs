import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Helmet, Section, SectionBody } from 'components/common';
import ButtonBnt from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import SearchForm from 'components/common/SearchForm';
import { productActions, selectProductFilter, selectProductList } from 'features/product/productSlice';
import { Color, ListParams, Size } from 'models';
import React, { useEffect, useRef, useState } from 'react';
import InputRange from 'react-input-range';
import { numberWithCommas } from 'utils';
import { colors } from 'utils/product-color';
import { size } from 'utils/product-size';
import '../../assets/css/index.css';
import InfinityList from './components/InfinityList';


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
// export interface initialFilterType {
//   _page?: number;
//   _limit?: number;
//   name: string | undefined;
//   categoryId: number | undefined;
//   color: string[];
//   size: string[];
//   price?: number;
// }
const initialFilter: ListParams = {
  name: undefined,
  _page: 1,
  _limit: 30,
  color: [],
  size: [],
  categoryId: undefined,
  price: undefined,
};

export default function Catalog() {
  const priceSearchTimeoutRef = useRef<any>(null)
  const classes = useStyles();
  const productList = useAppSelector(selectProductList)
  const dispatch = useAppDispatch();
 const filter = useAppSelector(selectProductFilter);
   const [price, setPrice] = useState({min:0,max:300000});
  // const history = useHistory();
 const searchRef = useRef<HTMLInputElement>();
  const filterRef = useRef<HTMLDivElement>(null);
  const showHideFilter = () => filterRef.current?.classList.toggle('active');

  const clearFilter = () =>{
     dispatch(productActions.setFilter({ ...initialFilter })); 
      if (searchRef.current) {
      searchRef.current.value = '';
    }
     setPrice({ min: 0, max: 300000 });
    };

  const handleOnchangeColor = (value: Color) => {
    const currentIdx: number = filter.color.indexOf(value.code);
    const newColor = [...filter.color];
    if (currentIdx === -1) {
      newColor.push(value.code);
    } else {
      newColor.splice(currentIdx, 1);
    }
    dispatch(productActions.setFilter({ ...filter, color: newColor }));
  };

  const handleOnchangeSize = (value: Size) => {
    const currentIdx: number = filter.size.indexOf(value.name);
    const newSize = [...filter.size];
    if (currentIdx === -1) {
      newSize.push(value.name);
    } else {
      newSize.splice(currentIdx, 1);
    }
    dispatch(productActions.setFilter({ ...filter, size: newSize }));
  };
  const handleOnchangePrice = (value: any) => {
   
    if (priceSearchTimeoutRef.current){
      clearTimeout(priceSearchTimeoutRef.current);
    }
    priceSearchTimeoutRef.current = setTimeout(() => {
          setPrice(value);
          dispatch(
            productActions.setFilter({ ...filter, price: Object.values(value) })
          );
    },100) 
  }
  
  
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch, filter]);
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilterWithDebounce(newFilter));
  };
  return (
    <Helmet title='S???n ph???m'>
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
                searchRef={searchRef}
                filter={filter}
                onSearchChange={handleSearchChange}
              />
            </div>

            {/* <div className='catalog__filter__widget__title'>
              danh m???c s???n ph???m
            </div>
            <div className='catalog__filter__widget__content'>
              <Button color='primary' size='medium' onClick={clearFilter}>
                T???t c???
              </Button>
            <div></div>
             
            </div> */}
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget__title'>m??u s???c</div>
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
            <div className='catalog__filter__widget__title'>k??ch c???</div>
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
            <div className='catalog__filter__widget__title'>Gi?? t???</div>
            <div className='catalog__filter__widget__content'>
              <InputRange
                maxValue={300000}
                minValue={0}
                formatLabel={(value) => numberWithCommas(value)}
                value={price}
                onChange={(value) => handleOnchangePrice(value)}
                // onChangeComplete={(value) => console.log(value)}
              />
          
            </div>
          </div>

          <div className='catalog__filter__widget'>
            <div className='catalog__filter__widget__content'>
              <ButtonBnt size='sm' onClick={clearFilter}>
                x??a b??? l???c
              </ButtonBnt>
            </div>
          </div>
        </div>
        <div className='catalog__filter__toggle'>
          <ButtonBnt size='sm' onClick={() => showHideFilter()}>
            b??? l???c
          </ButtonBnt>
        </div>
        <div className='catalog__content'>
          {productList?.length ? (
            <Section>
              <SectionBody>
                <InfinityList products={productList} />
              </SectionBody>
            </Section>
          ) : (
            <Section>
              <SectionBody>
                <Box className={classes.root}>
                  <h1>Kh??ng t??m th???y s???n ph???m n??o theo y??u c???u</h1>
                  <ButtonBnt onClick={clearFilter}>Quay l???i</ButtonBnt>
                </Box>
              </SectionBody>
            </Section>
          )}
        </div>
      </div>
    </Helmet>
  );
}

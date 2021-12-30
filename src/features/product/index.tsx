import productApi from 'api/productApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Grid,
  Helmet,
  ProductCard,
  Section,
  SectionBody,
  SectionTitle
} from 'components/common';
import { ProductResponse } from 'models';
import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ProductView from './components/ProductView';
// import ProductView from './components/ProductView';
import {
  productActions,
  selectProduct,
  selectProductList
} from './productSlice';


const filter = {
  name: undefined,
  _page: 1,
  _limit: 8,
  color: [],
  size: [],
  categoryId: undefined,
  price: undefined,
};
export default function ProductPage() {
  let { slug } = useParams<{ slug?: string }>();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectProduct);
  
  const productList = useAppSelector(selectProductList);
 
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productFetch: ProductResponse = await productApi.getBySlug(slug);
        dispatch(productActions.fetchProduct(productFetch.data));
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [slug, dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productList]);
  if (!productList) {
    return <Redirect to='/' />;
  }

  return (
    <Helmet title={`${product.name}`}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productList.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.imageInfo[0]?.url}
                img02={item.imageInfo[1]?.url}
                name={item.name}
                discount_price={item.discount_percentage}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
}

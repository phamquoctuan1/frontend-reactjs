import {
  Grid,
  Helmet,
  ProductCard,
  Section,
  SectionBody,
  SectionTitle
} from 'components/common';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../assets/fake-data/products';
import ProductView from './components/ProductView';

export default function Product() {
  let { slug } = useParams<{ slug?: string }>();
  const product = productData.getProductBySlug(slug);

  const relatedProducts = productData.getProducts(8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={product?.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
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

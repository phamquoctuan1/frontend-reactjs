import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  productActions,
  selectProductFilter,
  selectProductList,
} from 'features/product/productSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroSliderData from '../../assets/fake-data/hero-slider';
import policy from '../../assets/fake-data/policy';
import banner from '../../assets/images/banner2.png';
import {
  Grid,
  Helmet,
  HeroSlider,
  PolicyCard,
  ProductCard,
  Section,
  SectionBody,
  SectionTitle,
} from '../../components/Common';

export default function Home() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectProductFilter);
  const product = useAppSelector(selectProductList);
  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [filter, dispatch]);
  const productlist1 = product.slice(0, 4);
  const productlist2 = product.slice(4, 12);
  const productlist3 = product.slice(12, 24);
  console.log(productlist3);
  return (
    <Helmet title='Trang chủ'>
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={true}
        timeOut={3000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to='/policy'>
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productlist1?.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.imageInfo[0]?.url}
                img02={item.imageInfo[1]?.url}
                name={item.name}
                price={Number(item.price)}
                discount_price={item.discount_percentage}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productlist2?.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.imageInfo[0]?.url}
                img02={item.imageInfo[1]?.url}
                name={item.name}
                price={Number(item.price)}
                discount_price={item.discount_percentage}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to='/catalog'>
            <img src={banner} alt='' />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productlist3.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.imageInfo[0]?.url}
                img02={item.imageInfo[1]?.url}
                name={item.name}
                price={Number(item.price)}
                discount_price={item.discount_percentage}
                slug={item.slug}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end popular product section */}
    </Helmet>
  );
}

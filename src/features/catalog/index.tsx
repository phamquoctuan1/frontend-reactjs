import {
  Grid,
  Helmet,
  ProductCard,
  Section,
  SectionBody,
} from 'components/common';

import productData from '../../assets/fake-data/products';
import CatalogFilter from './components/CatalogFilter';

export default function Catalog() {
  const productList = productData.getAllProducts();

  return (
    <Helmet title='Sản phẩm'>
      <div className='catalog'>
          <CatalogFilter />
        <div className='catalog__content'>
          <Section>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {productList.map((item, index) => (
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
        </div>
      </div>
    </Helmet>
  );
}

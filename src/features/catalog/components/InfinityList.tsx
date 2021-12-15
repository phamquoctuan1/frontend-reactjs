import { Grid, ProductCard } from 'components/Common';
import { Product } from 'models';
import React, { useEffect, useRef, useState } from 'react';

export interface InfinityListProps {
  product?: Product[];
}
export default function InfinityList({ product }: InfinityListProps) {
  const perLoad = 6; // items each load

  const listRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<Product[]>();

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(product?.slice(0, perLoad));
    setIndex(1);
  }, [product]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      if (product) {
        const pages = Math.floor(product.length / perLoad);
        const maxIndex = product?.length % perLoad === 0 ? pages : pages + 1;

        if (load && index <= maxIndex) {
          const start = perLoad * index;
          const end = start + perLoad;

          setData(data?.concat(product.slice(start, end)));
          setIndex(index + 1);
        }
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, product]);

  return (
    <div ref={listRef}>
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {data?.map((item, index) => (
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
    </div>
  );
}


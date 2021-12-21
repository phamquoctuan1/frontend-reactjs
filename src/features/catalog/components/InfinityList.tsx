import { Grid, ProductCard } from 'components/common';
import { Product } from 'models';
import React, { useEffect, useRef, useState } from 'react';

export interface InfinityListProps {
  products?: Product[];
}
export default function InfinityList({ products }: InfinityListProps) {
  const perLoad = 6; // items each load

  const listRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<Product[]>();

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {

    setData(products?.slice(0, perLoad));
    setIndex(1);
  }, [products]);

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
      if (products?.length) {
        const pages = Math.floor(products.length / perLoad);
        const maxIndex = products?.length % perLoad === 0 ? pages : pages + 1;

        if (load && index <= maxIndex) {
          const start = perLoad * index;
          const end = start + perLoad;
  
          setData((preState) => preState?.concat(products.slice(start, end)));
          setIndex(index + 1);
        }
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, products]);




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


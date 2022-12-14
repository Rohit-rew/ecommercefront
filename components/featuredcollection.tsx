import React, { Fragment } from "react";
import ProductCard from "./productCard";

export default function FeaturedCollection({ tshirts }: any) {
  const tshirtjsx = tshirts.map((tshirt: any, i: number) => {
    return <ProductCard key={i} tshirt={tshirt} />;
  });

  return (
    <div className="featuredcollection flex p-5 flex-col gap-10 pb-20 bg-gray-200">
      <hr className="bg-black w-full" />
      <h1 className="text-5xl text-red-600 text-center rounded p-2 box-border">
        Featured Collection
      </h1>

      <div className="product__container flex gap-10 justify-center flex-wrap">
        {tshirtjsx}
      </div>
    </div>
  );
}

import React from "react";
import ProductCard from "../../components/productCard";

export default function Products({ data }) {
  const productjsx = data.map((product) => {
    return <ProductCard tshirt={product} />;
  });

  return (
    <div className="pt-24 flex flex-col gap-10">
      <h1 className="text-5xl text-center">All products</h1>

      <hr />

      <div className="flex gap-10 flex-wrap justify-center pb-10">
        {productjsx}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:1337/api/tshirts/?populate=*");
  const data_res = await data.json();

  return {
    props: data_res,
  };
}

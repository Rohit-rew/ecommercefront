import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function Product(props: any) {
  const product = props.data.attributes;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-74 object-cover object-center rounded bg-white "
            src={`http://192.168.1.7:1337${product.image.data.attributes.url}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              PENGO
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.Title}
            </h1>
            <div className="flex mb-4"></div>
            <p className="leading-relaxed">{product.description} </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {" "}
              <span className="title-font font-medium text-xl text-gray-900">
                Available :
              </span>{" "}
              <span className="title-font font-medium text-xl text-gray-900 ml-5 text-green-700">
                {product.stock}
              </span>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                Rs.{product.price}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Buy Now
              </button>

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <FontAwesomeIcon className="w-6" icon={faCartPlus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: any) {
  const { product } = context.query;

  const data = await fetch(
    `http://localhost:1337/api/tshirts/${product}/?populate=*`
  );
  const tshirt = await data.json();

  console.log(product);
  return {
    props: tshirt,
  };
}

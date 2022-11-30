import React from "react";
import Link from "next/link";
import Router from "next/router";

export default function ProductCard({ tshirt }: any) {
  const [animate, setanimate] = React.useState(false);

  function addToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setanimate(true);

    setTimeout(() => {
      setanimate(false);
    }, 1500);
  }

  function openProduct(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    route: string
  ) {
    e.stopPropagation();
    Router.push(`/${route}`);
  }

  return (
    <>
      {animate && <AddedToCart />}
      <div className="productCard shadow-md rounded-md bg-gray-600">
        <img
          onClick={(e) => openProduct(e, `products/${tshirt.id}`)}
          src={`http://192.168.1.7:1337${tshirt.attributes.image.data.attributes.url}`}
        />

        <div
          onClick={(e) => openProduct(e, `products/${tshirt.id}`)}
          className="flex bg-gray-800 p-5 justify-between items-center rounded"
        >
          <div>
            <h2 className="text-white">{tshirt.attributes.Title}</h2>
            <h2 className="text-white">Price : {tshirt.attributes.price}</h2>
          </div>
          <button
            onClick={(e) => addToCart(e)}
            className="text-white bg-green-400 p-2 rounded"
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

function AddedToCart() {

  return (
    <div className="addedtocart w-screen h-screen fixed flex justify-center items-center top-0">
      <div className="w-44  bg-white p-1 box-border justify-center items-center rounded-md">
        <img className="w-full" src="/added.png" />
      </div>
    </div>
  );
}

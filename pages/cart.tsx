import React from "react";
import { cartContext } from "../context/cart";

export default function Cart() {
  const { cart } = React.useContext(cartContext);
  return (
    <div className="pt-24 w-full min-h-screen p-5 bg-gray-200 justify-center items-center flex flex-col">
      {Boolean(cart.items.length) && (
        <>
          <div className=" w-full shadow p-5 box-border rounded flex flex-col gap-5 bg-white max-w-xl">
            {cart.items.map((product: any) => {
              return (
                <div className="product-container w-full h-20 bg-gray-700 flex gap-5 rounded p-2 justify-between ">
                  <div className="flex">
                    <img
                      src={`http://192.168.1.7:1337${product.attributes.image.data.attributes.url}`}
                      className="h-full"
                    />
                    <div className="flex flex-col justify-between text-gray-300">
                      <h2>{product.attributes.Title}</h2>
                      <span className="text-gray-300">
                        {product.attributes.price} X {product.qty}
                      </span>
                    </div>
                  </div>

                  {/* <p>{product.total}</p> */}
                  <div className="flex flex-col w-6 gap-2">
                    <button className="bg-green-400 w-full h-2/4 rounded flex item-center justify-center text-xl">+</button>
                    <button className="bg-red-400 w-full h-2/4 rounded flex item-center justify-center text-xl">-</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full  shadow mt-5 rounded bg-white p-5 max-w-xl ">
            <div className="flex flex-col gap-1 font-thin">
              <div className="flex justify-between">
                <span>Sub Total : </span> <span>{cart.checkout.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Gst : </span> <span>{cart.checkout.gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping : </span> <span>00.00</span>
              </div>
              <div className="flex justify-between font-extrabold">
                <span>Total : </span>{" "}
                <span>{cart.checkout.total.toFixed(2)}</span>
              </div>
            </div>
            <button className="bg-red-500 w-full py-1 rounded text-white mt-2">
              Proceed to checkout
            </button>
          </div>
        </>
      )}

      {!Boolean(cart.items.length) && (
        <h3 className="text-center text-gray-400 ">
          There are no items in the cart.
        </h3>
      )}
    </div>
  );
}

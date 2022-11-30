import { PRERENDER_REVALIDATE_HEADER } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

type product = {
  id: number;
  attributes: {
    sku: string;
    price: number;
    title: string;
    description: string;
  };
  qty: number;
};

const cartContext = React.createContext({});

function Cart(props: any) {
  const [cart, setcart] = React.useState({ items: [], checkout: {} });
  const [reload , setreload] = React.useState(1)

  //returns subtotal of the cart
  function subtotal(itemsarray: product[]) {
    let subTotal = 0;
    itemsarray.forEach((item) => {
      console.log(item.attributes.price , item.qty)
      subTotal += item.attributes.price * item.qty;
    });
    return subTotal;
  }

  //returns taxes to be charged on subtotal
  function gst(subtotal: number): number {
    const totalGst = (subtotal * 6) / 100;
    return totalGst;
  }

  //returns grandtotal of cart
  function total(subtotal: number, gstTotal: number): Number {
    const GrandTotal = subtotal + gstTotal;
    return GrandTotal;
  }

  // adds a item to cart
  function addItem(item: product) {
    if (!cart.items.length) {
      setcart({
        items: [{ ...item, total: item.attributes.price * item.qty }],
        checkout: {
          subtotal: subtotal(cart.items),
          gst: gst(subtotal(cart.items)),
          total: total(subtotal(cart.items), gst(subtotal(cart.items))),
        },
      }); //=>
    } else if (cart.items.length) {
      setcart((preval) => {
        const product = preval.items.find((product) => {
          return product.attributes.sku === item.attributes.sku;
        });
        if (product) {
          const index = preval.items.findIndex((item) => {
            return product.attributes.sku === item.attributes.sku;
          });

          preval.items.splice(index, 1, {
            ...product,
            qty: product.qty + 1,
            total: product.attributes.price * (product.qty+1),
          });
          return {
            items: [...preval.items],
            checkout: {
              subtotal: subtotal(preval.items),
              gst: gst(subtotal(preval.items)),
              total: total(subtotal(preval.items), gst(subtotal(preval.items))),
            },
          }; //==>
        } else {
          //not found
          return {
            items: [
              ...preval.items,
              { ...item, total: item.attributes.price * item.qty },
            ],
            checkout: {
              subtotal: subtotal(preval.items),
              gst: gst(subtotal(preval.items)),
              total: total(subtotal(preval.items), gst(subtotal(preval.items))),
            },
          }; //==>
        }
      });
    }
    setreload(Math.random())
  }

  return (
    <cartContext.Provider value={{ cart, addItem }}>
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, Cart };

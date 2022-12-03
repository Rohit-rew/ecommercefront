import { PRERENDER_REVALIDATE_HEADER } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";
import { Context } from "vm";

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


const cartContext = React.createContext({cart : [] , cartValue : {} });

function Cart(props: any) {

  const [cart, setcart] = React.useState([]);
  const [cartValue, setCartvalue] = React.useState({});
  const [reload , setReload] = React.useState(1)

  //returns subtotal of the cart
  function subtotal(itemsarray: product[]) {
    let subTotal = 0;
    itemsarray.forEach((item) => {
      console.log(item.attributes.price, item.qty);
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

  function totalItems(itemsArray: product[]) {
    let totalqty = 0;
    itemsArray.forEach((item) => {
      totalqty += item.qty;
    });

    return totalqty;
  }

  React.useEffect(() => {
    if (cart.length) {
      setCartvalue(() => {
        return {
          totalItems: totalItems(cart),
          subtotal: subtotal(cart),
          gst: gst(subtotal(cart)),
          total: total(subtotal(cart), gst(subtotal(cart))),
        };
      });
    }
  }, [cart , reload]);

  // adds a item to cart
  function addItem(item: product) {
    if (!cart.length) {
      setcart([{ ...item, total: item.attributes.price * item.qty }]); //=>
    } else if (cart.length) {
      setcart((preval) => {
        const product = preval.find((product) => {
          return product.attributes.sku === item.attributes.sku;
        });
        if (product) {
          const index = preval.findIndex((item) => {
            return product.attributes.sku === item.attributes.sku;
          });

          preval.splice(index, 1, {
            ...product,
            qty: product.qty + 1,
            total: product.attributes.price * (product.qty + 1),
          });
          return [...preval];
        } else {
          return [
            ...preval,
            { ...item, total: item.attributes.price * item.qty },
          ];
        }
      });
    }
  }

  function removeItem(item: product, index: number) {
    if (item.qty === 1) {
      setcart((preval) => {
        preval.splice(index, 1);
        return preval;
      });
    } else if (item.qty > 1) {
      setcart((preval) => {
        const product = preval.find((product) => {
          return product.attributes.sku === item.attributes.sku;
        });
        const updatedProduct = { ...product, qty: product.qty - 1 , total : (product.attributes.price*(product.qty-1)) };
        preval[index] = updatedProduct;
        return preval;
      });
    }
    setReload(Math.random())
  }

  return (
    <cartContext.Provider key={reload} value={{ cart, cartValue, addItem , removeItem }}>
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, Cart };

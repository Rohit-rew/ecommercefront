import React, { ReactComponentElement, ReactPropTypes, useEffect, useState } from "react";
import PropTypes from 'prop-types';


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

type cart = {}[]

type cartValue ={
  totalItems : number,
  subtotal : number,
  gst : number,
  total : number
}

type cartContext = {
  cart : cart
  cartValue : cartValue
  addItem : (val : product)=>void
  removeItem : (val : product , i : number )=>void
}

type children = {
  children : React.ReactNode
}

// const cartContext = React.createContext({cart : [] , cartValue : {} });
const cartContext = React.createContext <cartContext | undefined>(undefined);

function Cart({children} : children) {

  const [cart, setcart] = useState([]);
  const [cartValue, setCartvalue] = useState <cartValue>({totalItems : 0 , subtotal : 0 , gst : 0 , total : 0});
  const [reload , setReload] = useState(1)

  //returns subtotal of the cart
  function subtotal(itemsarray: product[]) {
    let subTotal = 0;
    itemsarray.forEach((item) => {
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
  function total(subtotal: number, gstTotal: number): number {
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

  useEffect(() => {
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
      {children}
    </cartContext.Provider>
  );
}

export { cartContext, Cart };

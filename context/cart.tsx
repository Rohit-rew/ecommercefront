import React, { useEffect, useState } from "react";

const cartContext = React.createContext();

function Cart(props: any) {
  const [cart, setcart] = React.useState([]);
  const [reload, setreload] = React.useState(1); //need to remove this

  function addItem(item: any) {
    setcart((preval) => {
      return [...preval, item];
    });
    setreload(Math.random());  //need to remove this
  }

  return (
    <cartContext.Provider  value={{ cart, addItem }}>
      {props.children}
    </cartContext.Provider>
  );
}

export { cartContext, Cart };

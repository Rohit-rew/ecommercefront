import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "../context/cart";

export default function Header() {
  const [isMenueOpen, setMenu] = React.useState(false);
  const { pathname } = useRouter();

  function toggleHam() {
    setMenu((preval) => !preval);
  }

  function toggleCart() {
    Router.push("/cart")
    setMenu(false);
  }

  // contains the cart context
  const { cart } = React.useContext(cartContext);
  console.log(cart);
  return (
    <>
      <header className="w-full bg-gray-800 h-20 px-5 flex items-center justify-between sm:px-7 lg:px-10 z-20 fixed top-0">
        <Link href={"/"}>
          <h1 className="text-gray-400 text-4xl">Pengo</h1>
        </Link>

        <div className="flex items-center ">
          <div className="hidden md:flex h-full items-center gap-10 mr-20 p-5 ">
            <Link href={"/"}>
              <div className="bg-gray-700 text-gray-300 px-5 py-1 rounded-md">
                Home
              </div>
            </Link>
            <Link href={"/products"}>
              <div className="bg-gray-700 text-gray-300 px-5 py-1 rounded-md">
                Products
              </div>
            </Link>
            <Link href={"/account"}>
              <div className="bg-gray-700 text-gray-300 px-5 py-1 rounded-md">
                Account
              </div>
            </Link>
            <Link href={"/about"}>
              <div className="bg-gray-700 text-gray-300 px-5 py-1 rounded-md">
                About
              </div>
            </Link>
          </div>

          <div className="flex justify-center w-25 gap-5 h-full items-center relative">
            <FontAwesomeIcon
              icon={faCartShopping}
              onClick={() => toggleCart()}
              className="text-gray-400 w-8 text-5xl"
            />
            {Boolean(cart.length) && (
              <span className="text-xs absolute left-0 top-0 bg-red-400 rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            {!isMenueOpen && (
              <FontAwesomeIcon
                onClick={(e) => toggleHam()}
                icon={faBars}
                className="text-gray-400 w-8 text-5xl md:hidden"
              />
            )}
            {isMenueOpen && (
              <FontAwesomeIcon
                onClick={(e) => toggleHam()}
                icon={faClose}
                className="text-gray-400 w-8 text-5xl md:hidden"
              />
            )}
          </div>
        </div>
      </header>

      {isMenueOpen && (
        <div className="fixed w-full bg-gray-800 top-0 left-0 z-0 px-5 pt-20 pb-5 flex flex-col text-xl gap-2 shadow-xl">
          <Link href={"/"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400   p-2 rounded-lg md:hidden ${
                pathname == "/" ? "bg-gray-900" : ""
              }`}
            >
              Home
            </div>
          </Link>
          <Link href={"/products"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 md:hidden ${
                pathname == "/products" ? "bg-gray-900" : ""
              }`}
            >
              Products
            </div>
          </Link>
          <Link href={"/account"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 md:hidden ${
                pathname == "/account" ? "bg-gray-900" : ""
              }`}
            >
              Account
            </div>
          </Link>
          <Link href={"/about"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 md:hidden ${
                pathname == "/about" ? "bg-gray-900" : ""
              }`}
            >
              About
            </div>
          </Link>
        </div>
      )}

    </>
  );
}




      // {/*cart*/}
      // {isCartOpen && (
      //   <div className="fixed w-full bg-gray-800 top-0 left-0 z-0 px-5 pt-20 pb-5 flex flex-col gap-6 text-xl gap-2 shadow-xl overflow-scroll ">
      //     {!Boolean(cart.length) && (
      //       <h3 className="text-gray-400 text-center p-5">
      //         No items in the cart
      //       </h3>
      //     )}

      //     {cart.map((product) => {
      //       return (
      //         <div className="product-container w-full h-20 bg-gray-700 flex gap-5 rounded p-2">
      //           <img src={`http://192.168.1.7:1337${product.attributes.image.data.attributes.url}`} className="h-full" />
      //           <div className="flex flex-col justify-between text-gray-300">
      //             <h2>{product.attributes.Title}</h2>
      //             <span>{product.attributes.price}</span>
      //           </div>
      //         </div>
      //       );
      //     })}

      //     <hr />
      //   </div>
      // )}
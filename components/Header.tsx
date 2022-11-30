import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMenueOpen, setMenu] = React.useState(false);
  const [isCartOpen, setCart] = React.useState(false);
  // const {pathname} = Router
  const {pathname} = useRouter()

  function toggleHam() {
    setMenu((preval) => !preval);
    setCart(false)
  }

  function toggleCart(){
    setCart(preval=> !preval)
    setMenu(false)
  }

  return (
    <>
      <header className="w-full bg-gray-800 h-20 px-5 flex items-center justify-between sm:px-7 lg:px-10 z-20 fixed top-0">
        <Link href={"/"}>
          <h1 className="text-gray-400 text-4xl">Pengo</h1>
        </Link>

        <div className="flex justify-center w-25 gap-5 h-full items-center">
          <FontAwesomeIcon
            icon={faCartShopping}
            onClick={()=>toggleCart()}
            className="text-gray-400 w-8 text-5xl sm:hidden"
          />
          {!isMenueOpen && (
            <FontAwesomeIcon
              onClick={(e) => toggleHam()}
              icon={faBars}
              className="text-gray-400 w-8 text-5xl sm:hidden"
            />
          )}
          {isMenueOpen && (
            <FontAwesomeIcon
              onClick={(e) => toggleHam()}
              icon={faClose}
              className="text-gray-400 w-8 text-5xl sm:hidden"
            />
          )}
        </div>
      </header>

      {isMenueOpen && (
        <div className="fixed w-full bg-gray-800 top-0 left-0 z-0 px-5 pt-20 pb-5 flex flex-col text-xl gap-2 shadow-xl">
          <Link href={"/"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400   p-2 rounded-lg sm:hidden ${pathname=="/" ? 'bg-gray-900' : ""}`}
            >
              Home
            </div>
          </Link>
          <Link href={"/products"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden ${pathname=="/products" ? 'bg-gray-900' : ""}`}
            >
              Products
            </div>
          </Link>
          <Link href={"/account"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden ${pathname=="/account" ? 'bg-gray-900' : ""}`}
            >
              Account
            </div>
          </Link>
          <Link href={"/about"}>
            <div
              onClick={(e) => toggleHam()}
              className={`text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden ${pathname=="/about" ? 'bg-gray-900' : ""}`}
            >
              About
            </div>
          </Link>
        </div>
      )}

      {isCartOpen && <div className="fixed w-full bg-gray-800 top-0 left-0 z-0 px-5 pt-20 pb-5 flex flex-col text-xl gap-2 shadow-xl">
          <h3 className="text-gray-400 text-center p-5">No items in the cart</h3>
          <hr/>
      </div>}
    </>
  );
}

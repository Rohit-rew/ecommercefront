import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isOpen, setOpen] = React.useState(false);

  function toggleHam() {
    setOpen((preval) => !preval);
  }

  return (
    <>
      <header className="w-full bg-gray-800 h-20 px-5 flex items-center justify-between sm:px-7 lg:px-10 z-20 fixed top-0 shadow-xl">
        <Link href={"/"}>
        <h1 className="text-gray-400 text-4xl">Pengo</h1>
        </Link>

        <div className="flex justify-center w-25 gap-5 h-full items-center">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-gray-400 w-8 text-5xl sm:hidden"
          />
          {!isOpen && (
            <FontAwesomeIcon
              onClick={(e) => toggleHam()}
              icon={faBars}
              className="text-gray-400 w-8 text-5xl sm:hidden"
            />
          )}
          {isOpen && (
            <FontAwesomeIcon
              onClick={(e) => toggleHam()}
              icon={faClose}
              className="text-gray-400 w-8 text-5xl sm:hidden"
            />
          )}
        </div>
      </header>

      {isOpen && (
        <div className="fixed w-full bg-gray-800 top-0 left-0 z-0 transition duration-200 px-5 pt-20 pb-5 flex flex-col text-xl gap-2 shadow-xl">
          <Link href={"/"}>
            <div
              onClick={(e) => toggleHam()}
              className="text-gray-400  bg-gray-900 p-2 rounded-lg sm:hidden"
            >
              Home
            </div>
          </Link>

          <Link href={"/products"}>
            <div
              onClick={(e) => toggleHam()}
              className="text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden"
            >
              Products
            </div>
          </Link>

          <Link href={"/account"}>
            <div
              onClick={(e) => toggleHam()}
              className="text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden"
            >
              Account
            </div>
          </Link>

          <Link href={"/about"}>
            <div
              onClick={(e) => toggleHam()}
              className="text-gray-400  p-2 rounded-lg hover:bg-gray-700 sm:hidden"
            >
              About
            </div>
          </Link>
        </div>
      )}
    </>
  );
}


import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-gray-300 body-font bg-gray-800 ">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first justify-center ">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-300 tracking-widest text-sm mb-3">
              POLICIES
            </h2>
            <nav className="list-none mb-10">
              <Link href={"/returnPolicy"}>
                <li className="text-gray-500 hover:text-white">
                  Return Policy
                </li>
              </Link>

              <Link href={"/shipping"}>
                <li className="text-gray-500 hover:text-white">
                  Shipping policy
                </li>
              </Link>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-300 tracking-widest text-sm mb-3">
              SUBSCRIBE
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
             
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base outline-none text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Submit
              </button>
            </div>
            
          </div>
        </div>
      </div>

    <div className="flex flex-col items-center">
      <hr className="bg-gray=400 w-full max-w-xl"/>
            <p className="text-gray-500 flex justify-center items-center p-5 text-sm mt-2 md:text-left text-center">
              made by rohit.codes
            </p>
    </div>
    </footer>
  );
}

import React from 'react'
import Router from 'next/router'

export default function Hero() {
  return (
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-3 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img className="  object-cover object-center rounded" alt="hero" src="/hero3.png" />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">T-shirts and accessories 
        <br className="hidden lg:inline-block"/> Specially designed for coaders
      </h1>
      <p className="mb-8 leading-relaxed">T shirts specially made for coders with an excellent fabric which will not only make you feel comfortable but also confident.</p>
      <div className="flex justify-center">
        <button onClick={()=>Router.push("/products")} className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Shop Now</button>
        
      </div>
    </div>
  </div>
</section>
  )
}
 
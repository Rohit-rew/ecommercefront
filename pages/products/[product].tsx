import React from 'react'
// import Router from 'next/router'

export default function Product(props : any) {

  const product = props.data.attributes

  return (
    <div className='pt-20 p-5 flex flex-col gap-5'>

      <h1 className='text-5xl text-center p-3'>{product.Title}</h1>
      <img className='shadow-md rounded-md bg-gray-600' src={`http://192.168.1.7:1337${product.image.data.attributes.url}`} />

      <button className='bg-gray-800 p-2 rounded-md text-white '>Add to Cart</button>

      {product.stock > 0 ? <button className='bg-gray-800 p-2 rounded-md text-white '>Buy now</button> :
      <button className='bg-gray-600 p-2 rounded-md text-white '>Out of Stock</button>}

      <div className=' p-2 rounded-md shadow-md flex flex-col gap-5'>

        <h2 className='text-4xl'>Description : </h2>
        <h3 className='text-xl text-justify'>{product.description} But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself.</h3>

      </div>
    </div>
  )
}


export async function getServerSideProps(context : any){
  const { product } = context.query;

const data = await fetch (`http://localhost:1337/api/tshirts/${product}/?populate=*`)
const tshirt = await data.json()

  console.log(product)
  return {
    props : tshirt
  }
  
}


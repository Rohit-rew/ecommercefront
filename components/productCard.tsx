import React from 'react'

export default function ProductCard({tshirt} : any) {
  console.log(tshirt)
  return (
    <div className='productCard shadow-md rounded-md bg-gray-600'>


      <img src={`http://192.168.1.7:1337${tshirt.attributes.image.data.attributes.url}`}/>
      

      <div className='flex bg-gray-800 p-5 justify-between items-center rounded'>
        <div>
        <h2 className='text-white'>{tshirt.attributes.Title}</h2>
        <h2 className='text-white'>Price : {tshirt.attributes.price}</h2>
        </div>
        <button className='text-white bg-green-400 p-2 rounded'>Add to cart</button>
      </div>
    </div>
  )
}

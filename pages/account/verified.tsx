import React from 'react'
import Router from 'next/router'

export default function verified() {
  return (
    <div className='h-screen pt-20 flex justify-center items-center p-5 bg-gray-200'>

        <div className='w-full p-5 max-w-xl bg-white shadow rounded flex flex-col gap-5'>
            <h2>You have successfully verified your email </h2>
            <button onClick={()=>Router.push("/account/login")} className='bg-red-500 w-full rounded py-2 text-white'>Login</button>
        </div>
      
    </div>
  )
}

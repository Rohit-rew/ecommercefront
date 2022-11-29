import React from 'react'

export default function CreateNewPass() {
  return (
    <div className='pt-20 w-full h-screen flex justify-center items-center p-5'>
        <form className='shadow w-full flex flex-col p-5 justify-between gap-10'>
            <div className='flex flex-col gap-5'>
                <label htmlFor='email'>Password</label>
                <input className='border p-1' type={"password"}/>
            </div>
            <div className='flex flex-col gap-5'>
                <label htmlFor='email'>Confirm password :</label>
                <input className='border p-1' type={"password"}/>
            </div>

            <button className='bg-gray-800 text-white p-2 rounded-md'>Change Password</button>

        </form>

    </div>
  )
}
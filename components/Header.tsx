
import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import {faClose} from "@fortawesome/free-solid-svg-icons"

export default function Header() {

  const [isOpen , setOpen] = React.useState(false)

  function toggleHam(e : React.MouseEvent<SVGSVGElement, MouseEvent>){
    setOpen(preval=>!preval)
  }

  return (
    <>
    <header className='w-full bg-gray-800 h-20 px-5 flex items-center justify-between sm:px-7 lg:px-10 z-20 fixed top-0'>
      <h1 className='text-gray-400 text-4xl'>Pengo</h1>

      {!isOpen &&<FontAwesomeIcon onClick={(e)=>toggleHam(e)}  icon={faBars} className="text-gray-400 text-4xl sm:hidden"/>}

      {isOpen && <FontAwesomeIcon onClick={(e)=>toggleHam(e)}  icon={faClose} className="text-gray-400 text-4xl sm:hidden"/>}


    </header>
      {isOpen && <div className='absolute w-full bg-gray-800 top-0 left-0 z-0 duration-200 px-5 pt-20 pb-5 flex flex-col text-xl gap-2'>

        <div className="text-gray-400 bg-gray-900 p-2 rounded-lg">Home</div>
        <div className="text-gray-400  p-2 rounded-lg hover:bg-gray-700">Product</div>
        <div className="text-gray-400  p-2 rounded-lg hover:bg-gray-700">About</div>
        <div className="text-gray-400  p-2 rounded-lg hover:bg-gray-700">Account</div>
        
        </div>}
    </>

  )
}

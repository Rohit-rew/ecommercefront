import React from "react";
import Router from "next/router";
import { useCookies } from "react-cookie";

export default function Account() {
  const [cookie, setcookie] = useCookies();

  function logout(){
    setcookie("ecommerce" , "" , {
      maxAge : 1,
      sameSite : true,
      path:"/"
    })
    setcookie("ecommerceusername" , "" , {
      maxAge : 1,
      sameSite : true,
      path:"/"
    })
    setcookie("ecommerceuseremail" , "" , {
      maxAge : 1,
      sameSite : true,
      path:"/"
    })
  }

  // if not logged in
  if (!cookie.ecommerce) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center flex-col gap-5">
        <div>
          <h1 className="text-2xl text-center">You are no logged in</h1>
          <h1 className="text-2xl text-center">Please log in to see details</h1>
        </div>
        <button
          onClick={() => Router.push("/account/login")}
          className="bg-gray-800 px-5 py-2 text-white rounded"
        >
          Log In
        </button>
        <button
          onClick={() => Router.push("/account/register")}
          className="bg-gray-800 px-5 py-2 text-white rounded"
        >
          Sign up
        </button>
      </div>
    );
  }else if(cookie.ecommerce){

  return (
    <div className="min-h-screen pt-20 flex  items-center flex-col gap-5 p-5">
      <div className="flex flex-col w-full shadow mt-10">
        <span>Username : {cookie.ecommerceusername}</span>
        <span>Email : {cookie.ecommerceuseremail}</span>
      </div>
      <button className="bg-gray-800 px-5 py-2 rounded text-white" onClick={()=>logout()}>Log out</button>
    </div>
  );
  }
}

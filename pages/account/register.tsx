import React from "react";
import axios from "axios";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faListCheck} from "@fortawesome/free-solid-svg-icons"

export default function Register() {

    const [error , setError] = React.useState(null)
    const [user , setUser] = React.useState(null)

    async function register(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmpass = e.target.confirmpass.value;
        console.log(name , email , password, confirmpass);
        
        if(name && email && password.length>=10 && (password == confirmpass)){
            try {
                const data = await axios.post("http://192.168.1.7:1337/api/auth/local/register" , {username : name , email , password})
                console.log(data)
                if(data.status ===200){
                    setUser({username : data.data.user.username,
                    email : data.data.user.email
                    })
                }
            } catch (error) {
                setError(error.response.data.error.message)
            }
        }else{
            // show errors to user
        }

    }

  return (
    <>
    {user && <Registered user={user}/>}
    <div className="h-screen pt-20 flex justify-center items-center p-5 flex-col gap-8">

        <h1 className="text-4xl">Sign up</h1>
        <hr className="w-full"/>
        <form onSubmit={(e)=>register(e)} className="w-full flex flex-col gap-10 text-xl p-3 shadow-md">


          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input id="name" className="border p-1" type={"text"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input id="email " className="border p-1" type={"email"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
            <input id="password" className="border p-1" type={"password"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input id="confirmpass" className="border p-1" type={"password"} />
          </div>

          <button type="submit"  className="bg-gray-800 text-white p-2 rounded-md">Register</button>
        </form>

      <div>
            {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
    </>

  );
}



export function Registered({user}) {

    const data = Router

  return (
    <div className="registered__modal flex p-5 fixed w-screen h-screen justify-center items-center">
        <div className="bg-white w-full h-96 p-5 flex flex-col justify-between rounded-md">
            <div className="flex flex items-center justify-left gap-10">
                <FontAwesomeIcon className="text-3xl" icon={faListCheck} />
                <h1 className="text-4xl text-center">Registered</h1>
            </div>

                <h3>User Name : <span className="text-red-400">{user.username}</span> </h3>
                <h3>Email: <span className="text-red-400">{user.email}</span></h3>
                <button onClick={()=>data.push("/account/login")}  className="bg-gray-800 rounded-md w-full text-white p-2">Login</button>
        </div>
    </div>
  )
}


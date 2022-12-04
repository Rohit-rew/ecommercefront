import React from "react";
import axios from "axios";
import Router from "next/router";

export default function Register() {

    const [error , setError] = React.useState(null)
    const [user , setUser] = React.useState(null)

    async function register(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const name = e.currentTarget.name1.value
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const confirmpass = e.currentTarget.confirmpass.value;
        console.log(name ,email , password, confirmpass);
        
        if(name && email && password.length>=10 && (password == confirmpass)){
            try {
                const data = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/local/register` , {username : name , email , password})
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
    <div className="h-screen pt-20 flex justify-center items-center p-5 flex-col gap-8 bg-gray-200">

        <h1 className="text-4xl">Sign up</h1>
        <hr className="w-full max-w-xl"/>
        <form onSubmit={(e)=>register(e)} className="w-full flex flex-col gap-10 text-xl p-5 shadow-md max-w-xl bg-white rounded">


          <div className="flex flex-col gap-2">
            <label htmlFor="name1">Name</label>
            <input id="name1" className="border p-1 rounded border-gray-400" type={"text"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" className="border p-1 rounded border-gray-400" type={"email"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input id="password" className="border p-1 rounded border-gray-400" type={"password"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmpass">Confirm Password</label>
            <input id="confirmpass" className="border p-1 rounded border-gray-400" type={"password"} />
          </div>

          <button type="submit"  className="bg-red-500 text-white p-2 rounded-md">Register</button>
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
    const [msg , setMsg] = React.useState(null)
    const [error , setError] = React.useState(null)

    async function resendVerification(){
      try {
        const data = await axios.post("http://192.168.1.7:1337/api/auth/send-email-confirmation" ,{
          email : user.email
        })
        console.log(data)
        if(data.status===200){
          setMsg("Link resent")
        }
      } catch (error) {
        setError(error.response.data.error.message)
      }
    }

  return (
    <div className="registered__modal flex p-5 fixed w-screen h-screen justify-center items-center">
        <div className="bg-white w-full p-5 flex flex-col justify-between rounded-md max-w-xl gap-5">

                <h2 className="text-gray-500 text-justify">An Email containing a verification link is sent to {user.email} Please click on the Link to verify the email address and press Login bellow to log in.</h2>
                <h2 className="text-gray-500 text-justify">If you have not received any email from us please check your spam folder or <span onClick={()=>resendVerification()} className="text-green-500 cursor-pointer">click here</span> to resend the verification email.</h2>

                {msg && <h3 className="text-green-500 text-center">{msg}</h3>}
                {error && <h3 className="text-red-500 text-center">{error}</h3>}
                <button onClick={()=>data.push("/account/login")}  className="bg-red-500 rounded-md w-full text-white p-2">Login</button>
        </div>
    </div>
  )
}


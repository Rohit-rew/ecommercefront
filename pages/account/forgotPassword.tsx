import React from "react";
import axios from "axios";

export default function ForgotPassword() {

  const [msg , setMsg] = React.useState(null)

  async function reset(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    const email = e.target.email.value
    console.log(email);
    
    if(email){
      try {
        const data = await axios.post("http://192.168.1.7:1337/api/auth/forgot-password" , {email})
        if(data.status===200){
          setMsg(`Reset link sent to ${email} please check inbox`)
        }
      } catch (error) {
        console.log(error)
        // show error message to user
      }
    }
  }


  return (
    <div className="pt-20 w-full h-screen flex justify-center items-center p-5 flex-col gap-5 bg-gray-100">
      <div className="text-gray-400">
        <h3>Enter you email associated with your account</h3>
        <h3>We will send you an reset link on your email</h3>
      </div>
      <form onSubmit={(e)=>reset(e)} className="shadow w-full flex flex-col p-5 justify-between gap-10 max-w-xl bg-white rounded">
        <div className="flex flex-col gap-5">
          <label htmlFor="email">Email :</label>
          <input id="email" className="border p-1 rounded" type={"email"} />
        </div>

        {msg && <h2 className="text-green-400 text-center ">{msg}</h2>}
        <button type="submit" className="bg-red-500 text-white p-2 rounded-md">Reset</button>
      </form>
    </div>
  );
}

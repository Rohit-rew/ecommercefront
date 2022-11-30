import React from "react";

export default function ForgotPassword() {
  return (
    <div className="pt-20 w-full h-screen flex justify-center items-center p-5 flex-col gap-5">
      <div className="text-gray-400">
        <h3>Enter you email associated with your account</h3>
        <h3>We will send you an reset link on your email</h3>
      </div>
      <form className="shadow w-full flex flex-col p-5 justify-between gap-10">
        <div className="flex flex-col gap-5">
          <label htmlFor="email">Email :</label>
          <input className="border p-1" type={"email"} />
        </div>

        <button className="bg-gray-800 text-white p-2 rounded-md">Reset</button>
      </form>
    </div>
  );
}

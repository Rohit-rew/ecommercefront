import React, { FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateNewPass() {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const { query } = useRouter();
  const code = query.code;

  async function changePass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const password = e.currentTarget.password.value
    const confirmpass = e.currentTarget.confirmpass.value;

    if (password === confirmpass) {
      try {
        const data = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/reset-password`,
          {
            code: code,
            password: password,
            passwordConfirmation: confirmpass,
          }
        );
        if (data.status === 200) {
          setSuccess("Password changed successfully");
        }
      } catch (error) {
        setError(error.response.data.error.message.replace("code" , "link"))
      }
    } else {
      setError("Passwords do not match");
    }
  }

  return (
    <div className="pt-20 w-full h-screen flex justify-center items-center p-5 bg-gray-200">
      <form
        onSubmit={(e) => changePass(e)}
        className="shadow w-full flex flex-col p-5 justify-between gap-10 max-w-xl bg-white rounded"
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="password">Password</label>
          <input
            onChange={() => setError(null)}
            id="password"
            className="border p-1 rounded"
            type={"password"}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label htmlFor="confirmpass">Confirm password :</label>
          <input
            onChange={() => setError(null)}
            id="confirmpass"
            className="border p-1 rounded"
            type={"password"}
          />
        </div>
        {error && <h2 className="text-red-400 text-center">{error}</h2>}
        {success && <h2 className="text-green-400 text-center">{success}</h2>}
        <button type="submit" className="bg-red-500 text-white p-2 rounded-md">
          Change Password
        </button>
      </form>
    </div>
  );
}

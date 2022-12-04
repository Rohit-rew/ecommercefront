import React from "react";
import axios from "axios";
import Router from "next/router";
import { useCookies } from "react-cookie";
import Link from "next/link";

export default function Login() {
  const [error, seterror] = React.useState(null);
  const [cookie, setcookie] = useCookies(["ecommerce"]);

  async function loginUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (email && password) {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/local`,
          {
            identifier: email,
            password,
          }
        );

        const token = data.jwt;
        const user = data.user;
        console.log(token, user);
        if (token && user) {
          // token is set in the cookies user needs to be set in contextAPI
          setcookie("ecommerce", token, {
            path: "/",
            sameSite: true,
            maxAge: 3600,
          });
          Router.replace("/account");
        }
      } catch (error : any) {
        seterror(() => {
          const message = error.response.data.error.message.replace(
            "identifier",
            "email"
          );
          return message;
        });
      }
    }
  }

  function logout() {
    setcookie("ecommerce", "", {
      maxAge: 1,
      sameSite: true,
      path: "/",
    });
  }

  // if not logged in render the bellow
  if (!cookie.ecommerce) {
    return (
      <>
        <div className="pt-20 w-full h-screen flex justify-center items-center p-5 flex-col gap-5 bg-gray-200">
          <form
            onSubmit={(e) => loginUser(e)}
            className="shadow w-full flex flex-col p-5 justify-between gap-10 max-w-xl rounded bg-white"
          >
            {error && <p className="text-red-400">{error}</p>}
            <div className="flex flex-col gap-5">
              <label htmlFor="email">Email :</label>
              <input id="email" className="border p-1 rounded" type={"text"} />
            </div>
            <div className="flex flex-col gap-5">
              <label htmlFor="password">Password :</label>
              <input id="password" className="border p-1 rounded" type={"password"} />
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Log In
            </button>
          </form>

          <Link href={"/account/forgotPassword"}>
            <p className="text-red-400">Forgot password ?</p>
          </Link>
        </div>
      </>
    );
  } else if (cookie.ecommerce) {
    return (
      <div className="pt-20 w-full h-screen flex justify-center items-center p-5">
        <button
          className="bg-gray-800 px-5 py-2 rounded text-white"
          onClick={() => logout()}
        >
          Log out
        </button>
      </div>
    );
  }
}

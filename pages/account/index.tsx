import React from "react";
import Router from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

type user = {
  name: string;
  email: string;
};

export default function Account() {
  const [cookie, setcookie] = useCookies();
  const [user, setUser] = React.useState({});

  function logout() {
    setcookie("ecommerce", "", {
      maxAge: 1,
      sameSite: true,
      path: "/",
    });
  }

  React.useEffect(() => {
    if (cookie.ecommerce) {
      fetch();
    }

    async function fetch() {
      try {
        const user = await axios.get("http://192.168.1.7:1337/api/users/me", {
          headers: { Authorization: `Bearer ${cookie.ecommerce}` },
        });
        console.log(user.status);
        console.log(user);
        if (user.status === 200) {
          setUser({ email: user.data.email, username: user.data.username });
        } else {
          logout();
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  }, [0]);

  // if not logged in
  if (!cookie.ecommerce) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center flex-col gap-5 ">
        <div className="max-w-xl">
          <h1 className="text-2xl text-center ">You are no logged in</h1>
          <h1 className="text-2xl text-center">Please log in to see details</h1>
        </div>
        <button
          onClick={() => Router.push("/account/login")}
          className="bg-red-500 px-5 py-2 text-white rounded"
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
  } 
  
  else if (cookie.ecommerce) {
    return (
      <div className="min-h-screen pt-20 flex  items-center flex-col gap-5 p-5 justify-center items-center bg-gray-200">
        <div className="flex flex-col w-full shadow mt-10 max-w-xl bg-white rounded p-5 gap-5">
          <table className="border text-left rounded">
            <tbody>

            <tr className="border ">
              <th className="border p-1">User Name</th>
              <th className="border font-light p-1">{user.username}</th>
            </tr>

            <tr className="border">
              <th className="border p-1">Email</th>
              <th className="border font-light p-1">{user.email}</th>
            </tr>
            </tbody>
          </table>

          <button onClick={()=>Router.push("/account/myorders")} className="bg-green-500 px-5 py-2 rounded text-white">My orders</button>
          <button
            className="bg-red-500 px-5 py-2 rounded text-white"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      </div>
    );
  }
}

import React from "react";
import Router from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

type user = {
  username: string;
  email: string;
  addresses: {Name : string , city : string , Phonenumber : string , zip : number , Address : string, id : number}[];
  id: number;
};

export default function Account() {
  const [cookie, setcookie] = useCookies();
  const [user, setUser] = React.useState<user | undefined>(undefined);
  const [addressEdit, setAddressEdit] = React.useState(false);
  const [addressAdd, setAddAddress] = React.useState(false);

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
      console.log("fetch inside /accounts runssss")
      try {
        const user = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/me/?populate=*`,
          {
            headers: { Authorization: `Bearer ${cookie.ecommerce}` },
          }
        );
        if (user.status === 200) {
          setUser({
            email: user.data.email,
            username: user.data.username,
            addresses: user.data.addresses,
            id: user.data.id,
          });
        } else {
          logout();
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  }, [addressEdit, addressAdd]);


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
  } else if (cookie.ecommerce) {
    return (
      <>
        {addressEdit && (
          <EditAddress
            address={user.addresses[0]}
            setAddressEdit={setAddressEdit}
          />
        )}


        {addressAdd && <AddAddress setAddAddress={setAddAddress} user={user} />}
        <div className="min-h-screen pt-20 flex flex-col gap-5 p-5 justify-center items-center bg-gray-200">
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

            {Boolean(user.addresses) && !Boolean(user.addresses.length) && (
              <div className="flex">
                <button
                  onClick={() => setAddAddress(true)}
                  className="bg-red-500 w-full rounded p-2 text-white"
                >
                  Add address
                </button>
              </div>
            )}

            {Boolean(user.addresses) && Boolean(user.addresses.length) && (
              <div className="w-full flex flex-col gap-5">
                <h1 className="text-center text-red-500">Addresses</h1>
                {user?.addresses?.map((address, i) => {
                  return (
                    <table key={i} className="border text-left rounded">
                      <tbody>
                        <tr className="border ">
                          <th className="border p-1">Name</th>
                          <th className="border font-light p-1">
                            {address.Name}
                          </th>
                        </tr>
                        <tr className="border ">
                          <th className="border p-1">Address</th>
                          <th className="border font-light p-1">
                            {address.Address}
                          </th>
                        </tr>

                        <tr className="border">
                          <th className="border p-1">City</th>
                          <th className="border font-light p-1">
                            {address.city}
                          </th>
                        </tr>
                        <tr className="border">
                          <th className="border p-1">Phone</th>
                          <th className="border font-light p-1">
                            {address.Phonenumber}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}

                <button
                  onClick={() => setAddressEdit(true)}
                  className="bg-green-500 px-5 py-2 rounded text-white"
                >
                  Change Address
                </button>
              </div>
            )}

            <button
              onClick={() => Router.push("/account/myorders")}
              className="bg-green-500 px-5 py-2 rounded text-white"
            >
              My orders
            </button>
            <button
              className="bg-red-500 px-5 py-2 rounded text-white"
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        </div>
      </>
    );
  }
}

type props = {
  address: {
    Name: string;
    city: string;
    Address: string;
    Phonenumber: string;
    id: number;
  };
  setAddressEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

// edits existing address
function EditAddress({ address, setAddressEdit }: props) {
  const [cookie, setcookie] = useCookies();
  async function changeAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newName = e.currentTarget.name1.value;
    const newAddress = e.currentTarget.address.value;
    const newCity = e.currentTarget.city.value;
    const newPhone = e.currentTarget.phone.value;
    if (newName && newAddress && newCity && newPhone) {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/addresses/${address.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${cookie.ecommerce}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                Name: newName,
                Address: newAddress,
                city: newCity,
                Phonenumber: newPhone,
              },
            }),
          }
        );
        const res = await data.json();
        setAddressEdit(false);
        // show success mmessage to user
      } catch (error) {
        // show error to user
        console.log(error);
      }
    }
  }

  return (
    <div className="modal absolute h-screen w-screen p-5 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded p-5">
        <form
          onSubmit={(e) => changeAddress(e)}
          className="flex flex-col gap-5"
        >
          <h1 className="text-center text-3xl">Edit Adress</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="name1">Name</label>
            <input
              className="border rounded"
              id="name1"
              type={"text"}
              defaultValue={address.Name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              className="border rounded"
              id="address"
              type={"text"}
              defaultValue={address.Address}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="city">City</label>
            <input
              className="border rounded"
              id="city"
              type={"text"}
              defaultValue={address.city}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input
              className="border rounded"
              id="phone"
              type={"text"}
              defaultValue={address.Phonenumber}
            />
          </div>

          <button type="submit" className="bg-red-500 rounded text-white p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// adds new address
function AddAddress({ setAddAddress, user }) {
  const [cookie, setcookie] = useCookies();
  async function addAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = e.currentTarget.name1.value;
    const address1 = e.currentTarget.address.value;
    const city = e.currentTarget.city.value;
    const zip = e.currentTarget.zip.value;
    const phone = e.currentTarget.phone.value;

    if (name && address1 && city && phone) {
      try {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_URL}/api/addresses`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${cookie.ecommerce}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                Name: name,
                Address: address1,
                city: city,
                zip: zip,
                Phonenumber: phone,
              },
            }),
          }
        );
        const res = await data.json();
        if (res.data.id) {
          console.log(res.data.id);
          try {
            const data = await fetch(
              `${process.env.NEXT_PUBLIC_BACK_URL}/api/users/${user.id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${cookie.ecommerce}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  addresses: res.data.id,
                }),
              }
            );
            const res_user = await data.json();
            console.log(res_user);
          } catch (error) {
            console.log(error);
          }
        }
        setAddAddress(false);
      } catch (error) {
        // display error to user
        console.log(error);
      }
    }
  }

  return (
    <div className="modal absolute h-screen w-screen p-5 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded p-5">
        <form onSubmit={(e) => addAddress(e)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name1">Name</label>
            <input className="border rounded" id="name1" type={"text"} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input className="border rounded" id="address" type={"text"} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="city">City</label>
            <input className="border rounded" id="city" type={"text"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="zip">Zip</label>
            <input className="border rounded" id="zip" type={"number"} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone</label>
            <input className="border rounded" id="phone" type={"text"} />
          </div>

          <button type="submit" className="bg-red-500 rounded text-white p-2">
            Add{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

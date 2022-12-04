import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

export default function Checkout() {
  const [addressId, setAddressId] = React.useState(null);


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
        const addressId = res.data.id;
        setAddressId(addressId);
      } catch (error) {
        // show errors to user
        console.log(error);
      }
    }
  }

  return (
    // if the user is not logged in
    <>
      {!addressId && (
        <div className="pt-20 min-h-screen bg-gray-200 flex justify-center items-center">
          <form
            onSubmit={(e) => addAddress(e)}
            className="flex flex-col gap-5 bg-white p-5 max-w-md w-full rounded shadow"
          >
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
              Proceed to payment
            </button>
          </form>
        </div>
      )}
    </>
  );
}

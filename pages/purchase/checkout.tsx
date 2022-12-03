import React from "react";
import { CardElement } from "@stripe/react-stripe-js";


export default function Checkout() {
  const [addressId, setAddressId] = React.useState(null);
  async function addAddress(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const address1 = e.target.address.value;
    const city = e.target.city.value;
    const zip = e.target.zip.value;
    const phone = e.target.phone.value;

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
              <label htmlFor="name">Name</label>
              <input className="border rounded" id="name" type={"text"} />
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




      {addressId && (
        <div className="pt-20 min-h-screen bg-gray-200 flex justify-center items-center">
          <div>
            <div>
              <label htmlFor="card-element">Credit or debit card</label>

              <div>
                <fieldset style={{ border: "none" }}>
                  <div className="form-row">
                    <div id="card-element" style={{ width: "100%" }}>
                      <CardElement
                        options={{
                          style: { width: "100%", base: { fontSize: "18px" } },
                        }}
                      />
                    </div>
                    <br />
                    <div className="order-button-wrapper">
                      <button>Confirm order</button>
                    </div>
                    {true ? <div>error</div> : null}
                    <div id="card-errors" role="alert" />
                  </div>
                </fieldset>
              </div>
            </div>
            <style jsx>
              {`
                .order-button-wrapper {
                  display: flex;
                  width: 100%;
                  align-items: flex-end;
                  justify-content: flex-end;
                }
              `}
            </style>
          </div>
        </div>
      )}
    </>
  );
}

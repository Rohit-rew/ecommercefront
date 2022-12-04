import React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Myorders() {
  const [cookie, setcookie] = useCookies();
  const [orders, setOrders] = React.useState([]);

  console.log(orders);
  React.useEffect(() => {
    getorders();
    async function getorders() {
      try {
        const data = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${cookie.ecommerce}`,
          },
        });
        if (data.status === 200) {
          setOrders(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [cookie]);

  // if the user is loged in
  return (
    <div className="min-h-screen pt-20 flex flex-col gap-5 p-5 justify-center items-center bg-gray-200">
      <div className="flex flex-col w-full shadow mt-10 max-w-xl bg-white rounded p-5 gap-5">
        <h1 className="text-3xl text-center">My orders</h1>
        <hr />

        {/* if there are no orders */}
        {!Boolean(orders.length) && <h2 className='text-center text-gray-400'>No Order History available</h2>}

        {/* if there are orders available */}

        {orders &&
          orders?.map((order, i: number) => {
            return (
              <div
                key={i}
                className="product-container w-full bg-white border flex flex-col rounded p-2 justify-between "
              >
                <div className="flex items-center">
                  <span className="font-bold mr-10">Address : </span>{" "}
                  <span className="text-xs">{order.address}</span>
                </div>

                <div>
                  <span className="font-bold mr-10">Date :</span> <span>{(order.createdAt)}</span>
                </div>
                <div>
                  <span className="font-bold mr-10">Items :</span> <span>{(order.tshirts.length)}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { useUserStore } from "../store/useUserstore";

const MyAccountPage = () => {
  const { user } = useUserStore();
  console.log("user details : ", user); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/orders/my-orders");
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10 text-black">
          My Account
        </h1>

        {/* 👇 YAHAN PROFILE DETAILS */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 text-black">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>

        {/* 👇 YAHAN ORDER HISTORY SECTION */}
        <h2 className="text-2xl font-semibold mb-6 text-black">
          My Orders
        </h2>

        {/* 👉 YEH WALA CODE YAHI LIKHNA HAI 👇 */}

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border p-6 rounded-xl mb-6 shadow-sm"
            >
              <p className="font-semibold mb-2">
                Order ID: {order._id}
              </p>

              <p className="mb-4">
                Total: ₹{order.totalAmount}
              </p>

              <p className="text-gray-500 mb-4">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <div className="grid md:grid-cols-3 gap-4">
               {order.products.map((item, index) => {
  if (!item.product) return null;

  return (
    <div
      key={item.product._id || index}
      className="border rounded-lg p-3"
    >
      <img
        src={item.product.image}
        alt={item.product.name}
        className="h-24 w-full object-cover rounded-md mb-2"
      />
      <p className="font-medium">{item.product.name}</p>
      <p>Qty: {item.quantity}</p>
      <p>₹{item.price}</p>
    </div>
  );
})}
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyAccountPage;
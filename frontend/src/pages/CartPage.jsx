import React from "react";
import OrderSummary from "../components/OrderSummary";
import { useCartStore } from "../store/useCartStore";
import { motion } from "framer-motion";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import EmptyCartUI from "../components/EmptyCartUI";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-7xl">

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-12">
          Your Shopping Cart
        </h1>

        <div className="lg:flex lg:items-start lg:gap-12">

          {/* LEFT SIDE */}
          <motion.div
            className="w-full lg:w-2/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-10">
                <EmptyCartUI />
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow border border-gray-100 p-6"
                  >
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="mt-14 bg-white rounded-2xl shadow border border-gray-100 p-8">
                <h2 className="text-2xl font-semibold text-black mb-8">
                  You May Also Like
                </h2>
                <PeopleAlsoBought />
              </div>
            )}
          </motion.div>

          {/* RIGHT SIDE */}
          {cart.length > 0 && (
            <motion.div
              className="w-full lg:w-1/3 mt-12 lg:mt-0 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
                <OrderSummary />
              </div>

              <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
                <GiftCouponCard />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartPage;
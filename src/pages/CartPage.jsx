import { useCart } from "../context/CartContext";
import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartitems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  console.log("Cart Items:", cartitems);

  return (
    <div className="pt-40 min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center flex items-center justify-center gap-3 text-gray-800">
        <span className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent pb-10 ">
          Your Cart
        </span>
      </h1>
      {cartitems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Your cart is empty.
          <div className="mt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition duration-300 no-underline font-medium"
            >
              ← Add More Products
            </Link>
          </div>
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {cartitems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                {item.product_image && (
                  <img
                    className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-200 hover:scale-105 hover:shadow-xl transition duration-300"
                    src={`${BASEURL}${item.product_image}`}
                    alt={item.product_name}
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 tracking-wide">
                  {item.product_name}
                </h2>

                <p className="text-lg font-semibold text-green-600 mt-1">
                  ₹ {item.product_price}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Premium Quality Product
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-300 w-8 h-8 font-medium rounded hover:bg-gray-500 hover:text-white transition"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 w-8 h-8 font-medium rounded hover:bg-gray-500 hover:text-white transition"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="text-red-500 font-medium border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-white transition duration-300 "
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="border-t border-gray-200 pt-5 mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Total </h2>

            <p className="text-2xl font-extrabold text-green-600">
              ₹ {Number(total || 0).toFixed(2)}
            </p>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link
              to="/"
             className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition duration-300 no-underline font-medium w-full sm:w-auto"
            >
              ← Add More Products
            </Link>
            
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 hover:shadow-xl hover:scale-105 transition duration-300 no-underline font-medium w-full sm:w-auto"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

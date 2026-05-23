import { useCart } from "../context/CartContext";
import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartitems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  console.log("Cart Items:", cartitems);

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {cartitems.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-700">
              Your Cart is Empty
            </h2>

            <Link
              to="/"
              className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cartitems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 border-b pb-4"
              >
                {/* Product Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
                  {item.product_image && (
                    <img
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-md border border-gray-200 hover:scale-105 hover:shadow-xl transition duration-300"
                      src={`/products/${item.product_image.split("/").pop()}`}
                      alt={item.product_name}
                    />
                  )}

                  <div className="flex flex-col text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-wide">
                      {item.product_name}
                    </h2>

                    <p className="text-base sm:text-lg font-semibold text-green-600 mt-1">
                      ₹ {item.product_price}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Premium Quality Product
                    </p>
                  </div>
                </div>

                {/* Quantity + Remove */}
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-3">
                  <button
                    className="bg-gray-300 w-8 h-8 font-medium rounded hover:bg-gray-500 hover:text-white transition"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    className="bg-gray-300 w-8 h-8 font-medium rounded hover:bg-gray-500 hover:text-white transition"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button
                    className="text-red-500 font-medium border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition duration-300"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total Section */}
            <div className="border-t border-gray-200 pt-5 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Total
              </h2>

              <p className="text-2xl font-extrabold text-green-600">
                ₹ {Number(total || 0).toFixed(2)}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition duration-300 no-underline font-medium w-full sm:w-auto"
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
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;

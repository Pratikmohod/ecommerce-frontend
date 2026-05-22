import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { authFetch } from "../utils/auth";
import { getAccessToken } from "../utils/auth";

const CheckoutPage = () => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await authFetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Order Placed Successfully");
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Order Failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 sm:pt-32 md:pt-45 min-h-screen bg-gray-100 p-8 sm:p-4 md:p-6">
      <div className="max-w-lg mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-xl sm:rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-5 sm:mb-6 text-gray-800">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6 md:space-y-7"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 m-1 sm:m-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 m-1 sm:m-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 m-1 sm:m-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 m-1 sm:m-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="CreditCard">Online Payment</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-green-700 transition duration-300"
          >
            {loading ? "Processing" : "Place Order"}
          </button>

          {message && (
            <p className="text-center font-medium text-green-600 mt-4 text-sm sm:text-base">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

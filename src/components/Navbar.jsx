import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";
const Navbar = () => {
  const { cartitems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartitems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = !!getAccessToken();
  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };
  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)] px-4 sm:px-6 md:px-8 py-3 sm:py-3 flex md:flex-row justify-between items-center fixed w-full top-0 z-50">
      <Link
        to="/"
        className="flex items-center gap-3 text-3xl font-extrabold tracking-wide"
      >
        <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-700 text-white px-3 sm:px-8 md:px-12 py-3 rounded-5 shadow-lg text-lg sm:text-xl md:text-2xl font-black tracking-wider hover:scale-105 transition duration-300">
          ShopEasy
        </span>
      </Link>

      <Link
        to="/cart"
        className="relative flex items-center gap-3 text-white hover:text-purple-700 transition duration-300 font-semibold text-base sm:text-lg no-underline bg-white/10 px-4 sm:px-2 py-2 rounded-2xl border border-white/10 shadow-md hover:bg-white/20"
      >
        <i className="fa-solid fa-cart-shopping text-xl sm:text-2xl text-purple-700"></i>

        <span className="tracking-wide text-purple-700 text-lg sm:text-2xl">Cart</span>

        {cartCount > 0 && (
          <span className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-extrabold min-w-[28px] h-[28px] flex items-center justify-center rounded-full shadow-lg border-2 border-[#df1f09]">
            {cartCount}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-fuchsia-600 hover:to-purple-800 text-white px-4 sm:px-5 py-2 rounded-xl shadow-lg font-semibold tracking-wide no-underline hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-fuchsia-600 hover:to-purple-800 text-white px-4 sm:px-5 py-2 rounded-xl shadow-lg font-semibold tracking-wide no-underline hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Sign up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 sm:px-5 py-2 shadow-lg font-semibold tracking-wide hover:scale-105 transition-all duration-300 rounded-2xl text-sm sm:text-base"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


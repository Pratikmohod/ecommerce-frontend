import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";
const Navbar = () => {
  const { cartitems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false)

  const cartCount = cartitems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = !!getAccessToken();
  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };
  return (

    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg px-4 sm:px-6 md:px-8 py-3 fixed w-full top-0 z-50">
      
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <span className="bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg text-lg sm:text-2xl font-black">
            ShopEasy
          </span>
        </Link>

        {/* HAMBURGER for(MOBILE) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <i className="fa-solid fa-xmark" style={{color: "rgb(0, 0, 0)"}}></i>) : (<i className="fa-solid fa-bars" style={{color: "rgb(0, 0, 0)"}}></i>)}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-white bg-fuchsia-700 px-4 py-2 rounded-xl hover:bg-black transition duration-300 font-bold"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link  to="/login" className=" bg-orange-600 text-white font-bold py-2 px-3 rounded-3 hover:bg-black hover:text-white">
                Login
              </Link>
              <Link  to="/signup" className="bg-orange-600 text-white font-bold py-2 px-3 rounded-3 hover:bg-black hover:text-white">
                Sign up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-white bg-pink-600 py-2 px-3 rounded-3 hover:bg-gray-950 transition duration-300 font-bold ">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white/10 p-4 rounded-xl">
          <hr />
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-black font-bold text-2xl">
            <i className="fa-solid fa-cart-arrow-down" style={{color: "rgb(247, 0, 255)"}}></i> Cart (<span className="text-indigo-600">{cartCount}</span>)
          </Link>
          <hr />
         

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-black font-bold text-2xl">
                Login
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-black font-bold text-2xl">
                Sign up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-black font-bold text-2xl"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

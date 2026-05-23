import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const { addToCart } = useCart();

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 cursor-pointer border border-gray-100 overflow-hidden group">
        <div className="overflow-hidden rounded-xl">
          <img
            src={`/products/${product.image.split("/").pop()}`}
            alt={product.name}
            className="w-full h-72 object-cover rounded-xl group-hover:scale-105 transition duration-500"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 truncate">
            {product.name}
          </h2>

          <p className="text-2xl font-extrabold text-green-600 mt-2">
            ₹ {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

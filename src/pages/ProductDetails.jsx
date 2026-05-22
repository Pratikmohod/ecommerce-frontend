import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
const ProductDetails = () => {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  if (!product) {
    return <div>No Product Found</div>;
  }

  const handleAddToCart = () => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/login";
      return;
    }
    addToCart(product.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 flex justify-center items-center pt-24 sm:pt-28 md:pt-35 px-3 sm:px-4 md:px-6">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-5xl w-full border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center">
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl">
            <img
              src={`${product.image}`}
              alt={product.name}
              className="w-full h-[260px] sm:h-[340px] md:h-[420px] object-cover rounded-2xl hover:scale-105 transition duration-500"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 sm:mb-4 tracking-wide">
              {product.name}
            </h1>

            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
              {product.description}
            </p>

            <p className="text-2xl sm:text-3xl font-black text-green-600 mb-6 sm:mb-8">
              ₹ {product.price}
            </p>

            <button
              onClick={() => addToCart(product.id)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 sm:px-7 py-3 rounded shadow-lg hover:shadow-2xl hover:scale-105 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold tracking-wide"
            >
              Add to Cart
            </button>

            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 sm:px-5 py-2 rounded-xl shadow-sm hover:bg-gray-300 hover:shadow-md transition-all duration-300 no-underline font-medium text-sm sm:text-base"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

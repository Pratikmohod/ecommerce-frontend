import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // for searching

  const [search, setSearch] = useState("");

  // category filter

  const [selectedCategory, setSelectedCategory] = useState("");

  // for minPrice

  const [minPrice, setMinPrice] = useState("");

  // for Max price

  const [maxPrice, setMaxPrice] = useState("");

  // Fetch Categories

  useEffect(() => {
    fetch(`${BASEURL}/api/categories/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch categories");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // FETCH PRODUCTS
  useEffect(() => {
    let url = `${BASEURL}/api/products/?`;

    //SEARCH
    if (search) {
      url += `search=${search}&`;
    }

    //caregory

    if (selectedCategory) {
      url += `category=${selectedCategory}&`;
    }

    // min PRICE
    if (minPrice) {
      url += `min_price=${minPrice}&`;
    }

    // max price

    if (maxPrice) {
      url += `max_price=${maxPrice}&`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [search, selectedCategory, minPrice, maxPrice]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100">
      <h1 className="text-4xl font-extrabold mb-8 pt-28 sm:pt-32 text-center flex items-center justify-center gap-3 text-gray-800">
        <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          All Products
        </span>
      </h1>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center p-4 sm:p-6">
        <div className="relative w-full sm:w-72 md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>

        {/* CATEGORY */}

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">ALL Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* MIN PRICE */}

        <input
          type="number"
          placeholder="Minimum Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2"
        />

        {/* Max Price */}

        <input
          type="number"
          placeholder="Maximum Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">NO product available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;

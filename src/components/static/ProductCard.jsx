import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const isAlreadyInCart = cartData.find((data) => data._id === product._id);

  const addToCartHandler = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("updateCart"));
  };

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(cart);
    };
    updateCartCount();
    window.addEventListener("updateCart", updateCartCount);
    return () => {
      window.removeEventListener("updateCart", updateCartCount);
    };
  }, []);

  return (
    <div onClick={() => navigate("/product-detail", { state: { product } })}>
      <div
        key={product.id}
        className="group relative shadow-lg hover:shadow-2xl border rounded-lg border-gray-200 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
          <img
            src={product?.image}
            alt={product.name}
            className="h-60 w-full object-cover object-center group-hover:opacity-80 transition-opacity duration-200 ease-in-out"
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-teal-500 to-teal-300 text-white text-xs px-2 py-1 rounded-full shadow-md">
              NEW
            </div>
          )}
          <div className="absolute top-1 left-1 bg-pink-500 text-xs text-white py-1 px-2 rounded-full shadow-lg">
            For {product?.category}
          </div>
          <div className="bg-pink-600 absolute top-1 right-1 px-1 py-1 rounded-full text-white font-bold shadow-lg">
            <CiHeart size={20} />
          </div>
        </div>
        <div className="mt-4 flex justify-between px-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">
              {product.description.split(" ").slice(0, 10).join(" ")}
              {product.description.split(" ").length > 10 ? "..." : ""}
            </p>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {product.price.toFixed(2)}/-
          </p>
        </div>
        <button
          className={`mt-4 w-[90%] ms-[5%] mb-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 py-2 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out transform ${
            isAlreadyInCart && "bg-gray-500 cursor-not-allowed"
          }`}
          onClick={addToCartHandler}
          disabled={isAlreadyInCart}
        >
          {isAlreadyInCart ? "Already in Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

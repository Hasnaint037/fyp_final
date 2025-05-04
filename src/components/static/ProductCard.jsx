import React, { useEffect, useState } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isAlreadyInCart = cartData.find((data) => data._id === product._id);

  const addToCartHandler = (e) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("updateCart"));
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate("/product-detail", { state: { product } })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden">
          <motion.img
            src={product?.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                NEW
              </span>
            )}
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
              {product?.category}
            </span>
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isWishlisted ? (
              <FaHeart className="text-rose-500" size={18} />
            ) : (
              <CiHeart className="text-gray-600" size={20} />
            )}
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toFixed(2)}/-
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={addToCartHandler}
            disabled={isAlreadyInCart}
            whileHover={{ scale: isAlreadyInCart ? 1 : 1.03 }}
            whileTap={{ scale: isAlreadyInCart ? 1 : 0.97 }}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
              isAlreadyInCart
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <FaShoppingCart size={16} />
                Added to Cart
              </>
            ) : (
              <>
                <CiShoppingCart size={18} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;

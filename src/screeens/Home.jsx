import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetAllProduct } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaSmile, FaShoppingBag } from "react-icons/fa";
import heroImage from "../asset/hero.jpg";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts, allProductLoading } = useSelector(
    (state) => state?.product
  );

  useEffect(() => {
    dispatch(GetAllProduct());
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return allProductLoading ? (
    <PageLoader />
  ) : (
    <div className="mb-10">
      {/* Hero */}
      <div className="relative h-[70vh] bg-black text-white flex items-center justify-center text-center px-6 overflow-hidden">
        <img
          src={heroImage}
          alt="Tech Hero"
          className="absolute w-full h-full object-cover opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold mb-4">Next-Gen Tech, Delivered</h1>
          <p className="text-lg mb-6">
            Shop from our exclusive hand-picked premium gadgets.
          </p>
          <button
            onClick={() => navigate("#featured")}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Browse Collection
          </button>
        </motion.div>
      </div>

      {/* Featured Products */}
      <div id="featured" className="w-[90%] m-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Featured Products
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allProducts?.slice(0, 6).map((product, index) => (
            <motion.div key={product._id || index} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trending Deals */}
      <div className="w-[90%] m-auto mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🔥 Trending Deals
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-emerald-600 to-teal-500 text-white w-64 h-36 rounded-xl p-4 shadow-md hover:scale-105 transition flex flex-col justify-between"
            >
              <div className="text-lg font-semibold">Deal {i + 1}</div>
              <div className="text-sm">Save up to 30% on select gadgets</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="w-[90%] m-auto mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shop by Category
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {["Mobiles", "Laptops", "Watches", "Accessories", "Others"].map(
            (cat, i) => (
              <div
                key={i}
                onClick={() => navigate(cat.toLowerCase())}
                className="min-w-[140px] h-32 bg-emerald-100 flex items-center justify-center rounded-xl font-semibold text-emerald-700 text-lg hover:bg-emerald-200 cursor-pointer transition shadow-sm"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-24 w-[90%] m-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          What Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((t) => (
            <div
              key={t}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
            >
              <FaSmile className="text-3xl text-emerald-500 mb-3" />
              <p className="text-gray-600 mb-2">
                “Amazing quality and fast delivery. Will shop again!”
              </p>
              <div className="text-sm font-semibold text-gray-700">
                - Happy Customer
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-24 bg-emerald-600 text-white text-center py-14 px-4">
        <FaShoppingBag className="text-5xl mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Get Ready to Be Impressed</h2>
        <p className="text-lg mb-6">
          Browse through a world of top-notch tech and unbeatable deals.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-emerald-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default Home;

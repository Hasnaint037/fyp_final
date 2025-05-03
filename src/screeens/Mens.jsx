import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForMen } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import mens from "../asset/mens.jpg"; // Add any relevant image
import { FaTshirt, FaClock, FaAward } from "react-icons/fa";

function Mens() {
  const dispatch = useDispatch();
  const { forMen, forMenLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetForMen());
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return forMenLoading ? (
    <PageLoader />
  ) : (
    <div className="w-full mb-10">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden shadow-lg">
        <img
          src={mens}
          alt="Men Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Men's Collection
          </motion.h1>
          <motion.p
            className="text-gray-200 mt-4 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Redefine your wardrobe with our latest and stylish men's fashion
            essentials.
          </motion.p>
        </div>
      </div>

      {/* Product Section */}
      <div className="w-[85%] m-auto mt-10">
        <motion.h1
          className="text-2xl font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Products for Men
        </motion.h1>

        <motion.div
          className="flex-1 mt-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forMen.length > 0 ? (
              forMen.map((product, index) => (
                <motion.div key={product._id || index} variants={cardVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-xl font-semibold w-full col-span-full">
                No Products Found
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quote / Statement Section */}
      <div className="bg-gray-100 py-10 mt-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            "Fashion is the armor to survive the reality of everyday life."
          </h2>
          <p className="mt-4 text-gray-600">
            Discover our handpicked collection curated to empower your style.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="w-[85%] m-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaTshirt className="text-4xl text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              Soft, breathable and long-lasting materials.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaClock className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Dispatch</h3>
            <p className="text-gray-600">
              Quick processing and reliable shipping.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaAward className="text-4xl text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Brand</h3>
            <p className="text-gray-600">
              Thousands of satisfied customers worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mens;

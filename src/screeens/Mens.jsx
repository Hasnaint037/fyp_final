import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForMen } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import mobileHero from "../asset/mens.jpg";
import {
  FaMobileAlt,
  FaBatteryFull,
  FaCamera,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Mobile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forMen, forMenLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetForMen());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return forMenLoading ? (
    <PageLoader />
  ) : (
    <div className="w-full mb-10 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={mobileHero}
          alt="Mobile Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-600/50 flex flex-col justify-end items-center text-center pb-12 px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Mobile Universe
          </motion.h1>
          <motion.p
            className="text-blue-100 text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the latest smartphones with cutting-edge technology
          </motion.p>
          <motion.button
            onClick={() => navigate("#products")}
            className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </motion.button>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        className="w-[90%] mx-auto mt-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Our Mobiles?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaMobileAlt className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Latest Models</h3>
            <p className="text-sm text-gray-600 mt-1">New releases</p>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBatteryFull className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Long Battery</h3>
            <p className="text-sm text-gray-600 mt-1">All-day power</p>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaCamera className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Pro Camera</h3>
            <p className="text-sm text-gray-600 mt-1">Stunning photos</p>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaShieldAlt className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">1 Year Warranty</h3>
            <p className="text-sm text-gray-600 mt-1">Peace of mind</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Products Section */}
      <div id="products" className="w-[90%] m-auto mt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">Latest Mobiles</h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {forMen?.length > 0 ? (
            forMen.map((product, index) => (
              <motion.div
                key={product._id || index}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-xl font-semibold w-full col-span-full py-12"
              variants={fadeIn}
            >
              No Mobile Products Found
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Brands Section */}
      <div className="w-[90%] m-auto mt-20">
        <motion.h2
          className="text-2xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Popular Brands
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {["Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Oppo"].map(
            (brand, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center hover:shadow-lg transition cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.1 }}
              >
                <span className="font-bold text-gray-700">{brand}</span>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-20 py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Our mobile experts are available 24/7 to help you find the perfect
            device for your needs.
          </p>
          <motion.button
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Email at admin@gmail.com
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Mobile;

import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForWomen } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLaptop, FaBolt, FaShieldAlt, FaMicrochip } from "react-icons/fa";
import laptopHero from "../asset/women.jpeg";

function Laptops() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forWomen, forWomenLoading } = useSelector((state) => state.product);
  console.log(forWomen);

  useEffect(() => {
    dispatch(GetForWomen());
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

  return forWomenLoading ? (
    <PageLoader />
  ) : (
    <div className="w-full mb-10 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={laptopHero}
          alt="Laptop Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-blue-800/50 flex flex-col justify-end items-center text-center pb-12 px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Premium Laptops
          </motion.h1>
          <motion.p
            className="text-blue-100 text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Power your productivity with our high-performance laptops
          </motion.p>
          <motion.button
            onClick={() => navigate("#products")}
            className="mt-6 bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
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
          Why Our Laptops Stand Out
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
              <FaLaptop className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Ultra-Portable</h3>
            <p className="text-sm text-gray-600 mt-1">Lightweight designs</p>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaBolt className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Fast Processors</h3>
            <p className="text-sm text-gray-600 mt-1">Blazing speed</p>
          </motion.div>

          <motion.div
            className="bg-white p-4 rounded-xl shadow-sm text-center"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaMicrochip className="text-blue-600 text-xl" />
            </div>
            <h3 className="font-semibold">Powerful Specs</h3>
            <p className="text-sm text-gray-600 mt-1">Top-tier hardware</p>
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
            <h3 className="font-semibold">Extended Warranty</h3>
            <p className="text-sm text-gray-600 mt-1">3-year coverage</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Featured Laptops</h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {forWomen?.length > 0 ? (
            forWomen.map((product, index) => (
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
              No Laptops Found
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
          Top Brands
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {["Apple", "Dell", "HP", "Lenovo", "Asus", "MSI"].map((brand, i) => (
            <motion.div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex items-center justify-center hover:shadow-lg transition cursor-pointer"
              variants={cardVariants}
              whileHover={{ scale: 1.1 }}
            >
              <span className="font-bold text-gray-700">{brand}</span>
            </motion.div>
          ))}
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
          <h2 className="text-3xl font-bold mb-4">Need Tech Advice?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Our laptop specialists can help you find the perfect machine for
            work, gaming, or creativity.
          </p>
          <motion.button
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat With Expert
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Laptops;

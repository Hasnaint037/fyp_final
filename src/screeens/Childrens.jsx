import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForChildren } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaClock, FaGlasses, FaHeadphones, FaRing } from "react-icons/fa";
import othersHero from "../asset/children.jpg";

function Others() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forChildren, forChildrenLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(GetForChildren());
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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const scaleUp = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  return forChildrenLoading ? (
    <PageLoader text="Loading Accessories" />
  ) : (
    <div className="w-full mb-10 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={othersHero}
          alt="Accessories Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-indigo-800/50 flex flex-col justify-end items-center text-center pb-12 px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Premium Accessories
          </motion.h1>
          <motion.p
            className="text-purple-100 text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevate your style with our exquisite watches and accessories
          </motion.p>
          <motion.button
            onClick={() => navigate("#products")}
            className="mt-6 bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover More
          </motion.button>
        </div>
      </div>

      {/* Categories Grid */}
      <motion.div
        className="w-[90%] mx-auto mt-16"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What we Offer
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaClock className="text-purple-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-lg">Watches</h3>
            <p className="text-sm text-gray-600 mt-1">Luxury & smart</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRing className="text-purple-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-lg">Jewelry</h3>
            <p className="text-sm text-gray-600 mt-1">Elegant pieces</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGlasses className="text-purple-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-lg">Eyewear</h3>
            <p className="text-sm text-gray-600 mt-1">Sunglasses & more</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm text-center cursor-pointer"
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeadphones className="text-purple-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-lg">Audio</h3>
            <p className="text-sm text-gray-600 mt-1">Headphones & earbuds</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Watches Section */}
      <div id="watches" className="w-[90%] m-auto mt-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-800">Featured Watches</h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {forChildren?.map((product, index) => (
            <motion.div
              key={product._id || index}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div variants={scaleUp}>
                <ProductCard product={product} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Brands Showcase */}
      <div className="w-[90%] m-auto mt-20 bg-white rounded-xl shadow-md p-8">
        <motion.h2
          className="text-2xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Trusted Brands
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {["Rolex", "Ray-Ban", "Bose", "Titan", "Swarovski", "Sony"].map(
            (brand, i) => (
              <motion.div
                key={i}
                className="bg-gray-50 p-4 rounded-lg shadow-sm w-28 h-28 flex items-center justify-center hover:shadow-md transition cursor-pointer"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-bold text-gray-700 text-center">
                  {brand}
                </span>
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white mt-20 py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Complete Your Look</h2>
          <p className="text-lg mb-8 text-purple-100 max-w-2xl mx-auto">
            The perfect accessories can transform your entire outfit. Find your
            statement pieces today.
          </p>
          <motion.button
            className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Accessories
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Others;

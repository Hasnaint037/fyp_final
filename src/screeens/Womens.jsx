import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForWomen } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaShoppingBag, FaRocket, FaStar } from "react-icons/fa";
import womenHero from "../asset/women.jpeg"; // Replace with actual path or use a random image

function Womens() {
  const dispatch = useDispatch();
  const { forWomen, forWomenLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(GetForWomen());
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

  return forWomenLoading ? (
    <PageLoader />
  ) : (
    <div className="w-full mb-10">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden shadow-lg">
        <img
          src={womenHero}
          alt="Women Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Women's Collection
          </motion.h1>
          <motion.p
            className="text-gray-100 mt-4 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the latest trends in women's fashion with elegance and
            comfort.
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
          Explore Products for Women
        </motion.h1>

        <motion.div
          className="flex-1 mt-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forWomen.length > 0 ? (
              forWomen.map((product, index) => (
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
      <div className="bg-pink-100 py-10 mt-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-900">
            "Style is a way to say who you are without having to speak."
          </h2>
          <p className="mt-4 text-pink-800">
            Elevate your wardrobe with curated pieces made for every woman.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="w-[85%] m-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaShoppingBag className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chic Styles</h3>
            <p className="text-gray-600">
              Trend-setting designs for every occasion.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaRocket className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Lightning fast shipping to your doorstep.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Loved by Customers</h3>
            <p className="text-gray-600">
              Top-rated products trusted by thousands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Womens;

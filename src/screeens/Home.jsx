import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetAllProduct } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import heroimage from "../asset/hero.jpg";
import { FaShippingFast, FaStar, FaHeadset } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return allProductLoading ? (
    <PageLoader />
  ) : (
    <div className="mb-10">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden shadow-md">
        <img
          src={heroimage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl sm:text-5xl font-bold"
          >
            Discover Your Style
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-200 mt-4 text-lg max-w-xl"
          >
            Explore our latest collection of modern, trendy, and comfortable
            fashion.
          </motion.p>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            Shop Now
          </motion.a>
        </div>
      </div>

      {/* Product Section */}
      <div id="products" className="w-[85%] m-auto mt-10">
        <motion.h1
          className="text-2xl font-semibold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Here you can explore!
        </motion.h1>

        <motion.div
          className="flex-1 mt-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts?.map((product, index) => (
              <motion.div key={product._id || index} variants={cardVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="w-[85%] m-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaShippingFast className="text-4xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Lightning-fast shipping all across the country.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaStar className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Top Rated</h3>
            <p className="text-gray-600">
              Customer satisfaction is our #1 priority.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <FaHeadset className="text-4xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              We’re here for you at every step of the journey.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-[85%] m-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Shop by Category
        </h2>
        <div className="flex justify-center gap-6 overflow-x-auto pb-2">
          {["Men", "Women", "children"].map((category, idx) => (
            <div
              key={idx}
              className="min-w-[160px] h-40 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition"
              onClick={() => navigate(category.toLocaleLowerCase())}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Elevate Your Wardrobe?
        </h2>
        <p className="text-lg mb-6">
          Shop now and enjoy exclusive deals and fast delivery.
        </p>
        <a
          href="#products"
          className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          Explore Collection
        </a>
      </div>
    </div>
  );
}

export default Home;

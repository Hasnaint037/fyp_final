import PageLoader from "@/components/static/PageLoader";
import ProductCard from "@/components/static/ProductCard";
import { GetForChildren } from "@/store/features/product/product.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaSmile, FaShieldAlt, FaTshirt } from "react-icons/fa";
import childrenHero from "../asset/children.jpg"; // Replace with your actual asset path

function Childrens() {
  const dispatch = useDispatch();
  const { forChildren, forChildrenLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(GetForChildren());
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

  return forChildrenLoading ? (
    <PageLoader text="Loading Products" />
  ) : (
    <div className="w-full mb-10">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden shadow-lg">
        <img
          src={childrenHero}
          alt="Children Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            className="text-white text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Kids' Collection
          </motion.h1>
          <motion.p
            className="text-gray-100 mt-4 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cute, colorful, and comfortable clothing made just for little ones.
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
          Explore Products for Children
        </motion.h1>

        <motion.div
          className="flex-1 mt-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forChildren.length > 0 ? (
              forChildren.map((product, index) => (
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

      {/* Quote Section */}
      <div className="bg-yellow-100 py-10 mt-20">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-800">
            "Let kids be kids – with clothes that move, play, and grow with
            them."
          </h2>
          <p className="mt-4 text-yellow-700">
            Fun-filled fashion that’s safe and comfy for your little ones.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="w-[85%] m-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Parents Love Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaTshirt className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Soft & Comfy</h3>
            <p className="text-gray-600">Gentle fabrics for sensitive skin.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaShieldAlt className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safe Materials</h3>
            <p className="text-gray-600">
              100% non-toxic and child-friendly clothing.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <FaSmile className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Made to Play</h3>
            <p className="text-gray-600">
              Durable and flexible for every adventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Childrens;

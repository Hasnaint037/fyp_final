import React from "react";
import { SiVirustotal } from "react-icons/si";
import { LiaBullseyeSolid } from "react-icons/lia";
import { IoFlashOffOutline } from "react-icons/io5";
import { MdDoNotDisturbOnTotalSilence } from "react-icons/md";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function ProductTiles() {
  const { allProducts } = useSelector((state) => state.product);
  const { ordersCount } = useSelector((state) => state.order);

  const stats = [
    {
      title: "Total Products",
      value: allProducts.length,
      icon: <SiVirustotal size={30} />,
      bgColor: "#457AEE",
    },
    {
      title: "InStock Products",
      value: allProducts.filter((product) => product.quantity > 0).length,
      icon: <LiaBullseyeSolid size={30} />,
      bgColor: "#1FFAE2",
    },
    {
      title: "Out of Stock",
      value: allProducts.filter((product) => product.quantity === 0).length,
      icon: <IoFlashOffOutline size={30} />,
      bgColor: "#FF6F61",
    },
    {
      title: "Total Orders",
      value: ordersCount.reduce((acc, item) => acc + item, 0),
      icon: <MdDoNotDisturbOnTotalSilence size={30} />,
      bgColor: "#FF6F61",
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map(({ title, value, icon, bgColor }, index) => (
        <motion.div
          key={index}
          className="flex justify-between items-center py-5 px-5 shadow-lg border rounded-lg transform transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: bgColor }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="px-2 h-14 flex justify-center items-center rounded-full bg-white">
            {icon}
          </div>
          <div className="text-white">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="font-bold text-xl">{value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ProductTiles;

import CartDetailProduct from "@/components/static/CartDetailProduct";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { CreateOrder } from "@/store/features/order/order.slice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

export default function CartDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});
  const [colors, setColors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  function moveToNext(response) {
    setIsLoading(false);
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response);
    }
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    Swal.fire({
      title: "Confirm Your Order",
      html: `<div class="text-left">
        <p class="text-lg mb-3">You're about to place an order for <strong>${cartItems.length} item(s)</strong>.</p>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p>• After confirmation, our team will contact you for shipping details.</p>
          <p>• Orders cannot be cancelled once placed.</p>
        </div>
      </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm Order",
      cancelButtonText: "Review Cart",
      customClass: {
        confirmButton:
          "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 me-2",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300",
      },
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        setIsLoading(true);
        const orderPayload = {
          items: cartItems.map((item) => ({
            productId: item._id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: quantities[item._id] || 1,
            color: colors[item._id] || "black",
            size: sizes[item._id] || "m",
          })),
          totalAmount: cartItems.reduce(
            (acc, item) => acc + item.price * (quantities[item._id] || 1),
            0
          ),
          shippingAddress: {
            name: "Guest User",
            phone: "0000000000",
            address: "N/A",
            city: "N/A",
            postalCode: "00000",
            country: "N/A",
          },
        };
        return dispatch(CreateOrder({ payload: orderPayload, moveToNext }))
          .unwrap()
          .then(() => {
            localStorage.removeItem("cart");
            setCartItems([]);
            window.dispatchEvent(new Event("updateCart"));
          });
      },
    }).then((result) => {
      if (result.isDismissed) {
        toast.info("Please review your cart items");
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 md:p-6 min-h-[80vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <FaShoppingCart className="text-2xl text-blue-600" />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your Shopping Cart
        </h2>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="bg-blue-100 p-6 rounded-full mb-4">
            <FaShoppingCart className="text-4xl text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            Looks like you haven't added any items to your cart yet.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            Continue Shopping <FaArrowRight />
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-8"
          >
            <CartDetailProduct
              quantities={quantities}
              setQuantities={setQuantities}
              colors={colors}
              setColors={setColors}
              size={sizes}
              setSize={setSizes}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-lg font-semibold">
                <span className="text-gray-600">Order Total:</span>{" "}
                <span className="text-blue-600">
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + item.price * (quantities[item._id] || 1),
                      0
                    )
                    .toFixed(2)}
                  /-
                </span>
              </div>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  size="lg"
                  onClick={handlePlaceOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Place Order <FaArrowRight />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

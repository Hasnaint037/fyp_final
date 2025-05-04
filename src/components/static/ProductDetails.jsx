import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { CreateOrder } from "@/store/features/order/order.slice";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";

function ProductDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = location?.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response);
    }
  }

  const buyHandler = () => {
    Swal.fire({
      title: "Confirm Your Purchase",
      html: `<div class="text-left">
        <p class="text-lg mb-3">You're about to purchase <strong>${
          product.name
        }</strong>.</p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <p>• Quantity: <strong>${quantity}</strong></p>
          <p>• Color: <strong>${color || "Not selected"}</strong></p>
          <p>• Size: <strong>${size || "Not selected"}</strong></p>
          <p class="mt-2">• Total: <strong class="text-lg">$${(
            product.price * quantity
          ).toFixed(2)}</strong></p>
        </div>
      </div>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm Purchase",
      cancelButtonText: "Review Details",
      customClass: {
        confirmButton:
          "bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 me-2",
        cancelButton:
          "bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const orderPayload = {
          items: [
            {
              productId: product._id,
              name: product.name,
              image: product.image,
              price: product.price,
              quantity,
              size,
              color,
            },
          ],
          totalAmount: product.price * quantity,
        };
        dispatch(CreateOrder({ payload: orderPayload, moveToNext }))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: "Order Confirmed!",
              text: "Your purchase has been successfully placed.",
              icon: "success",
              confirmButtonText: "View Orders",
            });
          })
          .catch(() => {
            Swal.fire(
              "Error",
              "There was an issue placing your order",
              "error"
            );
          });
      }
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      !isWishlisted ? "Added to wishlist" : "Removed from wishlist"
    );
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const scaleUp = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-10 mt-6 w-[90%] mx-auto"
    >
      <Toaster position="top-center" richColors />

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Image Section */}
        <motion.div
          className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
              {product?.category}
            </Badge>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleWishlist}
            className={`absolute right-4 top-4 z-10 p-2 rounded-full ${
              isWishlisted
                ? "bg-rose-100 text-rose-500"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </motion.button>

          <motion.img
            src={product?.image}
            alt={product?.name}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.name}
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-emerald-600">
              {product?.price.toFixed(2)}/-
            </span>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Separator className="my-4 bg-gray-200" />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product?.description}
            </p>
          </motion.div>

          {/* Size Selection */}
          <motion.div variants={fadeInUp}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Size</h3>
            <RadioGroup
              value={size}
              onValueChange={setSize}
              className="flex flex-wrap gap-3"
            >
              {["XS", "S", "M", "L", "XL", "XXL"].map((item) => (
                <div key={item} className="flex items-center">
                  <RadioGroupItem
                    value={item}
                    id={`size-${item}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`size-${item}`}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white font-medium transition hover:bg-emerald-50 hover:border-emerald-400 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 peer-data-[state=checked]:text-emerald-700"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          {/* Color Selection */}
          <motion.div variants={fadeInUp}>
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Color</h3>
            <RadioGroup
              value={color}
              onValueChange={setColor}
              className="flex gap-3 flex-wrap"
            >
              {[
                { id: "black", color: "bg-gray-900", name: "Black" },
                { id: "white", color: "bg-white border", name: "White" },
                { id: "blue", color: "bg-blue-600", name: "Blue" },
                { id: "green", color: "bg-emerald-600", name: "Green" },
                { id: "red", color: "bg-red-600", name: "Red" },
              ].map((c) => (
                <div key={c.id} className="flex flex-col items-center gap-1">
                  <RadioGroupItem
                    value={c.id}
                    id={`color-${c.id}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`color-${c.id}`}
                    className={`h-10 w-10 rounded-full cursor-pointer ${c.color} flex items-center justify-center peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-emerald-500 peer-data-[state=checked]:ring-offset-2 transition-all`}
                  >
                    <span className="sr-only">{c.name}</span>
                  </Label>
                  <span className="text-xs text-gray-500">{c.name}</span>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          {/* Quantity & Actions */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4"
          >
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <div className="flex h-12 w-16 items-center justify-center font-medium bg-white text-gray-900">
                {quantity}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={incrementQuantity}
                className="h-12 w-12 flex items-center justify-center bg-gray-100 text-gray-700"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <motion.button
                variants={scaleUp}
                whileHover="hover"
                whileTap="tap"
                onClick={buyHandler}
                disabled={!size || !color}
                className="flex-1 sm:flex-none h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;

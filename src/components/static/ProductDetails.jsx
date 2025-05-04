import { useState } from "react";
import { Minus, Plus } from "lucide-react";
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
      title: "Are you sure you want to place this order?",
      html: `<p>Once the order is placed, it <strong>cannot be cancelled</strong>.</p>
      <p>Our team will contact you regarding your location, shipping address, payments, and order deadline.</p>`,
      showCancelButton: true,
      confirmButtonText: "Place Order",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800 me-2",
        cancelButton:
          "bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800",
      },
      buttonsStyling: false,
      icon: "warning",
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
        };
        dispatch(CreateOrder({ payload: orderPayload, moveToNext }));
        Swal.fire({
          title: "Order Placed!",
          text: "Your order has been successfully placed, and our team will contact you for further steps.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (result.isDenied) {
        Swal.fire("Order not placed", "Your order was not processed", "info");
      }
    });
  };

  return (
    <div className="mb-10 mt-6 w-[90%] mx-auto">
      <Toaster />
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {/* Image Section */}
        <motion.div
          className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Badge className="absolute left-3 top-3 z-10 bg-indigo-200 text-indigo-800">
            {product?.category}
          </Badge>
          <img
            src={product?.image}
            alt="Product"
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="md:col-span-1 lg:col-span-2 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {product?.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold text-indigo-700">
              {product?.price}/-
            </span>
          </div>

          <Separator className="my-2" />

          <div>
            <h3 className="mb-2 font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600">{product?.description}</p>
          </div>

          {/* Quantity & Buy Now */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 text-gray-700"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-10 w-12 items-center justify-center font-medium bg-gray-50">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                className="h-10 w-10 text-gray-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="default"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 transition"
              onClick={buyHandler}
            >
              Buy Now
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;

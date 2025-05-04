import CartDetailProduct from "@/components/static/CartDetailProduct";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { CreateOrder } from "@/store/features/order/order.slice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CartDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});
  const [colors, setColors] = useState({});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response);
    }
  }

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    Swal.fire({
      title: "Are you sure you want to place this order?",
      html: `<p>Once the order is placed, it <strong>cannot be cancelled</strong>.</p>
      <p>Our team will contact you regarding your location, shipping address, payments, and order deadline.</p>`,
      icon: "warning",
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
    }).then((result) => {
      if (result.isConfirmed) {
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

        dispatch(CreateOrder({ payload: orderPayload, moveToNext }))
          .unwrap()
          .then(() => {
            localStorage.removeItem("cart");
            setCartItems([]);
            Swal.fire(
              "Order Placed!",
              "We will contact you shortly.",
              "success"
            );
            window.dispatchEvent(new Event("updateCart"));
          })
          .catch(() => {
            Swal.fire(
              "Failed!",
              "There was an issue placing your order.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 min-h-[80vh]">
      <h2 className="text-2xl font-semibold">Your Cart</h2>
      <CartDetailProduct
        quantities={quantities}
        setQuantities={setQuantities}
        colors={colors}
        setColors={setColors}
        size={sizes}
        setSize={setSizes}
      />
      <div className="flex justify-end ites-center gap-3">
        <h3>
          Total :
          {cartItems.reduce(
            (acc, item) => acc + item.price * (quantities[item._id] || 1),
            0
          )}
        </h3>
        <Button
          size="lg"
          onClick={handlePlaceOrder}
          className="bg-black text-white hover:bg-black hover:text-white hover:scale-105"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

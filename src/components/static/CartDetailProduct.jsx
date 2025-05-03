import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

function CartDetailProduct({
  quantities,
  setQuantities,
  colors,
  setColors,
  size,
  setSize,
}) {
  const [cartItems, setCartItems] = useState([]);

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  useEffect(() => {
    const fetchCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
      const initialQuantities = {};
      const initialColors = {};
      const initialSizes = {};
      cart.forEach((item) => {
        initialQuantities[item._id] = 1;
        initialColors[item._id] = "black";
        initialSizes[item._id] = "m"; // default size
      });
      setQuantities(initialQuantities);
      setColors(initialColors);
      setSize(initialSizes);
    };

    fetchCart();

    window.addEventListener("updateCart", fetchCart);
    return () => window.removeEventListener("updateCart", fetchCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("updateCart"));
  };

  return (
    <div className="space-y-6">
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <Card
            key={item._id}
            className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl border-2 border-gray-300"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {item.name}
                </h3>
                <h4 className="text-sm text-gray-600">Select Color</h4>
                <RadioGroup
                  value={colors[item._id] || "black"}
                  onValueChange={(value) =>
                    setColors((prev) => ({
                      ...prev,
                      [item._id]: value,
                    }))
                  }
                  className="flex flex-wrap gap-3 mt-2"
                >
                  {[
                    { id: "black", color: "bg-black" },
                    { id: "white", color: "bg-white border" },
                    { id: "blue", color: "bg-blue-600" },
                    { id: "red", color: "bg-red-600" },
                  ].map((colorOption) => (
                    <div key={colorOption.id} className="flex items-center">
                      <RadioGroupItem
                        value={colorOption.id}
                        id={`color-${item._id}-${colorOption.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${item._id}-${colorOption.id}`}
                        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 
                          ${colorOption.color} 
                          peer-data-[state=checked]:ring-2
                          peer-data-[state=checked]:ring-primary 
                          peer-data-[state=checked]:ring-offset-2
                          peer-data-[state=checked]:scale-110
                          peer-data-[state=checked]:shadow-lg`}
                      >
                        <span className="sr-only">{colorOption.id}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                <div>
                  <h3 className="mb-3 font-semibold text-gray-700">
                    Select Size
                  </h3>
                  <RadioGroup
                    value={size[item._id] || "m"}
                    onValueChange={(value) =>
                      setSize((prev) => ({
                        ...prev,
                        [item._id]: value,
                      }))
                    }
                    className="flex flex-wrap gap-3"
                  >
                    {["xs", "s", "m", "l", "xl", "xxl"].map((sizeOption) => (
                      <div key={sizeOption} className="flex items-center">
                        <RadioGroupItem
                          value={sizeOption}
                          id={`size-${item._id}-${sizeOption}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`size-${item._id}-${sizeOption}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-white font-medium uppercase transition hover:bg-indigo-100 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 peer-data-[state=checked]:text-indigo-700"
                        >
                          {sizeOption}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decrementQuantity(item._id)}
                  disabled={quantities[item._id] <= 1}
                  className="h-10 w-10 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-150 ease-in-out"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-10 w-12 items-center justify-center border-y border-gray-300 text-center font-medium">
                  {quantities[item._id] || 1}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => incrementQuantity(item._id)}
                  className="h-10 w-10 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-150 ease-in-out"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="bg-red-600 text-white hover:bg-red-700 transition duration-150 ease-in-out"
                onClick={() => removeFromCart(item._id)}
              >
                Remove from cart
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default CartDetailProduct;

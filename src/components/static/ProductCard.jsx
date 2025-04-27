import React, { useEffect, useState } from 'react'

function ProductCard({ product }) {
  const [cartData, setCartData] = useState([]);
  const isAlreadyInCart = cartData.find((data) => data._id === product._id);

  const addToCartHandler = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("updateCart"))
  }

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(cart);
    };
    updateCartCount();
    window.addEventListener("updateCart", updateCartCount)
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    }
  }, []);

  return (
    <div>
      <div key={product.id} className="group relative shadow-xl px-3 py-3 border rounded-lg border-gray-200">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product?.image}
            alt={product.name}
            className="h-60 w-full object-cover object-center group-hover:opacity-75 hover:scale-110 transition-all"
          />
          {product.isNew && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">NEW</div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-red-300 font-semibold">For {product.category}</p>
            <p className='text-gray-400 text-sm'>{product.description}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{product.price.toFixed(2)}/-</p>
        </div>
        <button className={`mt-4 w-full bg-gray-800 hover:bg-gray-900 hover:scale-105 py-2 rounded text-white ${isAlreadyInCart && 'bg-gray-500 hover:bg-gray-500 hover:scale-100'}`} onClick={addToCartHandler} disabled={isAlreadyInCart}>
          {
            isAlreadyInCart ? "Already in Cart" : "Add to Cart"
          }
        </button>
      </div>
    </div>
  )
}

export default ProductCard

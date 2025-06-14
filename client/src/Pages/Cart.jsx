import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { removeFromCartApi } from "../api/api";

export const Cart = () => {
  const { state, dispatch, removeFromCart, updateQuantity } = useCart();
  const { cartItems } = state;

  const handleRemove = async (item) => {
    try {
      await removeFromCart(item);
    } catch (error) {
      toast.error(error.message || "Failed to remove item from cart!");
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await removeFromCartApi({});
      dispatch({ type: "SET_CART", payload: [] });
      toast.success(res.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart!");
    }
  };

  return (
    <div className="container pt-15 relative m-auto px-4">
      <div className="py-3 mt-5">
        <h1 className="heading text-4xl">Your Curated Collection</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items Section */}
        <div className="flex-2 w-full">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full p-2 mb-2 bg-white rounded border"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <h2 className="text-sm mb-1">{item.name || "No Title"}</h2>
                    <img
                      src={item.image || "https://via.placeholder.com/64"}
                      alt={item.name || "Product"}
                      className="w-20 h-20 object-contain rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>Color:</span>
                    <span
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.color || "#ccc" }}
                    ></span>
                    <span className="capitalize">{item.color || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Size:</span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-200 text-xs font-medium uppercase">
                      {item.size || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        updateQuantity(item, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 font-bold py-1 px-3 rounded-l disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border border-gray-300 rounded-md py-1"
                    />

                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-800 font-bold py-1 px-3 rounded-r"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-blue-700 font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                  <button
                    className="px-4 py-2 text-white bg-red-700 cursor-pointer hover:bg-red-600 rounded-full"
                    onClick={() => handleRemove(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-6 mt-4">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Add some items to your cart!</p>
              <NavLink to={"/products"} className="px-4 py-2 mt-4 btn-primary">
                Continue Shopping
              </NavLink>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="flex justify-end items-center gap-2 mt-4">
              <button>
                <NavLink
                  to={"/products"}
                  className="px-4 py-2 rounded btn-primary"
                >
                  Continue Shopping
                </NavLink>
              </button>
              <button
                onClick={handleClearCart}
                className="mt-4 px-4 py-2 bg-red-800 mb-5 cursor-pointer text-white rounded hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="flex-1 w-full lg:max-w-sm sticky top-19 h-full">
            <div className="flex flex-col w-full p-5 bg-white rounded border border-green-600">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex flex-col gap-2 text-base">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Price:</span>
                  <span>
                    $
                    {cartItems
                      .reduce(
                        (total, item) =>
                          total +
                          Number(item.price ?? 0) * (item.quantity ?? 1),
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 mt-6 btn-primary w-full">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

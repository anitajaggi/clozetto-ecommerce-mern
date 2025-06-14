import { createContext, useReducer, useContext, useEffect } from "react";
import { getCartApi, removeFromCartApi, updateQuantityApi } from "../api/api";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  cartItems: [],
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.cartItems.find(
        (item) =>
          item.product === action.payload.product &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item === itemExists
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            item.product !== action.payload.product ||
            item.color !== action.payload.color ||
            item.size !== action.payload.size
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload.product &&
          item.color === action.payload.color &&
          item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCartApi();
        dispatch({ type: "SET_CART", payload: cartData.items });
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (item) => {
    try {
      const res = await removeFromCartApi({
        productId: item.product,
        color: item.color,
        size: item.size,
      });

      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          product: item.product,
          color: item.color,
          size: item.size,
        },
      });

      toast.success(res.message);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      toast.error("Error removing item");
    }
  };

  const updateQuantity = async (item, newQuantity) => {
    try {
      const res = await updateQuantityApi({
        productId: item.product,
        color: item.color,
        size: item.size,
        quantity: newQuantity,
      });

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          product: item.product,
          color: item.color,
          size: item.size,
          quantity: newQuantity,
        },
      });

      toast.success("Quantity updated");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  return (
    <CartContext.Provider
      value={{ state, dispatch, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

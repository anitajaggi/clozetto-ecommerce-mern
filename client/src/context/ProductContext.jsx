// context/ProductContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import { productReducer, proInitialState } from "../reducer/ProductReducer";
import { getProducts } from "../api/api";

const ProContext = createContext();

export const ProProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, proInitialState);

  useEffect(() => {
    const fetchProd = async () => {
      dispatch({ type: "FETCH_PRO_REQUEST" });
      try {
        const data = await getProducts();
        dispatch({ type: "FETCH_PRO_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "PRO_ERROR", payload: error.message });
      }
    };
    fetchProd();
  }, []);

  const singleProduct = (id) => {
    return state.allproducts.find((sProd) => sProd._id === id);
  };

  // Extract filters dynamically
  const allCategories = [...new Set(state.allproducts.map((p) => p.category))];
  const allColors = [
    ...new Set(state.allproducts.flatMap((p) => p.colors || [])),
  ];
  const allSizes = [
    ...new Set(state.allproducts.flatMap((p) => p.sizes || [])),
  ];
  const prices = state.allproducts.map((p) => p.price || 0);
  const maxPrice = Math.max(...prices, 0);
  const minPrice = Math.min(...prices, 0);

  // Filter state (can be moved to reducer if you want to manage more complex logic)
  const filterState = state.filters || {
    category: "",
    color: "",
    size: "",
    price: maxPrice,
    sort: "",
  };

  const updateFilter = (name, value) => {
    dispatch({ type: "UPDATE_FILTER", payload: { name, value } });
  };

  const applyFilters = () => {
    let filtered = [...state.allproducts];
    const { category, color, size, price, sort } = filterState;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (color) {
      filtered = filtered.filter((p) => (p.colors || []).includes(color));
    }

    if (size) {
      filtered = filtered.filter((p) => (p.sizes || []).includes(size));
    }

    filtered = filtered.filter((p) => (p.price || 0) <= price);

    if (sort === "low") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sort === "high") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return filtered;
  };

  const filteredProducts = applyFilters();

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <ProContext.Provider
      value={{
        state,
        singleProduct,
        filterOptions: {
          allCategories,
          allColors,
          allSizes,
          minPrice,
          maxPrice,
        },
        filters: filterState,
        updateFilter,
        filteredProducts,
        clearFilter,
      }}
    >
      {children}
    </ProContext.Provider>
  );
};

export const useProducts = () => useContext(ProContext);

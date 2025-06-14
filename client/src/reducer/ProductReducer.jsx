// reducer/ProductReducer.js
export const proInitialState = {
  allproducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    color: "",
    size: "",
    price: 0,
    sort: "",
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRO_REQUEST":
      return { ...state, loading: true };
    case "FETCH_PRO_SUCCESS":
      return {
        ...state,
        loading: false,
        allproducts: action.payload,
        filters: {
          ...state.filters,
          price: Math.max(...action.payload.map((p) => p.price || 0)),
        },
      };
    case "PRO_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case "CLEAR_FILTERS":
      const prices = state.allproducts.map((p) => p.price || 0);
      const maxPrice = Math.max(...prices, 0);

      return {
        ...state,
        filters: {
          category: "",
          color: "",
          size: "",
          price: maxPrice,
          sort: "",
        },
      };
    default:
      return state;
  }
};

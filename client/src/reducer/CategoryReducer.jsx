export const catInitialState = {
  categories: [],
  loading: false,
  error: null,
  currentCat: null,
};

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CAT_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_CAT_SUCCESS":
      return { ...state, loading: false, categories: action.payload };
    case "CAT_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

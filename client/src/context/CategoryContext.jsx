import { createContext, useContext, useEffect, useReducer } from "react";
import { getCategory } from "../api/api";
import { categoryReducer, catInitialState } from "../reducer/CategoryReducer";

const CatContext = createContext();

export const CatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, catInitialState);

  useEffect(() => {
    const fetchCat = async () => {
      dispatch({ type: "FETCH_CAT_REQUEST" });
      try {
        const data = await getCategory();
        dispatch({ type: "FETCH_CAT_SUCCESS", payload: data.categories });
      } catch (error) {
        dispatch({ type: "CAT_ERROR", payload: error.message });
      }
    };
    fetchCat();
  }, []);

  return (
    <CatContext.Provider value={{ state }}>{children}</CatContext.Provider>
  );
};
export const useCategories = () => useContext(CatContext);

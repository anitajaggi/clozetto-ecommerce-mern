import { createContext, useReducer, useContext, useEffect } from "react";
import { getUser } from "../api/api";

// Initial auth state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

// Reducer function
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { isAuthenticated: true, user: action.payload, loading: false };
    case "LOGOUT":
      return { isAuthenticated: false, user: null, loading: false };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (data?.user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        } else {
          dispatch({ type: "STOP_LOADING" });
        }
      } catch (err) {
        dispatch({ type: "STOP_LOADING" });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

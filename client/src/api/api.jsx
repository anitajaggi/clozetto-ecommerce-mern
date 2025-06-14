import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCategory = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const authLogin = async (loginData) => {
  const response = await api.post("/user/login", loginData);
  return response;
};

export const authLogout = async () => {
  const response = await api.get("/user/logout");
  return response;
};

export const getUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const authRegister = async (registerData) => {
  const response = await api.post("/user/register", registerData);
  return response.data;
};

export const addToCartApi = async (productToAdd) => {
  const response = await api.post("/cart", productToAdd);
  return response.data;
};

export const getCartApi = async () => {
  const response = await api.get("/cart");
  return response.data.cart;
};

export const removeFromCartApi = async ({ productId, color, size }) => {
  const response = await api.delete("/cart", {
    data: { productId, color, size },
  });
  return response.data;
};

export const updateQuantityApi = async ({
  productId,
  color,
  size,
  quantity,
}) => {
  const response = await api.put("/cart", {
    productId,
    color,
    size,
    quantity,
  });
  return response.data;
};

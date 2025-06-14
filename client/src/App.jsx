import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { AppLayout } from "./components/Layout/AppLayout";
import { ProProvider } from "./context/ProductContext";
import { CatProvider } from "./context/categoryContext";
import { ProductDetails } from "./Pages/ProductDetails";
import { ToastContainer } from "react-toastify";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Privacy } from "./Pages/Privacy";
import { Terms } from "./Pages/Terms";
import { Cart } from "./Pages/Cart";
import { ProductsPage } from "./Pages/Products";
import { Login } from "./components/Ui/Login";
import { Register } from "./components/Ui/Register";
import { Dashboard } from "./components/Ui/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import { NotFound } from "./components/Ui/NotFound";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
      { path: "products", element: <ProductsPage /> },
      { path: "productdetails/:productId", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Protected Routes
      {
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "cart", element: <Cart /> },
        ],
      },
      // This must be LAST
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <CatProvider>
          <ProProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </ProProvider>
        </CatProvider>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      ></ToastContainer>
    </>
  );
}

export default App;

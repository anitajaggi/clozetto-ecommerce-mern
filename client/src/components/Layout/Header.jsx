import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { useCategories } from "../../context/categoryContext";
import { useAuth } from "../../context/AuthContext";
import { authLogout } from "../../api/api";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { state } = useCategories();
  const { categories } = state;

  const { state: authState, dispatch } = useAuth();
  const { loading, user } = authState;

  const { state: cartState } = useCart();
  const { cartItems } = cartState;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authLogout({ credentials: "include" });
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed.");
      console.error("Logout failed:", error);
    }
  };

  const headLink = [
    { path: "/", menu: "Home" },
    // { path: "/categories", menu: "Shop By Categories" },
    { path: "/products", menu: "Products" },
    { path: "/about", menu: "About Us" },
    { path: "/contact", menu: "Contact Us" },
  ];

  return (
    <header className="relative">
      <div className="container flex justify-between items-center py-4">
        <div className="logo">
          <h1 className="text-3xl font-extrabold">Clozetto</h1>
        </div>

        <nav>
          <ul className="flex gap-8 relative">
            {headLink.map((link, i) => (
              <li
                key={i}
                className="relative"
                onMouseEnter={() =>
                  link.menu === "Shop By Categories" && setDropdownOpen(true)
                }
                onMouseLeave={() =>
                  link.menu === "Shop By Categories" && setDropdownOpen(false)
                }
              >
                <NavLink to={link.path}>{link.menu}</NavLink>
                {link.menu === "Shop By Categories" && dropdownOpen && (
                  <ul className="absolute left-0 w-48 bg-black shadow-lg rounded-md p-2 z-10">
                    {categories.map((cat, index) => (
                      <li
                        key={index}
                        className="py-1 px-3 hover:bg-gray-100 hover:text-black"
                      >
                        <NavLink to={`/category/${cat.slug}`}>
                          {cat.category}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="head-icons">
          <ul className="flex gap-4 items-center">
            {!loading && user ? (
              <>
                <li>
                  <p
                    className="text-sm text-black px-2 py-1 rounded-full"
                    style={{ backgroundColor: "#4ce90e", color: "#000" }}
                  >
                    Hii, {user?.username || "User"}
                  </p>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 bg-gray-900 px-2 cursor-pointer py-1 rounded-full"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              !loading && (
                <li className="icn">
                  <NavLink to="/login">
                    <FaUser />
                  </NavLink>
                </li>
              )
            )}
            <li className="icn">
              <NavLink to="/cart">
                <FaCartShopping />{" "}
                <span className="cartnumber">{cartItems.length}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

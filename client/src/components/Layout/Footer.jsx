import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaSquareFacebook,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const Footer = () => {
  const footLink = [
    { path: "/", menu: "Home" },
    // { path: "/categories", menu: "Shop By Categories" },
    { path: "/products", menu: "Products" },
    { path: "/about", menu: "About Us" },
    { path: "/contact", menu: "Contact Us" },
    { path: "/privacy", menu: "Privacy Policy" },
    { path: "/terms", menu: "Terms & Conditions" },
  ];
  return (
    <footer>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <div className="logo">
            <h1
              className="text-5xl font-extrabold"
              style={{ marginBottom: "1rem" }}
            >
              Clozetto
            </h1>
          </div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p>
            We provide the best fashion solutions to make you stand out in the
            crowd. Stay stylish, stay confident.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {footLink.map((link, i) => {
              return (
                <li key={i}>
                  <NavLink to={link.path}>{link.menu}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Social Media Section */}

        <div>
          <div className="mb-3">
            <h3 className="text-xl font-bold mb-4">Contact Info.</h3>
            <div>
              <p>Email: care@clozetto.shop</p>
              {/* <p>Phone: +91 888 777 6666</p> */}
              <p>Location: clozetto location xyz</p>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-5">
            <NavLink to={"facboosk.com"}>
              <FaSquareFacebook className="icn text-2xl" />
            </NavLink>
            <NavLink to={"facbosok.com"}>
              <FaXTwitter className="icn text-2xl" />
            </NavLink>
            <NavLink to={"facsbook.com"}>
              <FaInstagram className="icn text-2xl" />
            </NavLink>
            <NavLink to={"facbosok.com"}>
              <FaYoutube className="icn text-2xl" />
            </NavLink>
          </div>
        </div>
      </div>

      <div
        className="container mx-auto text-center"
        style={{ marginTop: "1rem" }}
      >
        © 2025 Your Brand. All rights reserved.
      </div>
    </footer>
  );
};

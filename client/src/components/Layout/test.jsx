// Header;
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FaCartShopping, FaHeart, FaUser } from "react-icons/fa6";

// export const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);

//   const headLink = [
//     { path: "/", menu: "Home" },
//     { path: "/categories", menu: "Shop By Categories" },
//     { path: "/products", menu: "Products" },
//     { path: "/about", menu: "About Us" },
//     { path: "/contact", menu: "Contact Us" },
//   ];

//   const categories = {
//     "Unstitched Suits": ["All", "Kosa", "Madhubani", "Hand-Block", "Banaras"],
//     Saree: ["All", "Kosa Weave", "Block Print", "Banarasi"],
//     Suits: ["All", "Kosa", "Madhubani", "Hand-Block", "Banaras"],
//     jeans: ["All", "Kosa", "Madhubani", "Hand-Block", "Banaras"],
//     tops: ["All", "Kosa Weave", "Block Print", "Banarasi"],
//     "By Craft": [
//       "All",
//       "Kosa Weaving",
//       "Madhubani Paint",
//       "Hand-Block Print",
//       "Banarasi Weave",
//     ],
//   };

//   return (
//     <header className="relative">
//       <div className="container flex justify-between items-center py-4">
//         <div className="logo">
//           <h1 className="text-3xl font-extrabold">Clozetto</h1>
//         </div>
//         <nav>
//           <ul className="flex gap-8">
//             {headLink.map((link, i) => {
//               if (link.menu === "Shop By Categories") {
//                 return (
//                   <li
//                     key={i}
//                     onMouseEnter={() => {
//                       setIsDropdownOpen(true);
//                       setIsHoveringDropdown(true);
//                     }}
//                     onMouseLeave={() => {
//                       if (!isHoveringDropdown) {
//                         setIsDropdownOpen(false);
//                         // setIsHoveringDropdown(false);
//                       }
//                     }}
//                   >
//                     <NavLink to={link.path}>{link.menu}</NavLink>
//                     {isDropdownOpen && (
//                       <div
//                         className="catdrop absolute top-full right-0 mt-2 w-[100vw] bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 md:grid-cols-5 justify-between"
//                         onMouseEnter={() => setIsHoveringDropdown(true)}
//                         onMouseLeave={() => {
//                           setIsHoveringDropdown(false);
//                           setIsDropdownOpen(false);
//                         }}
//                       >
//                         {Object.keys(categories).map((category, index) => (
//                           <div key={index}>
//                             <h1 className="font-bold text-lg mb-2 underline underline-offset-4">
//                               {category}
//                             </h1>
//                             <ul>
//                               {categories[category].map((sub, subIndex) => (
//                                 <li
//                                   key={subIndex}
//                                   className="hover:bg-gray-100 p-1 rounded text-gray-700"
//                                 >
//                                   <NavLink
//                                     to={`/categories/${category
//                                       .toLowerCase()
//                                       .replace(/ /g, "-")}/${sub
//                                       .toLowerCase()
//                                       .replace(/ /g, "-")}`}
//                                   >
//                                     {sub}
//                                   </NavLink>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </li>
//                 );
//               }
//               return (
//                 <li key={i}>
//                   <NavLink to={link.path}>{link.menu}</NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>
//         <div className="head-icons">
//           <ul className="flex gap-4">
//             <li>
//               <NavLink to={"google.com"}>
//                 <FaUser />
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to={"google.com"}>
//                 <FaHeart />
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to={"google.com"}>
//                 <FaCartShopping />
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

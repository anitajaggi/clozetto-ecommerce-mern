import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export const ProductCard = ({ product }) => {
  const { _id, name, price, mrp, images } = product;

  return (
    <div className="card border border-black shadow p-2">
      <NavLink to={`/productdetails/${_id}`}>
        <div className="img mb-3">
          <img
            src={
              images?.[0] ||
              "https://xelltechnology.com/wp-content/uploads/2022/04/dummy6.jpg"
            }
            alt={name}
            className="w-full h-auto"
          />
        </div>
      </NavLink>

      <div className="details">
        <NavLink to={`/productdetails/${_id}`}>
          <h3>{name}</h3>
        </NavLink>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">₹{price}</span>
            <del className="text-gray-400 text-sm">₹{mrp}</del>
          </div>
        </div>

        <div className="add-cart mt-3">
          <NavLink to={`/productdetails/${_id}`}>
            <button className="btn-cart flex justify-center items-center gap-2">
              Explore Details <FaArrowRight />
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

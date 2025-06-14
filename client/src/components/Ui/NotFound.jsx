// Pages/NotFound.jsx
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="text-white bg-black px-4 py-2 rounded hover:bg-gray-800"
      >
        Go back home
      </Link>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LiaOpencart } from "react-icons/lia";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth
import { toast } from "react-toastify";
import { addToCartApi } from "../api/api";

export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { singleProduct } = useProducts();
  const { dispatch } = useCart();
  const { state: authState } = useAuth(); // ✅ Access Auth State

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const product = singleProduct(productId);

  useEffect(() => {
    if (product) {
      if (product.images?.length > 0) {
        setMainImage(product.images[0]);
      }
      if (product.sizes?.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors?.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!authState.isAuthenticated) {
      toast.info("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    const productToAdd = {
      productId: product._id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: mainImage,
      quantity: 1,
    };

    try {
      const res = await addToCartApi(productToAdd);
      dispatch({ type: "ADD_TO_CART", payload: productToAdd });
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container pt-15">
      <div className="p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            {mainImage && (
              <img
                src={mainImage}
                alt={product.name}
                className="w-96 h-96 border border-gray-300 productdetailimage rounded-lg mb-4"
              />
            )}
            <div className="flex gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="w-20 h-20 rounded-lg productdetailimage cursor-pointer border border-gray-300"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Category: {product.category}
              </p>

              <div className="flex items-center mb-6">
                <div className="text-yellow-500 text-xl mr-2">
                  {"⭐".repeat(Math.floor(product.rating || 0))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews || 0} reviews)
                </span>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              <div className="flex items-center text-3xl font-bold mb-6">
                <span className="text-green-900 mr-4">₹{product.price}</span>
                <span className="line-through text-sm text-red-900">
                  ₹{product.mrp}
                </span>
              </div>

              {product.colors?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Available Colors:
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`w-5 h-5 border rounded-full cursor-pointer ${
                          selectedColor === color ? "ring-2 ring-green-700" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Available Sizes:
                  </h3>
                  <div className="flex gap-3 text-sm">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-2 border rounded cursor-pointer ${
                          selectedSize === size
                            ? "bg-green-700 text-white"
                            : "text-gray-700 border-gray-300"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center mt-6 gap-4">
                <button
                  className="w-full py-3 flex justify-center items-center gap-2 btn-primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                  <LiaOpencart className="text-xl" />
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Filters } from "../components/Ui/Filters";
import { ProductCard } from "../components/Ui/ProductCard";
import { useProducts } from "../context/ProductContext";

export const ProductsPage = () => {
  const { filteredProducts } = useProducts();

  return (
    <div className="container pt-15 m-auto">
      <div className="py-5 my-5 text-center">
        <h1 className="heading text-5xl">Explore Products</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 relative z-0">
        <Filters />
        <div className="lg:w-3/4 bg-gray-100 px-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))
            ) : (
              <div className="flex justify-center items-center h-96 col-span-full">
                <h1 className="text-3xl font-bold text-gray-500">
                  No Products Found
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

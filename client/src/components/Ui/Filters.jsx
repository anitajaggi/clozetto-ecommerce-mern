import { useProducts } from "../../context/ProductContext";

export const Filters = () => {
  const {
    filters,
    updateFilter,
    clearFilter,
    filterOptions: { allCategories, allColors, allSizes, maxPrice },
    filteredProducts,
  } = useProducts();

  return (
    <div className="w-auto lg:w-1/4 bg-gray-300 h-fit  sm:relative sm:top-0 sticky top-20 p-2">
      <div className="bg-white border-b flex justify-between items-center px-1 mb-3">
        <h2 className="text-xl font-bold">Filters</h2>
        <p className="text-sm text-green-700">
          {filteredProducts.length} product
          {filteredProducts.length > 1 ? "s" : ""}
        </p>
      </div>

      <h2 className="font-bold">Categories</h2>
      <select
        className="w-full p-2 mb-3 bg-gray-100"
        value={filters.category}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="">All</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <h2 className="font-bold">Colors</h2>
      <select
        className="w-full p-2 bg-gray-100 mb-3"
        value={filters.color}
        onChange={(e) => updateFilter("color", e.target.value)}
      >
        <option value="">All</option>
        {allColors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      <h2 className="font-bold">Sizes</h2>
      <select
        className="w-full p-2 bg-gray-100 mb-3"
        value={filters.size}
        onChange={(e) => updateFilter("size", e.target.value)}
      >
        <option value="">All</option>
        {allSizes.map((size) => (
          <option key={size} value={size}>
            {size.toUpperCase()}
          </option>
        ))}
      </select>

      <h2 className="font-bold">Sort</h2>
      <select
        className="w-full p-2 bg-gray-100 mb-3"
        value={filters.sort}
        onChange={(e) => updateFilter("sort", e.target.value)}
      >
        <option value="">Default</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>

      <div className="flex justify-between items-center">
        <h2 className="font-bold">Price Range</h2>
        <p className="text-right">₹{filters.price}</p>
      </div>
      <input
        type="range"
        min="0"
        max={maxPrice}
        value={filters.price}
        onChange={(e) => updateFilter("price", e.target.value)}
        className="w-full mb-4"
      />
      <button
        onClick={clearFilter}
        className="w-full mt-4 cursor-pointer btn-primary"
      >
        Clear All Filters
      </button>
    </div>
  );
};

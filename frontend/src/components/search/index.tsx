"use client";
import { useProduct } from "@/provider/productProvider";
import { MdSearch } from "react-icons/md";

const Search = () => {
  const { products, setFilteredProducts, searchProduct, setSearchProduct } =
    useProduct();

  const handleSearch = () => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase())
      )
    );
  };

  return (
    <div className="flex gap-2 items-center bg-white rounded-md px-1">
      <input
        onChange={(e) => setSearchProduct(e.target.value)}
        value={searchProduct}
        className="w-full h-[30px]  rounded-md text-purple-800 pl-4"
      />
      <span onClick={handleSearch} className="cursor-pointer">
        <MdSearch />
      </span>
    </div>
  );
};
export default Search;

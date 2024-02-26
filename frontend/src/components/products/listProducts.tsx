"use client";

import { useProduct } from "@/provider/productProvider";
import { CardProduct } from "./cardProduct";
import { usePathname } from "next/navigation";
import { MdSearchOff } from "react-icons/md";
import Search from "../search";
import { Suspense } from "react";
import Loading from "@/app/products/loading";

export const ListProducts = () => {
  const { products, filteredProducts, setSearchProduct, setFilteredProducts } =
    useProduct();
  const path = usePathname();

  return (
    <div>
      <div className="my-4 flex justify-between">
        {path == "/products/myProducts" ? (
          <h1>Meus Produtos</h1>
        ) : (
          <h1>Todos os Produtos</h1>
        )}
        <Search />
      </div>
      {filteredProducts.length > 0 && (
        <span
          onClick={() => {
            setSearchProduct("");
            setFilteredProducts([]);
          }}
          className="cursor-pointer flex items-center gap-2"
        >
          Limpar pesquisa <MdSearchOff />
        </span>
      )}
      <Suspense fallback={<Loading />}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            : products &&
              products.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))}
        </ul>
      </Suspense>
    </div>
  );
};

"use client";

import { useProduct } from "@/provider/productProvider";
import { CardProduct } from "./cardProduct";
import { usePathname } from "next/navigation";
import { MdSearchOff } from "react-icons/md";
import Search from "../search";
import { Suspense } from "react";
import Loading from "@/app/products/loading";
import { useUser } from "@/provider/userProvider";

export const ListProducts = () => {
  const {
    products,
    filteredProducts,
    setSearchProduct,
    setFilteredProducts,
    myProducts,
  } = useProduct();

  const path = usePathname();

  return (
    <div>
      <div className="my-4 flex justify-between">
        {path == "/products/myProducts" ? (
          <h1 className="text-3xl font-bold">Meus Produtos</h1>
        ) : (
          <h1 className="text-3xl font-bold">Todos os Produtos</h1>
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
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-4">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            : path == "/products/myProducts"
            ? myProducts &&
              myProducts.map((product) => (
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

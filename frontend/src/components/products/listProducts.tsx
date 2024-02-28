"use client";

import { useProduct } from "@/provider/productProvider";
import { CardProduct } from "./cardProduct";
import { usePathname } from "next/navigation";
import { MdSearchOff } from "react-icons/md";
import Search from "../search";
import { Suspense, useEffect } from "react";
import Loading from "@/app/products/loading";
import Cookies from "js-cookie";
import { api } from "@/service/api";
import { useUser } from "@/provider/userProvider";

export const ListProducts = () => {
  const {
    products,
    filteredProducts,
    setSearchProduct,
    setFilteredProducts,
    myProducts,
    getAllProducts,
  } = useProduct();
  const { getUserData } = useUser();

  const path = usePathname();

  useEffect(() => {
    const token = Cookies.get("user.token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => await getUserData(token))();
      (async () => await getAllProducts())();
    }
  }, []);

  return (
    <div>
      <div className="my-4 flex flex-col md:flex-row md:justify-between gap-4">
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
          className="cursor-pointer hover:text-purple-700 hover:underline hover:underline-offset-4 my-4 flex gap-2 items-center"
        >
          Limpar pesquisa <MdSearchOff />
        </span>
      )}
      <ul className="w-full flex flex-wrap gap-4 mt-4">
        <Suspense fallback={<Loading />}>
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            : path == "/products/myProducts"
            ? myProducts.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))
            : products?.map((product) => (
                <CardProduct product={product} key={product.id} />
              ))}
        </Suspense>
      </ul>
    </div>
  );
};

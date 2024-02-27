"use client";
import { ListProducts } from "@/components/products/listProducts";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useProduct } from "@/provider/productProvider";
import { api } from "@/service/api";

const ProductsPage = () => {
  const { getAllProducts } = useProduct();

  useEffect(() => {
    const token = Cookies.get("user.token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => await getAllProducts())();
    }
  }, []);

  return (
    <section className="w-full max-w-[1200px] flex min-h-screen flex-col">
      <ListProducts />
    </section>
  );
};

export default ProductsPage;

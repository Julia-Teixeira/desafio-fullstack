"use client";
import { ListProducts } from "@/components/products/listProducts";
import { useEffect } from "react";
import { useProduct } from "@/provider/productProvider";
import { useUser } from "@/provider/userProvider";
import Cookies from "js-cookie";
import { api } from "@/service/api";

const MyProductsPage = () => {
  const { setProducts, products } = useProduct();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    setProducts(products.filter((product) => product.userId === user!.id));
  }, []);

  return (
    <section className="w-full max-w-[1200px] flex min-h-screen flex-col">
      <ListProducts />
    </section>
  );
};

export default MyProductsPage;

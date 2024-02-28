"use client";
import { ListProducts } from "@/components/products/listProducts";
import { useEffect } from "react";
import { useProduct } from "@/provider/productProvider";
import { useUser } from "@/provider/userProvider";
const MyProductsPage = () => {
  return (
    <section className="w-full max-w-[1200px] flex min-h-screen flex-col">
      <ListProducts />
    </section>
  );
};

export default MyProductsPage;

"use client";
import { ListProducts } from "@/components/products/listProducts";
import { useEffect } from "react";
import { useProduct } from "@/provider/productProvider";

const MyProductsPage = () => {
  const { setProducts, products } = useProduct();

  useEffect(() => {
    setProducts(products.filter((product) => product.userId === 1));
  }, []);

  return (
    <section className="w-full flex min-h-screen flex-col">
      <ListProducts />
    </section>
  );
};

export default MyProductsPage;

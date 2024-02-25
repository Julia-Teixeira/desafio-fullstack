"use client";

import { useProduct } from "@/provider/productProvider";
import { CardProduct } from "./cardProduct";

export const ListProducts = () => {
  const { products } = useProduct();

  return (
    <div>
      <h1>Produtos</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products &&
          products.map((product) => (
            <CardProduct product={product} key={product.id} />
          ))}
      </ul>
    </div>
  );
};

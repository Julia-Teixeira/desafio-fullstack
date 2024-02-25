import { TReturnProduct } from "@/provider/productProvider/interfaces";
import Link from "next/link";

interface TCardProduct {
  product: TReturnProduct;
}

export const CardProduct = ({ product }: TCardProduct) => {
  return (
    <li className="flex flex-col w-[200px] bg-gray-100 p-4 text-black rounded">
      <h1>{product.name}</h1>
      <p className="text-sm">Model: {product.model}</p>
      <p className="text-sm">Marca: {product.brand}</p>

      <Link
        href={`/editProduct/${product.id}`}
        key={product.id}
        className={`pointer`}
      >
        <p>Mais detalhes</p>
      </Link>
    </li>
  );
};

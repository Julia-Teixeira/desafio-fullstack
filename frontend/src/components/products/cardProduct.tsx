import { TReturnProduct } from "@/provider/productProvider/interfaces";
import Image from "next/image";
import Link from "next/link";

interface TCardProduct {
  product: TReturnProduct;
}

export const CardProduct = ({ product }: TCardProduct) => {
  return (
    <li className="flex flex-col w-[290px] bg-gray-100 p-4 text-black rounded items-center">
      <Image
        src={product.productInfos[0].img!}
        width={200}
        height={200}
        alt={product.name}
        className="mb-2 w-[200px] h-[200px]"
      />
      <h1>
        {product.name}{" "}
        <span className="capitalize">{product.productInfos[0].color}</span>
      </h1>
      <p>
        {Number(product.productInfos[0].price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <Link
        href={`/products/${product.id}`}
        key={product.id}
        className={`pointer`}
      >
        <p>Mais detalhes</p>
      </Link>
    </li>
  );
};

"use client";
import { useProduct } from "@/provider/productProvider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ProductPage = () => {
  const params = useParams();
  const { getProduct, product, deleteProduct } = useProduct();

  useEffect(() => {
    (async () => await getProduct(Number(params.id)))();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <Link href="/products">Voltar</Link>
      {product && (
        <section className="flex flex-col w-[200px] bg-gray-100 p-4 text-black rounded">
          <h1>{product.name}</h1>
          <p className="text-sm">Model: {product.model}</p>
          <p className="text-sm">Marca: {product.brand}</p>
          <ul className="flex flex-col gap-2 mb-4">
            {product.productInfos?.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-sm">Cor: {item.color}</span>
                <span className="text-sm">Preço: {item.price}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/products/${product.id}/edit`}
            key={product.id}
            className={`pointer`}
          >
            <p>Editar Produto</p>
          </Link>

          <button onClick={() => deleteProduct(Number(product.id))}>
            Deletar produto
          </button>
        </section>
      )}
    </div>
  );
};

export default ProductPage;

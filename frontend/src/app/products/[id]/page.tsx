"use client";
import { useProduct } from "@/provider/productProvider";
import { useUser } from "@/provider/userProvider";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ProductPage = () => {
  const params = useParams();
  const { getProduct, product, deleteProduct } = useProduct();
  const { user, productOwner } = useUser();
  const createdAt = new Date(product?.createdAt);

  useEffect(() => {
    (async () => await getProduct(Number(params.id)))();
  }, []);

  return (
    <div className="flex w-full max-w-[1200px] min-h-screen flex-col py-4">
      {product && (
        <section className="flex flex-col text-black">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-gray-500">
              Adicionando em: {createdAt.toDateString()} pelo usuário{" "}
              {productOwner && productOwner.name}
            </span>
            <div className="flex gap-2 justify-between items-center">
              <div className="flex flex-col gap-4">
                <h1>Nome: {product.name}</h1>
                <div>
                  <h3 className="text-sm">Model: {product.model}</h3>
                  <h3 className="text-sm">Marca: {product.brand}</h3>
                </div>
              </div>

              {user && user.id === product.userId && (
                <div className="flex gap-4">
                  <Link
                    href={`/products/${product.id}/edit`}
                    key={product.id}
                    className={`pointer`}
                  >
                    Editar Produto
                  </Link>

                  <button onClick={() => deleteProduct(Number(product.id))}>
                    Deletar produto
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <ul className="flex flex-wrap gap-10 mb-4">
                {product.productInfos?.map((item, index) => (
                  <li key={index} className="flex flex-col gap-3">
                    <Image
                      src={product.productInfos && item.img}
                      width={250}
                      height={300}
                      alt={product.name}
                    />
                    <span className="text-sm">
                      Cor: <span className="capitalize">{item.color}</span>
                    </span>
                    <span className="text-sm">
                      Preço: {""}
                      {Number(item.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;

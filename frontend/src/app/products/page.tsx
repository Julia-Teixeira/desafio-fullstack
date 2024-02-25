"use client";
import { ListProducts } from "@/components/products/listProducts";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useProduct } from "@/provider/productProvider";
import { api } from "@/service/api";

const ProductsPage = () => {
  const { getAllProducts } = useProduct();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("user.token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => await getAllProducts())();
    }
  }, []);

  const logOut = () => {
    Cookies.remove("user.token");
    toast.success("Deslogado com sucesso");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };
  return (
    <main className="flex min-h-screen flex-col p-12">
      <button onClick={() => logOut()}>Sair</button>
      <Link href="/products/addProduct">Adicionar Produto</Link>
      <ListProducts />
    </main>
  );
};

export default ProductsPage;

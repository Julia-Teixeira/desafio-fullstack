"use client";

import { useAuth } from "@/provider/authProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const { logOut } = useAuth();

  return (
    <div className="flex flex-col items-center  px-8 md:px-24">
      <header className="w-full flex justify-between my-6 flex-wrap text-purple-100">
        <Link href="/products" className="pointer">
          MobleMinds
        </Link>

        <nav className="flex gap-4 text-sm">
          {path == "/products/myProducts" ? (
            <Link
              href="/products"
              className="hover:text-purple-200 hover:underline hover:underline-offset-4"
            >
              Todos os Produtos
            </Link>
          ) : (
            <Link
              href="/products/myProducts"
              className="hover:text-purple-200 hover:underline hover:underline-offset-4"
            >
              Meus Produtos
            </Link>
          )}
          <Link
            href="/products/addProduct"
            className="hover:text-purple-200 hover:underline hover:underline-offset-4"
          >
            Adicionar Produto
          </Link>
          <Link
            href="/products/addProduct"
            className="hover:text-purple-200 hover:underline hover:underline-offset-4"
          >
            Perfil
          </Link>

          <Link href={"/"} onClick={() => logOut()}>
            Sair
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;

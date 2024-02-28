"use client";

import { useUser } from "@/provider/userProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();
  const { logOut } = useUser();

  return (
    <div className="px-4 md:px-24 xl:px-0 flex max-w-[1200px] flex-col items-center mx-auto">
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
            href="/me"
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

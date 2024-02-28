"use client";
import Header from "@/components/header";
import { Suspense, useEffect } from "react";
import Loading from "../loading";
import EditUserForm from "@/components/forms/editUserForm";
import { useUser } from "@/provider/userProvider";
import { useProduct } from "@/provider/productProvider";
import Button from "@/components/button";
import Cookies from "js-cookie";

const Perfil = () => {
  const { user, deleteUser, getUserData, setLoading, loading } = useUser();
  const { myProducts } = useProduct();
  const updatedAt = new Date(user?.updatedAt!);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getUserData(Cookies.get("user.token")!);
    })();
    setLoading(false);
  }, []);

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center  px-8 md:px-24">
        {loading ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <div className="max-w-[420px] w-full">
              <h1 className="text-3xl font-bold my-4">Perfil</h1>
              <EditUserForm />
              <h3 className="text-2xl font-bold my-4">Detalhes:</h3>
              <h4 className="text-xl font-semibold my-4">
                Produtos cadastrados: {myProducts?.length}
              </h4>
              <h4 className="text-xl font-semibold my-4">
                Ultima atualização: {updatedAt.toLocaleDateString("pt-BR")}
              </h4>
            </div>
            <div className="w-full flex items-end justify-end">
              <div className=" w-[50%]">
                <Button
                  type="button"
                  color={`bg-purple-500 text-gray-100 hover:bg-purple-600 
      transition-all ease-in-out duration-300`}
                  onClick={() => deleteUser()}
                >
                  Excluir conta?
                </Button>
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </main>
  );
};

export default Perfil;

"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/service/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserContextValues, TUser, TEditUser } from "./interface";
import Cookies from "js-cookie";

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

export const useUser = () => {
  const userContext = useContext(UserContext);

  return userContext;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [productOwner, setProductOwner] = useState<TUser | null>(null);

  const getUserData = async (token: string) => {
    setLoading(true);
    api
      .get("users/", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserById = async (id: number) => {
    setLoading(true);
    api
      .get(`users/${id}`)
      .then((res) => {
        setProductOwner(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = () => {
    Cookies.remove("user.token");
    toast.success("Deslogado com sucesso");
    setTimeout(() => {
      setUser(null);
      Cookies.remove("user.token");
      router.push("/");
    }, 1000);
  };

  const editUser = async (data: TEditUser) => {
    setLoading(true);
    api
      .patch(`users/${user?.id}`, data)
      .then((res) => {
        setUser(res.data);
        toast.success("Usuário editado com sucesso");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const editPassword = async (data: { password: string }) => {
    setLoading(true);
    api
      .patch(`users/${user?.id}`, data)
      .then((res) => toast.success("Senha editada com sucesso"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const deleteUser = async () => {
    setLoading(true);
    api
      .delete(`users/${user?.id}`)
      .then(() => {
        toast.success("Usuário excluido com sucesso");
        logOut();
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("user.token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => await getUserData(token))();
    } else {
      Cookies.remove("user.token");
      router.push("/");
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        logOut,
        getUserById,
        productOwner,
        setProductOwner,
        getUserData,
        editUser,
        deleteUser,
        editPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

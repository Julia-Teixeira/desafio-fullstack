"use client";
import { api } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AuthContextValues, LoginData, RegisterData } from "./interfaces";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("user.token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  const signIn = async (data: LoginData) => {
    setLoading(true);
    api
      .post("users/login", data)
      .then((res) => {
        toast.success("Login efetuado com sucesso!");
        api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
        Cookies.set("user.token", res.data.token);
        setTimeout(() => {
          router.push("/products");
        }, 2000);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    Cookies.remove("user.token");
    toast.success("Deslogado com sucesso");
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const signUp = async (data: RegisterData) => {
    setLoading(true);
    api
      .post("users/", data)
      .then(() => {
        toast.success("Cadastrado com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
        }
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider value={{ signIn, loading, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

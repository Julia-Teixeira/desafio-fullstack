"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/service/api";
import { AxiosError } from "axios";
import { ProductContextValues, TReturnProduct } from "./interfaces";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const ProductContext = createContext<ProductContextValues>(
  {} as ProductContextValues
);

export const useProduct = () => {
  const productContext = useContext(ProductContext);

  return productContext;
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<TReturnProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    setLoading(true);
    api
      .get("products")
      .then((res) => {
        setProducts(res.data);
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
    <ProductContext.Provider value={{ getAllProducts, products }}>
      {children}
    </ProductContext.Provider>
  );
};

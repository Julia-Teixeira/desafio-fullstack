"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/service/api";
import { AxiosError } from "axios";
import {
  ProductContextValues,
  TCreateProduct,
  TReturnProduct,
  TUpdateProduct,
} from "./interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [product, setProduct] = useState<TReturnProduct>({} as TReturnProduct);
  const [filteredProducts, setFilteredProducts] = useState<TReturnProduct[]>(
    []
  );
  const [searchProduct, setSearchProduct] = useState("");

  const router = useRouter();

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

  const createProduct = async (dataForm: TCreateProduct) => {
    setLoading(true);
    const details = dataForm.data.map((item) => {
      const newItem = {
        color: item.color,
        price: Number(item.price),
      };
      return newItem;
    });

    api
      .post("products", [{ ...dataForm, data: details }])
      .then(() => router.push("/products"))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const getProduct = async (id: number) => {
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    api
      .delete(`/products/${id}`)
      .then(() => {
        toast.success("Produto excluido com sucesso");
        router.push("/products");
      })
      .finally(() => setLoading(false));
  };

  const editProduct = async (dataForm: TUpdateProduct, id: number) => {
    const details = dataForm.productInfos.map((item) => {
      const newItem = {
        color: item.color,
        price: Number(item.price),
      };
      return newItem;
    });
    console.log(dataForm);
    api
      .patch(`products/${id}`, { ...dataForm, productInfos: details })
      .then(() => {
        toast.success("Produto editado com sucesso");
        router.push("/products");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const deleteColor = async (id: number) => {
    api
      .delete(`products/productInfos/${id}`)
      .then(() => {
        toast.success("Cor excluida com sucesso");
      })
      .finally(() => setLoading(false));
  };

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        products,
        setProducts,
        createProduct,
        loading,
        getProduct,
        product,
        setProduct,
        deleteProduct,
        editProduct,
        deleteColor,
        setFilteredProducts,
        filteredProducts,
        setSearchProduct,
        searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

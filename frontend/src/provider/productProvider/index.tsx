"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/service/api";
import { AxiosError } from "axios";
import {
  ProductContextValues,
  TCreateProduct,
  TReturnProduct,
  TUpdateProduct,
  TUpdateProductInfo,
} from "./interfaces";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUser } from "../userProvider";

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
  const { getUserById, user } = useUser();
  const [myProducts, setMyProducts] = useState<TReturnProduct[]>([]);

  const router = useRouter();

  const getAllProducts = async () => {
    setLoading(true);
    api
      .get("products")
      .then((res) => {
        setProducts(res.data);
        setMyProducts(
          res.data.filter(
            (product: TReturnProduct) => product.userId === user?.id
          )
        );
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
    const details = dataForm.data!.map((item) => {
      const newItem = {
        color: item.color,
        price: Number(item.price),
        img: item.img,
      };
      return newItem;
    });

    api
      .post("products", [{ ...dataForm, data: details }])
      .then((res) => {
        toast.success("Produto criado com sucesso");
        setProducts([...products, res.data]);
        setTimeout(() => {
          router.push("/products/myProducts");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
    setLoading(false);
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

    await getUserById(product.userId);
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    api
      .delete(`/products/${id}`)
      .then(() => {
        toast.success("Produto excluido com sucesso");
        setTimeout(() => {
          router.push("/products/myProducts");
        }, 1000);
      })
      .finally(() => setLoading(false));
  };

  const editProduct = async (dataForm: TUpdateProduct, id: number) => {
    setLoading(true);
    api
      .patch(`products/${id}`, { ...dataForm })
      .then((res) => {
        toast.success("Produto editado com sucesso");
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
        setProduct({
          ...product,
          productInfos: product.productInfos.filter((item) => item.id !== id),
        });
      })
      .finally(() => setLoading(false));
  };

  const updateColor = async (dataForm: TUpdateProductInfo, id: number) => {
    setLoading(true);
    api
      .patch(`products/productInfos/${id}`, { ...dataForm })
      .then((res) => {
        const newDataIndex = product.productInfos.findIndex(
          (item) => item.id === id
        );

        product.productInfos[newDataIndex] = {
          id: res.data.id,
          color: res.data.color,
          price: res.data.price,
          img: res.data.img,
        };
        toast.success("Detalhe editado com sucesso");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const createColor = async (dataForm: TUpdateProductInfo, id: number) => {
    setLoading(true);
    api
      .post(`products/${id}/productInfos`, {
        ...dataForm,
        price: Number(dataForm.price),
      })
      .then((res) => {
        toast.success("Cor criada com sucesso");
        setProduct({
          ...product,
          productInfos: [...product.productInfos, res.data],
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const token = Cookies.get("user.token");
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      (async () => await getAllProducts())();
    }
    setLoading(false);
  }, [products]);

  return (
    <ProductContext.Provider
      value={{
        getAllProducts,
        products,
        setProducts,
        createProduct,
        loading,
        setLoading,
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
        updateColor,
        createColor,
        myProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

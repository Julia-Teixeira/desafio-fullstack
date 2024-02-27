"use client";
import { Input } from "../inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TProductInfo,
  TUpdateProduct,
  updateProductSchema,
} from "@/provider/productProvider/interfaces";
import { Suspense, useEffect, useState } from "react";
import Button from "@/components/button";
import { useProduct } from "@/provider/productProvider";
import { useParams } from "next/navigation";
import { RiLoader4Line } from "react-icons/ri";
import FormEditDetails from "./formEditDetails";
import Loading from "@/app/loading";

export const EditProductForm = () => {
  const params = useParams();
  const { product, loading, editProduct, deleteColor, getProduct } =
    useProduct();
  const [countColor, setCountColor] = useState<number[]>(() => {
    return Array.from({ length: product.productInfos?.length }, (_, i) => i);
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TUpdateProduct>({
    resolver: zodResolver(updateProductSchema),
    values: {
      name: product.name,
      brand: product.brand,
      model: product.model,
    },
  });

  const addColor = () => {
    setCountColor([...countColor, countColor[countColor.length - 1] + 1]);
  };

  const removeColor = () => {
    setCountColor([...countColor.slice(0, -1)]);
  };

  const editProduto = (data: TUpdateProduct) => {
    const dataForm = data;
    const newData = { ...dataForm };
    editProduct(newData, product.id);
  };

  const deleteColorProduct = (id: number, index: number) => {
    deleteColor(id);
    setCountColor([...countColor.slice(0, -1)]);
  };

  useEffect(() => {
    (async () => {
      await getProduct(Number(params.id));
    })();
    setCountColor(() => {
      return Array.from({ length: product.productInfos?.length }, (_, i) => i);
    });
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <form
        onSubmit={handleSubmit(editProduto)}
        className="max-w-[420px] w-full"
      >
        <Input
          id="name"
          label="Nome"
          defaultValue={product?.name}
          type="text"
          register={register("name", { required: true })}
          error={errors?.name?.message}
        />
        <Input
          id="brand"
          label="Marca"
          defaultValue={product?.brand}
          type="text"
          register={register("brand", { required: true })}
          error={errors?.brand?.message}
        />

        <Input
          id="model"
          label="Modelo"
          defaultValue={product?.model}
          type="text"
          register={register("model", { required: true })}
          error={errors?.model?.message}
        />
        <div className="flex justify-end w-[150px]">
          <Button
            type="submit"
            color={`bg-purple-500 text-gray-100 hover:bg-purple-600 
            transition-all ease-in-out duration-300`}
          >
            {!loading ? (
              "Editar"
            ) : (
              <RiLoader4Line size={30} color="#fff" className="animate-spin" />
            )}
          </Button>
        </div>

        <div className="mt-4">
          <h2>Detalhes</h2>
          {countColor &&
            countColor.map((item, index) => (
              <div key={index}>
                <FormEditDetails
                  productId={product.id}
                  deleteColorProduct={deleteColorProduct}
                  index={index}
                  details={product.productInfos?.[index]}
                />
              </div>
            ))}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => addColor()}
              className="hover:text-purple-700 hover:underline hover:underline-offset-4 my-4 "
            >
              Adicionar mais uma cor?
            </button>
            {countColor?.length > product?.productInfos?.length && (
              <button
                type="button"
                onClick={() => removeColor()}
                className="hover:text-purple-700 hover:underline hover:underline-offset-4"
              >
                Remover uma cor?
              </button>
            )}
          </div>
        </div>
      </form>
    </Suspense>
  );
};

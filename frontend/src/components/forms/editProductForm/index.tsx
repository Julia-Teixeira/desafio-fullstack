"use client";
import { Input } from "../inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TCreateProduct,
  TProductInfo,
  TReturnProduct,
  createProductSchema,
} from "@/provider/productProvider/interfaces";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useProduct } from "@/provider/productProvider";
import { useParams } from "next/navigation";
import Image from "next/image";
import { RiLoader4Line } from "react-icons/ri";

export const EditProductForm = () => {
  const params = useParams();
  const { product, setProduct, loading, editProduct, deleteColor, getProduct } =
    useProduct();
  const [countColor, setCountColor] = useState<number[]>(() => {
    return Array.from({ length: product.productInfos?.length }, (_, i) => i);
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TCreateProduct>({
    resolver: zodResolver(createProductSchema),
  });

  useEffect(() => {
    (async () => {
      await getProduct(Number(params.id));

      setCountColor(() => {
        return Array.from(
          { length: product.productInfos?.length },
          (_, i) => i
        );
      });
    })();
    console.log(countColor);
  }, []);

  const addColor = () => {
    setCountColor([...countColor, countColor[countColor.length - 1] + 1]);
  };

  const removeColor = () => {
    setCountColor([...countColor.slice(0, -1)]);
  };

  const editProduto = (data: TCreateProduct) => {
    console.log(data);
    const dataForm = data;
    const details = countColor.map((item) => dataForm.data[item]);

    const newData = { ...dataForm, productInfos: details };

    editProduct(newData, product.id);
  };

  const deleteColorProduct = (id: number, index: number) => {
    deleteColor(id);
    const productInfos: TProductInfo[] = product.productInfos.filter(
      (item) => item.id !== id
    );
    setCountColor(countColor.filter((item) => item !== index));
    setProduct({ ...product, productInfos });
  };

  return (
    <form onSubmit={handleSubmit(editProduto)} className="max-w-[420px] w-full">
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
      <div>
        <h2>Detalhes</h2>
        {countColor.map((item, index) => (
          <div key={item}>
            <div className="flex gap-3 mt-4">
              <Image
                src={product.productInfos && product.productInfos[item].img}
                width={250}
                height={300}
                alt={product.name}
              />
              <div className="flex flex-col gap-2 justify-center">
                <Input
                  id="price"
                  label="Preço"
                  defaultValue={product?.productInfos?.[item]?.price}
                  type="text"
                  register={register(`data.${item}.price`, { required: true })}
                  error={errors?.data?.[item]?.price?.message}
                />
                <Input
                  id="color"
                  label="Cor"
                  defaultValue={product?.productInfos?.[item]?.color}
                  type="text"
                  register={register(`data.${item}.color`, { required: true })}
                  error={errors?.data?.[item]?.color?.message}
                />

                {product?.productInfos?.[item]?.color && (
                  <button
                    type="button"
                    onClick={() =>
                      deleteColorProduct(
                        product?.productInfos?.[item]?.id,
                        index
                      )
                    }
                    className="hover:text-purple-700 hover:underline hover:underline-offset-4"
                  >
                    Remover cor
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={() => addColor()} className="my-4 ">
          Adicionar mais uma cor?
        </button>
        {countColor.length > product?.productInfos?.length && (
          <button type="button" onClick={() => removeColor()} className="mb-4">
            Remover uma cor?
          </button>
        )}
      </div>
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
    </form>
  );
};

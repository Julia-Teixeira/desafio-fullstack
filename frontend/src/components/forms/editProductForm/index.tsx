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
    <form onSubmit={handleSubmit(editProduto)}>
      <h1>Adicionar Produto</h1>

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
        <h3>Detalhes</h3>
        {countColor.map((item, index) => (
          <div key={item}>
            <span>Detalhe {item + 1}</span>
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
                  deleteColorProduct(product?.productInfos?.[item]?.id, index)
                }
              >
                Remover cor
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={() => addColor()}>
          Adicionar mais uma cor?
        </button>
        {countColor.length > product?.productInfos?.length && (
          <button type="button" onClick={() => removeColor()}>
            Remover uma cor?
          </button>
        )}
      </div>
      <Button
        type="submit"
        text={loading ? "Cadastrando..." : "Editar"}
      ></Button>
    </form>
  );
};

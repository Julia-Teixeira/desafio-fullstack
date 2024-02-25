"use client";
import { Input } from "../inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TCreateProduct,
  createProductSchema,
} from "@/provider/productProvider/interfaces";
import { useState } from "react";
import Button from "@/components/button";
import { useProduct } from "@/provider/productProvider";

export const EditProductForm = () => {
  const { product, loading, editProduct } = useProduct();
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

  const addColor = () => {
    setCountColor([...countColor, countColor[countColor.length - 1] + 1]);
  };

  const removeColor = () => {
    setCountColor([...countColor.slice(0, -1)]);
  };

  const editProduto = (data: TCreateProduct) => {
    const dataForm = data;
    const details = countColor.map((item) => dataForm.data[item]);

    const newData = { ...dataForm, productInfos: details };

    editProduct(newData, product.id);
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
        disabled={loading}
      />
      <Input
        id="brand"
        label="Marca"
        defaultValue={product?.brand}
        type="text"
        disabled={loading}
        register={register("brand", { required: true })}
        error={errors?.brand?.message}
      />

      <Input
        id="model"
        label="Modelo"
        defaultValue={product?.model}
        type="text"
        disabled={loading}
        register={register("model", { required: true })}
        error={errors?.model?.message}
      />
      <div>
        <h3>Detalhes</h3>
        {countColor.map((item) => (
          <div key={item}>
            <span>Detalhe {item + 1}</span>
            <Input
              id="price"
              label="Preço"
              defaultValue={product?.productInfos?.[item]?.price}
              disabled={loading}
              type="text"
              register={register(`data.${item}.price`, { required: true })}
            />
            <Input
              id="color"
              label="Cor"
              defaultValue={product?.productInfos?.[item]?.color}
              disabled={loading}
              type="text"
              register={register(`data.${item}.color`, { required: true })}
            />

            <button>Remover cor</button>
          </div>
        ))}

        <button type="button" onClick={() => addColor()}>
          Adicionar mais uma cor?
        </button>
        {countColor.length > 1 && (
          <button type="button" onClick={() => removeColor()}>
            Remover uma cor?
          </button>
        )}
      </div>
      <Button
        type="submit"
        text={loading ? "Cadastrando..." : "Criar"}
      ></Button>
    </form>
  );
};

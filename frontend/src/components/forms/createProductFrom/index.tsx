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

export const CreateProductForm = () => {
  const [countColor, setCountColor] = useState<number[]>([0]);
  const { createProduct, loading } = useProduct();
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

  const createProduto = (data: TCreateProduct) => {
    const dataForm = data;
    const details = countColor.map((item) => dataForm.data[item]);
    dataForm.data = details;

    createProduct(dataForm);
  };

  return (
    <form onSubmit={handleSubmit(createProduto)}>
      <h1>Adicionar Produto</h1>

      <Input
        id="name"
        label="Nome"
        placeholder="Nome do Produto"
        type="text"
        register={register("name", { required: true })}
        error={errors?.name?.message}
        disabled={loading}
      />
      <Input
        id="brand"
        label="Marca"
        placeholder="Marca do Produto"
        type="text"
        disabled={loading}
        register={register("brand", { required: true })}
        error={errors?.brand?.message}
      />

      <Input
        id="model"
        label="Modelo"
        placeholder="Modelo do Produto"
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
              placeholder="1000.00"
              disabled={loading}
              type="text"
              register={register(`data.${item}.price`, { required: true })}
            />
            <Input
              id="color"
              label="Cor"
              placeholder="Cor do Produto"
              disabled={loading}
              type="text"
              register={register(`data.${item}.color`, { required: true })}
            />
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

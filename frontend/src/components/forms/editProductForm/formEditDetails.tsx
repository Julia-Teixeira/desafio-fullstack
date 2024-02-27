"use client";
import Image from "next/image";
import { Input } from "../inputs";
import {
  TProductInfo,
  TUpdateProductInfo,
  dataProduct,
} from "@/provider/productProvider/interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProduct } from "@/provider/productProvider";

interface IFormEditDetails {
  productId: number;
  details: TProductInfo;
  index: number;
  deleteColorProduct: any;
}

const FormEditDetails = ({
  productId,
  details,
  index,
  deleteColorProduct,
}: IFormEditDetails) => {
  const { updateColor, createColor } = useProduct();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TUpdateProductInfo>({
    resolver: zodResolver(dataProduct),
    values: {
      color: details && details.color,
      price: details && String(details.price),
      img: details && details.img,
    },
  });

  const submit = (data: TUpdateProductInfo) => {
    console.log(data);
    updateColor(data, details.id);
  };

  const addColor = (data: TUpdateProductInfo) => {
    const productInfos: TUpdateProductInfo = { ...data };
    createColor(productInfos, productId);
  };

  return (
    <div className="flex gap-3 mt-4">
      <Image
        src={
          details
            ? details.img
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        width={250}
        height={300}
        alt={details ? details.color : "no image"}
        className="w-[250px] h-[300px]"
      />
      <div className="flex flex-col gap-2 justify-center">
        <Input
          id="img"
          label="Imagem"
          type="text"
          register={register("img")}
          error={errors?.img?.message}
        />
        <Input
          id="price"
          label="Preço"
          type="text"
          register={register("price", { required: true })}
          error={errors?.price?.message}
        />
        <Input
          id="color"
          label="Cor"
          type="text"
          register={register(`color`, { required: true })}
          error={errors?.color?.message}
        />

        {details ? (
          <div className="flex gap-2">
            <button
              type="submit"
              className="hover:text-purple-700 hover:underline hover:underline-offset-4"
              onClick={handleSubmit(submit)}
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => deleteColorProduct(details.id, index)}
              className="hover:text-purple-700 hover:underline hover:underline-offset-4"
            >
              Remover cor
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit(addColor)}
            className="hover:text-purple-700 hover:underline hover:underline-offset-4"
          >
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
};

export default FormEditDetails;

"use client";
import { useUser } from "@/provider/userProvider";
import { Input } from "../inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TEditPassword,
  editPasswordSchema,
} from "@/provider/userProvider/interface";
import Button from "@/components/button";
import { RiLoader4Line } from "react-icons/ri";
import Link from "next/link";

const EditPasswordForm = () => {
  const { loading, editPassword } = useUser();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TEditPassword>({
    resolver: zodResolver(editPasswordSchema),
  });

  const submit = (data: TEditPassword) => {
    editPassword(data);
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        type="password"
        id="password"
        label="Password"
        placeholder="Nova senha"
        register={register("password")}
        error={errors.password?.message}
      />
      <Input
        type="password"
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirme nova senha"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <div className="w-full flex justify-between mt-4">
        <Link
          href="/me"
          className="hover:text-purple-700 hover:underline hover:underline-offset-4 my-4 "
        >
          Voltar
        </Link>
        <div className="w-[50%]">
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
      </div>
    </form>
  );
};

export default EditPasswordForm;

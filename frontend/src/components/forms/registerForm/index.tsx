"use client";
import { useAuth } from "@/provider/authProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../inputs";
import Button from "@/components/button";
import Link from "next/link";
import {
  RegisterData,
  registerSchema,
} from "@/provider/authProvider/interfaces";

const RegisterForm = () => {
  const { loading, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterData) => {
    signUp(data);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[380px] w-full flex flex-col"
      >
        <h1 className="text-gray-100 text-xl md:text-2xl text-center">
          Cadastre-se
        </h1>
        <Input
          type="text"
          id="name"
          label="Name"
          placeholder="Nome Sobrenome"
          register={register("name", { required: true })}
          error={errors?.name?.message}
        />
        <Input
          type="text"
          id="email"
          label="Email"
          placeholder="email@email.com"
          register={register("email", { required: true })}
          error={errors?.email?.message}
        />
        <Input
          type="password"
          id="password"
          label="Senha"
          placeholder="***********"
          register={register("password", { required: true })}
          error={errors?.password?.message}
        />

        <Button
          text={loading ? "Carregando..." : "Cadastrar"}
          type="submit"
          color="bg-gray-600 hover:bg-gray-700"
        />
      </form>

      <div className="w-[300px] h-[1px] bg-white mt-6" />
      <div className="max-w-[380px] w-full flex flex-col items-center px-4">
        <p className="text-purple800 text-xl md:text-2xl text-center my-6">
          Já possui uma <br />
          conta?
        </p>
        <Link href="/" className="w-full">
          <Button
            text="Voltar Para o Login"
            type="button"
            color="bg-gray-600 hover:bg-gray-700"
          />
        </Link>
      </div>
    </div>
  );
};
export default RegisterForm;

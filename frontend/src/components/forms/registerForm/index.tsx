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
import { RiLoader4Line } from "react-icons/ri";

const RegisterForm = () => {
  const { loading, signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterData) => {
    signUp(data);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center  bg-white p-9 rounded">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[380px] w-full flex flex-col"
      >
        <h1 className="text-gray-900 text-xl md:text-2xl text-center">
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
        <Input
          type="password"
          id="confimrPassword"
          label="Confirmar Senha"
          placeholder="***********"
          register={register("confirmPassword", { required: true })}
          error={errors?.confirmPassword?.message}
        />

        <div className="w-[200px] m-auto mt-4 mb-6">
          <Button
            type="submit"
            color={`bg-thistle text-gray-700 hover:bg-plum hover:text-gray-900 
          transition-all ease-in-out duration-300`}
          >
            {!loading ? (
              "Cadastrar"
            ) : (
              <RiLoader4Line size={30} color="#fff" className="animate-spin" />
            )}
          </Button>
        </div>
      </form>

      <div className="max-w-[380px] w-full flex flex-col items-center px-4">
        <Link
          href="/"
          className="text-purple-700 hover:text-purple-900 transition-all ease-in-out duration-300 border-b-2 border-purple-700"
        >
          Voltar Para o Login
        </Link>
      </div>
    </div>
  );
};
export default RegisterForm;

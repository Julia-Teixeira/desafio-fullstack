"use client";
import { Input } from "../inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/button";
import { LoginData, loginSchema } from "@/provider/authProvider/interfaces";
import { useAuth } from "@/provider/authProvider";

export const LoginForm = () => {
  const { loading, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    signIn(data);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[380px] w-full flex flex-col"
      >
        <h1 className="text-gray-100 text-xl md:text-2xl text-center">Login</h1>
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
          text={loading ? "Carregando..." : "Entrar"}
          type="submit"
          color="bg-gray-600 hover:bg-gray-700"
        />
      </form>

      <div className="w-[300px] h-[1px] bg-white mt-6" />
      <div className="max-w-[380px] w-full flex flex-col items-center px-4">
        <p className="text-purple800 text-xl md:text-2xl text-center my-6">
          Ainda não possui uma <br />
          conta?
        </p>
        <Link href="/register" className="w-full">
          <Button
            text="Criar sua conta"
            type="button"
            color="bg-gray-600 hover:bg-gray-700"
          />
        </Link>
      </div>
    </div>
  );
};

"use client";
import { Input } from "../inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Button from "@/components/button";
import { LoginData, loginSchema } from "@/provider/authProvider/interfaces";
import { useAuth } from "@/provider/authProvider";
import { RiLoader4Line } from "react-icons/ri";

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
    <div
      className={`max-w-[380px] w-full flex flex-col gap-2 items-center 
    justify-center bg-white p-4 sm:p-9 rounded`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col align-center mb-8"
      >
        <h1 className="text-gray-900 font-medium text-lg md:text-xl text-center mb-4">
          Faça seu login
        </h1>
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

        <div className="w-[200px] m-auto mt-4">
          <Button
            type="submit"
            color={`bg-thistle text-gray-700 hover:bg-plum hover:text-gray-900 
            transition-all ease-in-out duration-300`}
          >
            {!loading ? (
              "Entrar"
            ) : (
              <RiLoader4Line size={30} color="#fff" className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
      <div className=" flex flex-col items-center">
        <Link
          href="/register"
          className={`w-full text-purple-700 hover:text-purple-900 
          transition-all ease-in-out duration-300 border-b-2 border-purple-700`}
        >
          Ainda não possui conta?
        </Link>
      </div>
    </div>
  );
};

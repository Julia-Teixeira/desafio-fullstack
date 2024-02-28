"use client";
import { useForm } from "react-hook-form";
import { Input } from "../inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { TEditUser, editUserSchema } from "@/provider/userProvider/interface";
import { useUser } from "@/provider/userProvider";
import Button from "@/components/button";
import { RiLoader4Line } from "react-icons/ri";
import { useEffect } from "react";
import Link from "next/link";

const EditUserForm = () => {
  const { user, loading, setLoading, editUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TEditUser>({
    resolver: zodResolver(editUserSchema),
    values: {
      email: user?.email!,
      name: user?.name!,
    },
  });

  const submit = (data: TEditUser) => {
    editUser(data);
  };

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        id="name"
        label="Nome:"
        type="text"
        register={register("name")}
        error={errors.name?.message}
      />
      <Input
        id="email"
        label="Email:"
        type="email"
        register={register("email")}
        error={errors.email?.message}
      />
      <div className="w-full flex justify-evenly mt-4">
        <Link
          href="/me/changePassword"
          className="hover:text-purple-700 hover:underline hover:underline-offset-4 my-4 "
        >
          Editar Senha?
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

export default EditUserForm;

import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export const Input = ({
  id,
  label,
  error,
  register,
  type,
  ...rest
}: InputProps) => {
  return (
    <fieldset className="flex flex-col gap-1 mb-4">
      <label htmlFor={id} className="font-semibold text-base md:text-lg">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`w-full h-[50px] md:h-11 rounded-md text-purple800 pl-4
         text-gray-800`}
        {...rest}
        {...register}
      />
      {error && typeof error === "string" ? (
        <span className="text-red-500">{error}</span>
      ) : null}
    </fieldset>
  );
};

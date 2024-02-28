import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  type: "submit" | "button";
  children?: React.ReactNode;
  color?: string;
  func?: void;
}
export default function Button({
  text,
  type,
  children,
  color,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex items-center justify-evenly text-base md:text-lg
        lg:text-xl min-w-[100px] max-w-[420px] w-full h-[50px] ${color} rounded-md
      `}
      {...rest}
    >
      {children}
      {text}
    </button>
  );
}

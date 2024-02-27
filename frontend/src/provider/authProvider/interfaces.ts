import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Deve ser um e-mail"),
  password: z.string().nonempty("Senha é obrigatória"),
});

export const registerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Deve ser um e-mail"),
  password: z.string().nonempty("Senha é obrigatória"),
  confirmPassword: z.string().nonempty("Confirme sua senha"),
}).refine((data) => (data.password === data.confirmPassword ? true : false), {
  message: "As senhas devem ser iguais",
  path: ["confirmPassword"],
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;

export interface AuthContextValues{
  signIn: (data: LoginData) => void;
  loading: boolean;
  signUp: (data: RegisterData) => void;
}
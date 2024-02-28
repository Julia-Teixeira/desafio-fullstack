import { z } from "zod";

const userReturnSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const editPasswordSchema = z.object({
  password: z.string().nonempty("Senha é obrigatória"),
  confirmPassword: z.string().nonempty("Confirme sua senha"),
}).refine((data) => (data.password === data.confirmPassword ? true : false))


export const editUserSchema = userReturnSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type TEditUser = z.infer<typeof editUserSchema>;
export type TUser = z.infer<typeof userReturnSchema>;
export type TEditPassword = z.infer<typeof editPasswordSchema>;

export interface UserContextValues{
    user: TUser | null
    setUser: React.Dispatch<React.SetStateAction<TUser| null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    logOut: () => void;
    getUserById: (id: number) => Promise<void>;
    productOwner: TUser | null;
    setProductOwner: React.Dispatch<React.SetStateAction<TUser | null>>
    getUserData: (token: string) => Promise<void>;
    editUser: (data: TEditUser) => Promise<void>;
    deleteUser: () => Promise<void>;
    editPassword: (data: { password: string }) => Promise<void>;
  }
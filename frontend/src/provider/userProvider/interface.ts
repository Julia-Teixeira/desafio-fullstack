import { z } from "zod";

const userReturnSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type TUser = z.infer<typeof userReturnSchema>;

export interface UserContextValues{
    user: TUser | null
    setUser: React.Dispatch<React.SetStateAction<TUser| null>>;
    loading: boolean;
    logOut: () => void;
    getUserById: (id: number) => Promise<void>;
    productOwner: TUser | null;
    setProductOwner: React.Dispatch<React.SetStateAction<TUser | null>>
    getUserData: (token: string) => Promise<void>;
  }
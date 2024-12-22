import { z } from "zod";
import { Zod_FS_usersSchema } from "@/modules/server/firebase/schemas/users.schema";
import { API_RefreshTokens } from "./refreshTokens";

export const Zod_API_UsersSchema = Zod_FS_usersSchema.omit({
  password:true,
}).extend({
  id:z.string()
});

export type API_UsersSchema = z.infer<typeof Zod_API_UsersSchema>;

export type API_LoginResult = {
  user: API_UsersSchema;
  token: API_RefreshTokens;
}
import { z } from "zod";

//Firestore Schema
export const Zod_FS_usersSchema = z.object({
  firstname:z.string(),
  lastname:z.string(),
  email:z.string(),
  password:z.string(),
});

export type FS_UsersSchema = z.infer<typeof Zod_FS_usersSchema>;

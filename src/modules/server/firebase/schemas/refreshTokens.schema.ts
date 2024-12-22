import { z } from "zod";

//Firestore Schema
export const Zod_FS_refreshTokensSchema = z.object({
  accessToken:z.string(),
  refreshToken:z.string(),
  expiresAt:z.number(),
  userId:z.string()
});

export type FS_RefreshTokensSchema = z.infer<typeof Zod_FS_refreshTokensSchema>;
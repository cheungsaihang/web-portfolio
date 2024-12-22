import { z } from "zod";
import { Zod_FS_refreshTokensSchema } from "@/modules/server/firebase/schemas/refreshTokens.schema";

export const Zod_API_refreshTokensSchema = Zod_FS_refreshTokensSchema.pick({
  accessToken:true,
  refreshToken:true
});

export type API_RefreshTokens = z.infer<typeof Zod_API_refreshTokensSchema>;
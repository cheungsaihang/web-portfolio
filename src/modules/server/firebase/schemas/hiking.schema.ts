import { z } from "zod";

//Firestore Schema
export const Zod_FS_hikingSchema = z.object({
  name:z.string(),
  reviews:z.array(z.string()),
  pics:z.array(z.string()),
  map:z.string().optional(),
  difficult:z.number(),
  tags:z.array(z.string())
});

export type FS_HikingSchema = z.infer<typeof Zod_FS_hikingSchema>;

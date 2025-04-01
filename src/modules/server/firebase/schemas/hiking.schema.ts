import { z } from "zod";

//Firestore Schema
export const Zod_FS_hikingSchema = z.object({
  name:z.string(),
  reviews:z.array(z.string()),
  pics:z.array(z.string()),
  map:z.string().optional(),
  difficult:z.number(),
  tags:z.array(z.string()),
  order:z.number()
});

export type FS_HikingSchema = z.infer<typeof Zod_FS_hikingSchema>;

//Where condition keys
const searchable = Zod_FS_hikingSchema.pick({tags:true, name:true}).keyof();
export type FS_HikingSearchableKeys = z.infer<typeof searchable>;

//Order condition keys
const orderable = Zod_FS_hikingSchema.pick({order:true}).keyof();
export type FS_HikingOrderableKeys = z.infer<typeof orderable>;
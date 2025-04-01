import { z } from "zod";

export const Zod_FS_restaurantSchema = z.object({
  name:z.string(),
  reviews:z.array(z.object({
    review: z.string(),
    pic:z.string().optional(),
    order:z.number()
  })),
  location:z.string().optional(),
  tags:z.array(z.string()),  
  rate:z.number(),
  order:z.number()
});

export type FS_RestaurantSchema = z.infer<typeof Zod_FS_restaurantSchema>;

//Where condition keys
const searchable = Zod_FS_restaurantSchema.pick({tags:true, name:true}).keyof();
export type FS_RestaurantSearchableKeys = z.infer<typeof searchable>;

//Order condition keys
const orderable = Zod_FS_restaurantSchema.pick({order:true}).keyof();
export type FS_RestaurantOrderableKeys = z.infer<typeof orderable>;
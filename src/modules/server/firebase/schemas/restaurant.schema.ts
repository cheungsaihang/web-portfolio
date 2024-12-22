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
  rate:z.number()
});

export type FS_RestaurantSchema = z.infer<typeof Zod_FS_restaurantSchema>;
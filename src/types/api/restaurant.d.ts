import { z } from "zod";

//Firestore Schema
export const FS_restaurantSchema = z.object({
  name:z.string(),
  reviews:z.array(z.object({
    review: z.string(),
    pic:z.string().optional(),
    order:z.number()
  })),
  location:z.string().optional(),
  tag:z.string().optional(),
  rate:z.number()
});

//Api Response Schema
export const API_restaurantDetailSchema = FS_restaurantSchema.extend({
  id:z.string()
});
export const API_restaurantListSchema = API_restaurantDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});

export type FS_Restaurant = z.infer<typeof FS_restaurantSchema>;
export type API_RestaurantDetail = z.infer<typeof API_restaurantDetailSchema>;
export type API_RestaurantList = z.infer<typeof API_restaurantListSchema>;
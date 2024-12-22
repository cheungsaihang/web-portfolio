import { z } from "zod";
import { Zod_FS_restaurantSchema } from "@/modules/server/firebase/schemas/restaurant.schema";

//Api Response Schema
export const Zod_API_restaurantDetailSchema = Zod_FS_restaurantSchema.extend({
  id:z.string()
});
export const Zod_API_restaurantListSchema = Zod_API_restaurantDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});

export type API_RestaurantDetail = z.infer<typeof Zod_API_restaurantDetailSchema>;
export type API_RestaurantList = z.infer<typeof Zod_API_restaurantListSchema>;
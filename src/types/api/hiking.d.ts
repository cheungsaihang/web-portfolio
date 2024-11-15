import { z } from "zod";

//Firestore Schema
export const FS_hikingSchema = z.object({
  name:z.string(),
  reviews:z.array(z.string()),
  pics:z.array(z.string()),
  map:z.string().optional()
});

//Api Response Schema
export const API_hikingDetailSchema = FS_hikingSchema.extend({
  id:z.string()
});
export const API_hikingListSchema = API_hikingDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});

export type FS_Hiking = z.infer<typeof FS_hikingSchema>;
export type API_HikingDetail = z.infer<typeof API_hikingDetailSchema>;
export type API_HikingList = z.infer<typeof API_hikingListSchema>;
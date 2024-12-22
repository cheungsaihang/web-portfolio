import { z } from "zod";
import { Zod_FS_hikingSchema } from "@/modules/server/firebase/schemas/hiking.schema";

//Api Response Schema
export const Zod_API_hikingDetailSchema = Zod_FS_hikingSchema.extend({
  id:z.string()
});
export const Zod_API_hikingListSchema = Zod_API_hikingDetailSchema.pick({
  id:true,
  name:true
}).extend({
  pic:z.string()
});

export type API_HikingDetail = z.infer<typeof Zod_API_hikingDetailSchema>;
export type API_HikingList = z.infer<typeof Zod_API_hikingListSchema>;
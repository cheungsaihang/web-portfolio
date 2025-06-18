import { z } from "zod";

//Firestore Schema
export const Zod_FS_commentsSchema = z.object({
  collectionDoc:z.string(),
  collectionType:z.string(),
  comment:z.string(),
  createdAt:z.number(),
  userId:z.string()
});

export type FS_CommentsSchema = z.infer<typeof Zod_FS_commentsSchema>;
import { z } from "zod";
import { Zod_FS_commentsSchema } from "@/modules/server/firebase/schemas/comments.schema";

//Api Response Schema
export const Zod_API_CommentsSchema = Zod_FS_commentsSchema.extend({
  commentId:z.string(),
  userName:z.string()
});

export type API_Comments = z.infer<typeof Zod_API_CommentsSchema>;

export type API_CommentListResponse = {
  records:API_Comments[] | null;
  pagination:{
    currentPage:number;
    isMorePage:boolean
  }
};
import Comment from "@/modules/client/Comment";
import { SkeletionView } from "@/modules/client/Skeleton";
import { API_Comments } from "@/types/api/comments";
import { useCommentContext } from "./context";
import { useActionState, useEffect } from "react";
import { deleteCommentAction } from "./actions/deleteCommentAction";
import className from "./css";

export default function CommentListing({
  isReady,
  comments
}:{
  isReady:boolean;
  comments:API_Comments[]
}){
  const { userProfile, setComments } = useCommentContext();
  const [state, deleteAction] = useActionState(deleteCommentAction, null);

  useEffect(() => {
    if(state?.success){
      setComments((prevs:API_Comments[]) => { 
        const filtered = prevs.filter(item => item.commentId != state.commentId);
        return [
          ...filtered
        ];
      });
    }
  },[state]);

  return (
    <>
      {
        !isReady ? (
          <div className={className.skeletionContainer}>
            <SkeletionView width={50} className={className.skeletionTitle} />
            <SkeletionView />
          </div>
        ) : (
          <>
            {
              comments.map((comment)=> (
                <Comment
                  key={comment.commentId} 
                  commentId={comment.commentId}
                  authorName={comment.userName} 
                  authorId={comment.userId} 
                  content={comment.comment} 
                  createDate={new Date(comment.createdAt).toLocaleDateString()}
                  isOwner={comment.userId == userProfile?.id} 
                  deleteComment={deleteAction}
                />
              ))
            }
          </>
        )
      }
    </>
  )
}
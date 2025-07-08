import Comment from "@/modules/client/Comment";
import { SkeletionView } from "@/modules/client/Skeleton";
import { css } from "@pigment-css/react";
import { API_Comments } from "@/types/api/comments";
import { useCommentContext } from "./context";
import { useActionState, useEffect } from "react";
import { deleteCommentAction } from "./actions/deleteCommentAction";

const cssSkeletionContainer = css({
  padding:10
});

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
          <div className={cssSkeletionContainer}>
            <SkeletionView width={50} style={{marginBottom:5}} />
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
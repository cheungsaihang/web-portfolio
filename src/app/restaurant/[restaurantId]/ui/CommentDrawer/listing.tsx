import Comment from "@/modules/client/Comment";
import { SkeletionView } from "@/modules/client/Skeleton";
import { css } from "@pigment-css/react";
import { API_Comments } from "@/types/api/comments";

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
              comments.map((comment, index)=> (
                <Comment
                  key={index} 
                  authorName={comment.userName} 
                  authorId={comment.userId} 
                  content={comment.comment} 
                  createDate={new Date(comment.createdAt).toLocaleDateString()} 
                />
              ))
            }
          </>
        )
      }
    </>
  )
}
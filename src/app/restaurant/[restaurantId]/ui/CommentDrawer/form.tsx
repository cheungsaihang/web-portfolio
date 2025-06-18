import { SetStateAction, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import * as D from "@/modules/client/StyledComponent/Comment";
import submitAddComment from "./actions";
import CustomAvatar from "@/modules/client/CustomAvatar";
import { useRouter } from "next/navigation";
import { API_Comments } from "@/types/api/comments";
import { API_UsersSchema } from "@/types/api/users";

export default function CommentForm({
  docId, 
  type, 
  userProfile,
  setComments
}:{
  type:string;
  docId:string;
  setComments:(comments:SetStateAction<API_Comments[]>) => void;
  userProfile?:API_UsersSchema | null;
}){

  const [state, addCommentAction] = useActionState(submitAddComment,undefined);
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(state?.success){
      setComments((prevs:API_Comments[]) => { 
        return [
          state.comment,
          ...prevs
        ];
      });
    }
  },[state]);

  return (
    <D.CommentForm>
      {
        userProfile ? (
          <form action={addCommentAction}>
            <input type="hidden" name="docId" value={docId} />
            <input type="hidden" name="type" value={type} />
            <D.CommentRow>
              <CustomAvatar name={userProfile.firstname} />
              <D.CommentInputWrap><D.CommentInput type="text" name="comment" onChange={(e) => setInputText(e.target.value)} /></D.CommentInputWrap>
            </D.CommentRow>
            {
              !state?.success && <D.CommentErrorMsg center>{state?.error}</D.CommentErrorMsg>
            }
            <AddCommentButton inputText={inputText} />
          </form>
        ) : (
          <D.CommentRow center>
            <D.CommentLoginFirst onClick={() => router.push('/login')}>登入留言</D.CommentLoginFirst>
          </D.CommentRow>
        )
      }
    </D.CommentForm>
  );
}

function AddCommentButton({
  inputText
}:{
  inputText:string
}){
  const { pending } = useFormStatus();
  return (
    <D.CommentRow reverse>
        <D.CommentSubmit type="submit" disabled={pending || inputText == ""}>發送</D.CommentSubmit>
    </D.CommentRow>
  )
}
import { css, styled } from "@pigment-css/react";
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingIcon } from "../LoadingIcon";
import { MouseEventHandler, startTransition, useState } from "react";

type CommentProps = {
  commentId:string;
  authorId:string | number;
  authorName:string;
  createDate:string;
  content:string;
  isOwner:boolean;
  deleteComment?: (id:string) => void;
}

const StyledComment = styled('nav')(({ theme }) => ({
  padding:10,
  borderTopStyle:'solid',
  borderTopWidth:1,
  borderTopColor: theme.colors.breadcrumb,
  fontSize:'1.4rem',
  color:theme.colors.tagText
}));
const StyledHeader = styled('div')({
  marginBottom:5,
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
});

const StyledTitle = styled('div')({
  display:'flex',
  flex:1,
  flexDirection:'column',
  fontSize:'1.2rem'
});

const StyledAvatar = styled('div')({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#ff6666',
  width:25,
  height:25,
  borderRadius:25,
  color:'#ffffff', 
  fontSize:'1.5rem',
  marginRight:10,
});
const StyledDate = styled('div')(({theme}) => ({
  color:theme.colors.buttonSecondBlur
}));

const cssDeleteIcon = css(({theme}) => ({
  fontSize:`2rem !important`,
  color: theme.colors.icon,
}));

export default function Comment(props:CommentProps){
  const first = props.authorName.charAt(0);
  const [deleting, setDeleting] = useState(false);

  const onDeleteClick:MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setDeleting(true);
    startTransition(() => {
      if(props.deleteComment){
        props.deleteComment(props.commentId);
      }
    });
  };

  return (
    <StyledComment>
      <StyledHeader>
        <StyledAvatar>{first}</StyledAvatar>
        <StyledTitle>
          <div>{props.authorName}</div>
          <StyledDate>{props.createDate}</StyledDate>
        </StyledTitle>
        {
          deleting ? <LoadingIcon className={cssDeleteIcon} /> : (
            <>
            {
              props.isOwner && (
                <a href="#" onClick={onDeleteClick}><DeleteIcon className={cssDeleteIcon}/></a>
              )
            }
            </>
          )
        }
      </StyledHeader>
      <div>{props.content}</div>
    </StyledComment>
  );
}
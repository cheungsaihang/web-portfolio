import { styled } from "@pigment-css/react";

type CommentProps = {
  authorId:string | number;
  authorName:string;
  createDate:string;
  content:string;
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
  fontSize:'1.2rem',
  marginBottom:5,
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
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
const Comment = (props:CommentProps) => {
  const first = props.authorName.charAt(0);
  return (
    <StyledComment>
      <StyledHeader>
        <StyledAvatar>{first}</StyledAvatar>
        <div>
          <div>{props.authorName}</div>
          <StyledDate>{props.createDate}</StyledDate>
        </div>
      </StyledHeader>
      <div>{props.content}</div>
    </StyledComment>
  );
}


export default Comment;
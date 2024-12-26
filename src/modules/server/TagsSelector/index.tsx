import { styled } from "@pigment-css/react";
import { ReactNode, FC } from "react";

export const StyledWrap = styled('div')({
  width:'100%',
  whiteSpace:'nowrap',
  overflowX:'scroll',
  scrollbarWidth:'none',
  msOverflowStyle:'none',
  ["&::-webkit-scrollbar"]:{
    display: 'none'
  }
});

const StyledLink = styled('a')<{ isActive?: boolean }>(({theme}) => ({
  display:'inline-block',
  padding:'4px 10px',
  borderRadius:5,
  borderWidth:0,
  marginRight:5,
  fontSize:'1.3rem',
  fontWeight:'bolder',
  cursor:'pointer',
  backgroundColor: ({isActive}) => isActive ? theme.vars.colors.menuTagActive : theme.vars.colors.menuTag,
  color: ({isActive}) => isActive ? theme.vars.colors.background : theme.vars.colors.foreground,
  ['&:hover']:{
    backgroundColor:({isActive}) => isActive ? theme.vars.colors.menuTagActive : theme.vars.colors.menuTagHover
  },
}));

type SelectorProps = {
  children:ReactNode;
};

type TagProps = {
  children:ReactNode;
  href:string;
  isActive?:boolean;
  onClick?: () => void;
};

interface ITagsSelector extends FC<SelectorProps>{
  Tag:FC<TagProps>
}

const Tag = (props:TagProps) => {
  return (
    <StyledLink
      href={props.href}
      isActive={props.isActive}
    >
      {props.children}
    </StyledLink>
  )
};

const TagsSelector:ITagsSelector = ({children}) => (<StyledWrap>{children}</StyledWrap>);
TagsSelector.Tag = Tag;

export default TagsSelector;
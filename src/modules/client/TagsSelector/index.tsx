import { styled, css } from "@pigment-css/react";
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

export const StyledTag = styled('a')(({theme}) => ({
  display:'inline-block',
  padding:'4px 10px',
  borderRadius:5,
  backgroundColor: theme.vars.colors.menuTag,
  color: theme.vars.colors.foreground,
  marginRight:5,
  fontSize:'1.3rem',
  fontWeight:'bolder',
  cursor:'pointer',
  ['&:hover']:{
    backgroundColor:theme.vars.colors.menuTagHover
  },
}));

const cssTagActive = css(({theme}) => ({
  backgroundColor:theme.vars.colors.menuTagActive,
  color:theme.vars.colors.background,
  ['&:hover']:{
    backgroundColor:theme.vars.colors.menuTagActive
  },
}));

type SelectorProps = {
  children:ReactNode
};

type TagProps = {
  children:ReactNode,
  active?:boolean
  onClick?: () => void
};

interface ITagsSelector extends FC<SelectorProps>{
  Tag:FC<TagProps>
}

const Tag = (props:TagProps) => (
  <StyledTag className={props.active ? cssTagActive : undefined} onClick={props.onClick}  >{props.children}</StyledTag>
);

const TagsSelector:ITagsSelector = ({children}) => <StyledWrap>{children}</StyledWrap>
TagsSelector.Tag = Tag;

export default TagsSelector;
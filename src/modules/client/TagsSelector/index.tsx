import { styled, css } from "@pigment-css/react";
import { ReactNode, FC, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

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

const tagCss = css(({theme}) => ({
  display:'inline-block',
  padding:'4px 10px',
  borderRadius:5,
  borderWidth:0,
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

const tagActiveCss = css(({theme}) => ({
  backgroundColor:theme.vars.colors.menuTagActive,
  color:theme.vars.colors.background,
  ['&:hover']:{
    backgroundColor:theme.vars.colors.menuTagActive
  },
}));

type SelectorProps = {
  initTagIndex:number;
  children:ReactNode;
};

type TagProps = {
  tagId:number;
  children:ReactNode;
  onClick?: (index:number) => void;
};

type TagContextValue = {
  activeTag:number;
  setActiveTag:Dispatch<SetStateAction<number>>;
} | null;

interface ITagsSelector extends FC<SelectorProps>{
  Tag:FC<TagProps>
}

const TagsContext = createContext<TagContextValue>(null);

const useTagContext = () => {
  const context = useContext(TagsContext);
  if(context === undefined || context?.activeTag == undefined){
      throw new Error("Tag must be used within a TagsSelector");
  }
  return context;
}
const Tag = (props:TagProps) => {
  const tagContext = useTagContext();
  const onClick = (index:number) => {
    tagContext.setActiveTag(index);
    if(props?.onClick){
      props.onClick(index);
    }
  }
  return (
    <button
      className={tagContext.activeTag == props.tagId ? `${tagCss} ${tagActiveCss}` : tagCss} 
      onClick={() => onClick(props.tagId)}
    >
      {props.children}
    </button>
  )
};

const TagsSelector:ITagsSelector = ({initTagIndex, children}) => {
  const [ activeTag, setActiveTag ] = useState(initTagIndex);
  return (
    <TagsContext.Provider value={{
      activeTag:activeTag,
      setActiveTag:setActiveTag,
    }}>
        <StyledWrap>{children}</StyledWrap>
    </TagsContext.Provider>
  );
}

TagsSelector.Tag = Tag;

export default TagsSelector;
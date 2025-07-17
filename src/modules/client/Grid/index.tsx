import { FC, ReactNode } from 'react'
import { styled } from '@pigment-css/react';

type CSSNumber = number | `${number}%`;

interface GridCSS {
  width:CSSNumber;
  cols?:number;
  gap?:CSSNumber;
  responsive?:boolean;
  className?:string;
}
interface GridProps extends GridCSS{
  children:ReactNode;
}
interface GridColProps{
  children:ReactNode;
  onClick?:() => void;
  className?:string;
}
interface GridComponent extends FC<GridProps> {  
  Col: FC<GridColProps>;  
}

const StyledContainer = styled('div')<GridCSS>(({theme}) => ({
  display:'grid',
  gridTemplateColumns:({cols}) => cols == 3 ? '1fr 1fr 1fr' : '1fr 1fr',
  gridColumnGap:({gap}) => gap,
  width:({width}) => width,
  [`@media (max-width: ${theme.media.screenXS})`]:{
    gridTemplateColumns:({responsive, cols}) => cols == 3 && !responsive ? '1fr 1fr 1fr' : '1fr 1fr',
  }
}));

const Column:FC<GridColProps> = (rest) => <div {...rest} />
const Grid:GridComponent = (rest) => <StyledContainer {...rest} />
Grid.Col = Column;

export default Grid;
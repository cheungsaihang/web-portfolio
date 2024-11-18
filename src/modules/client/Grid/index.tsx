import { FC, ReactNode } from 'react'
import { styled } from '@pigment-css/react';

interface GridProps{
  children:ReactNode;
}
interface GridColProps{
  children:ReactNode;
}
interface GridComponent extends FC<GridProps> {  
  Col: FC<GridColProps>;  
}

const StyledCol = styled('div')({
  borderRadius:10,
  overflow:'hidden',
  border:'1px solid rgba(0,0,0,.1)', 
  borderBottom:'2px solid rgba(0,0,0,.2)',
  marginBottom:15
});
const StyledContainer = styled('div')(({theme}) => ({
  display:'grid',
  gridTemplateColumns:'32% 32% 32%',
  gridColumnGap:'2%',
  marginTop:10,
  width:'100%',
  [`@media (max-width: ${theme.media.screenXS})`]:{
    gridTemplateColumns:'49% 49%',
  }
}));

const Column:FC<GridColProps> = ({children}) => <StyledCol>{children}</StyledCol>
const Grid:GridComponent = ({children}) => <StyledContainer>{children}</StyledContainer>
Grid.Col = Column;

export default Grid;
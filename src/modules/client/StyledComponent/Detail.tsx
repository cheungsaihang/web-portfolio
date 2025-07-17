import { styled } from '@pigment-css/react';
import * as Common from './Common';

const Title = styled('h1')(({theme}) => ({
  fontSize:'2rem',
  color:theme.vars.colors.foreground,
}));

const Tag = styled('span')(({theme}) => ({
  display:'inline-block',
  padding:'4px 15px',
  borderRadius:15,
  backgroundColor:theme.colors.skeleton,
  color:theme.colors.foreground,
  marginRight:3,
  marginBottom:3,
  fontSize:'1.3rem'
}));

const Styled = {
  ...Common,
  Title,
  Tag
};

export default Styled
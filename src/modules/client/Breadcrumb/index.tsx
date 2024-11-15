import { css } from "@pigment-css/react";

const navStyle = css`
  margin-left:-${({theme}) => theme.sizes.spacing.mainInner};
  margin-right:-${({theme}) => theme.sizes.spacing.mainInner};
`;

//Not work in styled method on :not(:first-child)::before
const listStyle = css`
  background-color:${({theme}) => theme.vars.colors.breadcrumb};
  padding:5px 0px;
  :not(:first-child)::before{
    content: " > ";
  }
`;
const listItemStyle = css`
  display:inline-block;
  margin-left:${({theme}) => theme.sizes.spacing.mainInner};
  color:${({theme}) => theme.vars.colors.breadcrumbText};
  font-size:15px;
`;
const linkStyle = css`
  color:${({theme}) => theme.vars.colors.breadcrumbText};
`;

export default function Breadcrumb({
  items
}:{
  items:{
    name:string;
    link?:string;
  }[]
}){
  return (
    <nav className={navStyle}>
      <ul className={listStyle}>
        {
          items.map((item,id) => (
            <li className={listItemStyle} key={id}>
              { 
                item.link ? <a href={item.link} className={linkStyle}>{item.name}</a> : item.name
              }
            </li>
          ))
        }
      </ul>
    </nav>
  );
}
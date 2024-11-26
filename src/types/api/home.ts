type Preparation = {
  title:string;
  note:string;
  data:string[];
};
type Journey = {
  title:string;
  data:{
    subTitle:string;
    content:string;
  }[];
};
export type FS_Article_Home = {
  intro:string;
  preparation:Preparation;
  journey:Journey[];
  outtro:string;
};

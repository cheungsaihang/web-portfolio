export type API_ListResponse<L> = {
  tags:string[];
  records:L[] | null;
  pagination:{
    currentPage:number;
    isMorePage:boolean
  }
};

export type API_Success<T> = {
  code:number;
  result:T;
}

export type API_Error = {
  code:number;
  error:API_Error_Body;
}

export type API_Error_Body = {
  short:string;
  message:string;
}
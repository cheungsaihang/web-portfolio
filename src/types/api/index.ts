export type API_ListResponse<L> = {
  tags:string[];
  records:L[] | null;
  pagination:{
    currentPage:number;
    isMorePage:boolean
  }
};
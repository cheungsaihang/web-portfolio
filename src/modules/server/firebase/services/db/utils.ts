import { 
  where,
  orderBy,
  limit,
  startAt,
  documentId
} from 'firebase/firestore';

//Where conditon
export type FS_WhereConditions = {
  condition: "array-contains" | "equal" | "in";
  field: "id" | string;
  keyword: string | string[];
}
export type FS_OrderConditions = 'order' | [ 'order', 'asc' | 'desc' ];

export const fsWhere = ({
  condition,
  field,
  keyword
}:FS_WhereConditions) => {
  const fieldPath = field == "id" ? documentId() : field;

  if(Array.isArray(keyword)){
    if(condition != 'in'){
      throw Error("Firebase query error - only 'in' query can be used when keyword is array", { cause: "firebase" });
    }
    return where(fieldPath, 'in', keyword);
  }
  else{
    if(condition == 'in'){
      throw Error("Firebase query error - cannot use 'in' query when keyword is array", { cause: "firebase" });
    }
    if(condition == 'array-contains'){
      return where(fieldPath ,'array-contains',keyword);
    }
    else{
      return where(fieldPath ,'==',keyword);
    }
  }
}

//Order condition
export const fsOrder = (order:FS_OrderConditions) => {
  if(typeof order === 'string'){
    return orderBy(order);
  }
  return orderBy(...order);
}

//Pagination Condition
export const fsPagination = ({
  page,
  length
}:{
  page?:number,
  length?:number
}) => {
  if(!length || length < 1){
    return [undefined];
  }
  const offset = (page && page > 0) 
    ? (((page - 1) * length) + 1)
    : undefined;
  const startAtFn = offset ? startAt(offset) : undefined;
  const limitFn = length ? limit(length) : undefined;
  return [startAtFn,limitFn];
}
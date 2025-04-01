import { 
  where,
  orderBy,
  limit,
  startAt
} from 'firebase/firestore';
import { FS_HikingOrderableKeys, FS_HikingSearchableKeys } from '../../schemas/hiking.schema';
import { FS_RestaurantOrderableKeys, FS_RestaurantSearchableKeys } from '../../schemas/restaurant.schema';

type OrderableKeys = FS_HikingOrderableKeys | FS_RestaurantOrderableKeys

//Where conditon
export type FS_WhereConditions = {
  condition: "array-contains" | "equal";
  field: string;
  keyword: string;
}
export type FS_OrderConditions = OrderableKeys | [ OrderableKeys, 'asc' | 'desc' ];

export const fsWhere = ({
  condition,
  field,
  keyword
}:FS_WhereConditions) => {
  if(condition == 'array-contains'){
    return where(field ,'array-contains',keyword);
  }
  else{
    return where(field ,'==',keyword);
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
import { API_URL } from "@/constants/api";
import { Hobby } from "@/types";
import { API_Response } from "@/types/api";
import { isServer } from "@/utils/common";
import { isErrorResponse } from "@/utils/nextResponse";

const apiUrl = `${isServer() ? process.env.API_ENDPOINT : ''}${API_URL.tags}`;

export async function listTags(hobby:Hobby){
  const res = await fetch(apiUrl+`/${hobby}`, { cache: 'no-store' });
  const body = await res.json() as API_Response<string[]>;
  const tags = isErrorResponse(body) ? ['全部'] : ['全部',...body.result];
  return tags;
}
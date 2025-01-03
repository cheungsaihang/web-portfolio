"use server"
import { prepareGetDoc } from "@/modules/server/firebase";
import { CollectionType } from "@/modules/server/firebase/util";

export async function fetchTags(collectionId:CollectionType) {
  const getDocFn = prepareGetDoc('tags',collectionId);
  const doc = await getDocFn();
  if(doc){
    const data = doc.data() as { tags:string[] };
    if(data?.tags && data.tags.length){
      return data.tags;
    }
  }
  return null;
}
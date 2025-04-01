"use server"
import { db } from "@/modules/server/firebase";

type CollectionType = 'hiking' | 'restaurant';

export async function fetchTags(collectionId:CollectionType) {
  const doc = await db.getDoc('tags',collectionId)();
  if(doc){
    const data = doc.data() as { tags:string[] };
    if(data?.tags && data.tags.length){
      return data.tags;
    }
  }
  return null;
}
"use server"
import { db } from "@/modules/server/firebase";
import { FS_Article_Home } from "@/types/api/home";

export async function fetchHomeArticle(){
  // Fetch data from firestore
  const doc = await db.getDoc('article','home')();
  if(!doc){
    return null;
  }
  const id = doc.id;
  const data = doc.data() as FS_Article_Home;
  return {
    id:id,
    ...data
  }
}
import { NextResponse } from "next/server";
import FirebaseApp from "@/modules/server/firebase/app";
import { getFSDocById } from "@/modules/server/firebase/services/db";
import { isApiSuccess } from "@/utils/api";
import { FS_Article_Home } from "@/types/api/home";

const firebaseApp = FirebaseApp.getApp();

async function getHomeArticle(){
  // Fetch data from firestore
  const res = await getFSDocById(firebaseApp)('article','home');
  if(!isApiSuccess(res)){
    return null;
  }
  const doc = res.data;
  const id = doc.id;
  const data = doc.data() as FS_Article_Home;

  return {
    id:id,
    ...data
  }
}

export async function GET() {
  const res = await getHomeArticle();
  return NextResponse.json(res);
}

//Static segment - default is SSG
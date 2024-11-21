import { getFSDocs, getFSDocById } from "@/utils/firebase/services/db";
import { getImageUrl } from "@/utils/firebase/services/storage";
import { isApiSuccess } from "@/utils/api";
import { FS_Hiking } from "@/types/api/hiking";

export async function getHikingList(){
  // Fetch data from firestore
  const res = await getFSDocs('hiking');
  if(!isApiSuccess(res)){
    return null;
  }
  // Get download url of pictures
  return await Promise.all(res.data.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Hiking;
    return {
      id:id,
      name:data?.name,
      pic: !data?.pics ? undefined : await downLoadDocImage(id,data.pics[0])
    }
  }))
  //.then(docs => docs.filter((doc) => API_hikingListSchema.safeParse(doc).success)); 
}

export async function getHikingDetail(docId:string){
  // Fetch data from firestore
  const res = await getFSDocById('hiking',docId);
  if(!isApiSuccess(res)){
    return null;
  }
  const doc = res.data;
  const id = doc.id;
  const data = doc.data() as FS_Hiking;
  return {
    id:id,
    name:data?.name,
    reviews:data?.reviews,
    map:data?.map,
    difficult: data?.difficult,
    tags:data?.tags,
    pics: !data?.pics ? undefined : await Promise.all(data.pics.map(async (pic) =>  await downLoadDocImage(id,pic)))
  }
}

async function downLoadDocImage(id:string,pic:string){
  return await getImageUrl({
    docType:"hiking",
    docId:id,
    docPic:pic
  });
}
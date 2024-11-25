import { isApiSuccess } from "@/utils/api";
import { FS_Hiking } from "@/types/api/hiking";
import FirebaseApp from "@/modules/server/firebase/app";
import { getFSDocs, getFSDocById } from "@/modules/server/firebase/services/db";
import { getImageUrl } from "@/modules/server/firebase/services/storage";

const firebaseApp = FirebaseApp.getApp();
const docType = 'hiking';

export async function getHikingList(){
  const res = await getFSDocs(firebaseApp)('hiking');
  if(!isApiSuccess(res)){
    return null;
  }
  // Api Success
  return await Promise.all(res.data.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Hiking;
    const pic = !data?.pics 
                 ? undefined
                 : await getImageUrl(firebaseApp)({
                    docType:docType,
                    docId:id,
                    docPic:data.pics[0]
                  });
    return {
      id:id,
      name:data?.name,
      pic:pic
    }
  }))
  //.then(docs => docs.filter((doc) => API_hikingListSchema.safeParse(doc).success)); 
}

export async function getHikingDetail(docId:string){
  const res = await getFSDocById(firebaseApp)('hiking',docId);
  if(!isApiSuccess(res)){
    return null;
  }
  // Api Success
  const doc = res.data;
  const id = doc.id;
  const data = doc.data() as FS_Hiking;
  const pics = !data?.pics 
               ? undefined
               : await Promise.all(data.pics.map(async (pic) =>  await getImageUrl(firebaseApp)({
                docType:docType,
                docId:id,
                docPic:pic
              })));

  return {
    id:id,
    name:data?.name,
    reviews:data?.reviews,
    map:data?.map,
    difficult: data?.difficult,
    tags:data?.tags,
    pics:pics
  }
}
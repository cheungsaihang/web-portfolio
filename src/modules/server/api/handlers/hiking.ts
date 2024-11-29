import { FS_Hiking } from "@/types/api/hiking";
import { prepareGetImageUrl, CollectionType } from "..";
import { QueryResponse, DocResponse } from "../../firebase/services/db";

const collectionId:CollectionType = 'hiking';
const downloadImageFn = prepareGetImageUrl();

export async function handleHikingList(res:QueryResponse){
  return await Promise.all(res.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Hiking;
    const pic = !data?.pics 
                 ? undefined
                 : await downloadImageFn({
                    docType:collectionId,
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

export async function handleHikingDetail(doc:DocResponse){
  const id = doc.id;
  const data = doc.data() as FS_Hiking;
  const pics = !data?.pics 
               ? undefined
               : await Promise.all(data.pics.map(async (pic) =>  await downloadImageFn({
                docType:collectionId,
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
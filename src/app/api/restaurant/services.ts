import { isApiSuccess } from "@/utils/api";
import { FS_Restaurant } from "@/types/api/restaurant";
import FirebaseApp from "@/modules/server/firebase/app";
import { getFSDocs, getFSDocById } from "@/modules/server/firebase/services/db";
import { getImageUrl } from "@/modules/server/firebase/services/storage";

const firebaseApp = FirebaseApp.getApp();
const docType = 'restaurant';

export async function getRestaurantList(){
  const res = await getFSDocs(firebaseApp)('restaurant');
  if(!isApiSuccess(res)){
    return null;
  }
  //Api Success
  return await Promise.all(res.data.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Restaurant;
    const firstPicture = data?.reviews[0]?.pic;
    const pic = !firstPicture
                ? undefined
                : await getImageUrl(firebaseApp)({
                    docType:docType,
                    docId:id,
                    docPic:firstPicture
                  });
    return {
      id:id,
      name:data?.name,
      pic:pic
    }
  }))
  //.then(docs => docs.filter((doc) => API_RestaurantListSchema.safeParse(doc).success)); 
}

export async function getRestaurantDetail(docId:string){
  const res = await getFSDocById(firebaseApp)('restaurant',docId);
  if(!isApiSuccess(res)){
    return null;
  }
  //Api Success
  const doc = res.data;
  const id = doc.id;
  const data = doc.data() as FS_Restaurant;
  const reviews = await Promise.all(data.reviews.map(async (item) => ({
    review: item.review,
    pic: item?.pic ? await getImageUrl(firebaseApp)({docType:docType,docId:id,docPic:item.pic}) : undefined,
    order: item.order,
  })));
  //Reviews ordering
  reviews.sort(function(a, b) {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  return {
    id:id,
    name:data?.name,
    reviews: reviews,
    location: data?.location,
    rate: data?.rate,
    tags: data?.tags
  }
}
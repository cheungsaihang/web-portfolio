import { getFSDocs, getFSDocById } from "@/utils/firebase/services/db";
import { getImageUrl } from "@/utils/firebase/services/storage";
import { isApiSuccess } from "@/utils/api";
import { FS_Restaurant } from "@/types/api/restaurant.d";

export async function getRestaurantList(){
  // Fetch data from firestore
  const res = await getFSDocs('restaurant');
  if(!isApiSuccess(res)){
    return null;
  }
  // Get download url of pictures
  return await Promise.all(res.data.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Restaurant;
    const firstPicture = data?.reviews[0]?.pic;

    return {
      id:id,
      name:data?.name,
      pic: !firstPicture ? undefined : await downLoadDocImage(id,firstPicture)
    }
  }))
  //.then(docs => docs.filter((doc) => API_RestaurantListSchema.safeParse(doc).success)); 
}

export async function getRestaurantDetail(docId:string){
  // Fetch data from firestore
  const res = await getFSDocById('restaurant',docId);

  if(!isApiSuccess(res)){
    return null;
  }

  const doc = res.data;
  const id = doc.id;
  const data = doc.data() as FS_Restaurant;

  //Download Images
  const reviews = await Promise.all(data.reviews.map(async (item) => ({
    review: item.review,
    pic: item?.pic ? await downLoadDocImage(id,item.pic) : undefined,
    order: item.order,
  })));
  
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

async function downLoadDocImage(id:string,pic:string){
  return await getImageUrl({
    docType:"restaurant",
    docId:id,
    docPic:pic
  });
}
import { FS_Restaurant } from "@/types/api/restaurant";
import { prepareGetImageUrl, CollectionType } from "..";
import { QueryResponse, DocResponse } from "../../firebase/services/db";

const collectionId:CollectionType = 'restaurant';
const downloadImageFn = prepareGetImageUrl();

export async function handleRestaurantList(res:QueryResponse){

  return await Promise.all(res.docs.map(async (doc) => {
    const id = doc.id;
    const data = doc.data() as FS_Restaurant;
    const firstPicture = data?.reviews[0]?.pic;
    const pic = !firstPicture
                ? undefined
                : await downloadImageFn({
                    docType:collectionId,
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

export async function handleRestaurantDetail(doc:DocResponse){
  const id = doc.id;
  const data = doc.data() as FS_Restaurant;
  const reviews = await Promise.all(data.reviews.map(async (item) => ({
    review: item.review,
    pic: item?.pic ? await downloadImageFn({docType:collectionId,docId:id,docPic:item.pic}) : undefined,
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
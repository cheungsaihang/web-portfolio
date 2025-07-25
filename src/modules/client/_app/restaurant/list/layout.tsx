"use client"
import { ReactNode, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tags from '@/modules/client/TagsSelector';
import { ListingSkeletion } from "../../_components/PageSkeletion";

export default function Layout({tags, tagId, children}:{tags:string[]; tagId:number; children:ReactNode}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const onClick = (tid:number) => {
    if(searchParams.get('tags') == tags[tid]){
      return ;
    }
    startTransition(() => {
      router.push(`/restaurant${tid > 0 ? `?tags=${tags[tid]}` : ''}`);
    });
  }
  return ( 
    <>
      <Tags key={`tags-${tagId}`} initTagIndex={tagId}>
        {
          tags.map((tag,index) => (
            <Tags.Tag tagId={index} key={`tag-${index}`} onClick={onClick}>{tag}</Tags.Tag>
          ))
        }
      </Tags>
      { isPending ? <ListingSkeletion /> : children }
    </>
  );
}
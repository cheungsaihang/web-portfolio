"use client"
import { ReactNode, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tags from '@/modules/client/TagsSelector';
import { SkeletionContent } from "./loading";
export default function Wrapper({tags, tagId, children}:{tags:string[]; tagId:number; children:ReactNode}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const onClick = (tid:number) => {
    const searchTag = searchParams.get('tags');
    if(searchTag != tags[tid]){
      startTransition(() => {
        router.push(`/restaurant${tid > 0 ? `?tags=${tags[tid]}` : ''}`);
      });
    }
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
      { isPending ? <SkeletionContent /> : children }
    </>
  );
}
"use client"
import { ReactNode, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Tags from '@/modules/client/TagsSelector';
import Loading from "./_loading";
export default function Wrapper({tags, tagId, children}:{tags:string[]; tagId:number; children:ReactNode}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const searchTag = searchParams.get('tags');
  const onClick = (tid:number) => {
    if(searchTag != tags[tid]){
      startTransition(() => {
        router.push(`/hiking${tid > 0 ? `?tags=${tags[tid]}` : ''}`);
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
      { isPending ? <Loading /> : children }
    </>
  );
}


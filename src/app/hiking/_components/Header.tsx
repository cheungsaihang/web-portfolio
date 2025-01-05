"use client"
import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import Tags from '@/modules/client/TagsSelector';
import Breadcrumb from "@/modules/client/Breadcrumb";

export default function Header({tags}:{tags:string[]}){
  const segment = useSelectedLayoutSegment();
  return (
    <>
    {
      !segment ? (
        <TagsHeader tags={tags}/>
      ) : (
        <BreadcrumbHeader />
      )
    }
    </>
  );
}

function TagsHeader({tags}:{tags:string[]}){
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTag = searchParams.get('tags');
  const tagId = searchTag && tags.indexOf(searchTag) || 0;

  const onClick = (tid:number) => {
    if(searchTag != tags[tid]){
      router.push(`/hiking${tid > 0 ? `?tags=${tags[tid]}` : ''}`);
    }
  }
  return (
    <Tags key={`tags-${tagId}`} initTagIndex={tagId}>
      {
        tags.map((tag,index) => (
          <Tags.Tag tagId={index} key={`tag-${index}`} onClick={onClick}>{tag}</Tags.Tag>
        ))
      }
    </Tags>
  )
}

function BreadcrumbHeader(){
  const breadcrumb = [{
    link:'/',
    name:'主頁'
  },
  {
    link:'/hiking',
    name:'行山'
  }];
  return <Breadcrumb items={breadcrumb} />
}
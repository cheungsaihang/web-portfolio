import { ListingSkeletion, TagsSkeleton } from "@/modules/client/_app/_components/PageSkeletion";

export default function Loading() {
  return (
    <>
      <TagsSkeleton />
      <ListingSkeletion />
    </>
  )
}
"use server"
import { listHikings } from "@/libs/frontend/api/hobby/hiking";
import Container from "./container";

export default async function Main({
  query,
}:{
  query:string
}) {
  const hikings = await listHikings(query);
  return (
    <Container initalList={hikings} query={query} />
  )
}
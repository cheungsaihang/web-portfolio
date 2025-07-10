"use server"
import { listRestaurants } from "@/libs/frontend/api/hobby/restaurant";
import Container from "./container";

export default async function Main({
  query,
}:{
  query:string
}) {
  const hikings = await listRestaurants(query);
  return (
    <Container initalList={hikings} query={query} />
  )
}
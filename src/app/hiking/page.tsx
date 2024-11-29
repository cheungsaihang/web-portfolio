import HikingListing from "./content";

async function getHikingList(){
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ cache: 'no-store' });
  return await res.json();
}

async function getTags(){
  const res = await fetch(process.env.API_ENDPOINT  + '/api/tags/hiking',{ cache: 'no-store' });
  const data = await res.json() as string[];
  const tags = ['全部',...data];
  return tags;
}

export default async function Page() {
  const resultSet = await getHikingList();
  const tags = await getTags();

  return (
    <>
      { resultSet ? <HikingListing type={'hiking'} tags={tags} resultSet={resultSet}/> : <div>No Data</div>}
    </>
  );
}


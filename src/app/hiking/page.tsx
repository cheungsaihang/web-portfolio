import HikingListing from "./content";

async function getHikingList(){
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/hiking',{ cache: 'no-store' });
  return await res.json();
}

export default async function Page() {
  const list = await getHikingList();
  return (
    <>
      { list ? <HikingListing type={'hiking'} list={list}/> : <div>No Data</div>}
    </>
  );
}


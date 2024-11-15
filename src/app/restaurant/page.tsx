import RestaurantListing from "./content";

async function getRestaurantList(){
  // Fetch data from firestore
  //const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant',{ next: { revalidate: 300 } });
  const res = await fetch(process.env.API_ENDPOINT  + '/api/restaurant',{ cache: 'no-store' });
  return await res.json();
}

export default async function Page() {
  const list = await getRestaurantList();

  return (
    <div>
        {list ? <RestaurantListing type={'restaurant'} list={list}/> : <div>No Data</div>}
    </div>
  );
}
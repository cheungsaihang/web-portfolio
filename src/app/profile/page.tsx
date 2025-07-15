import Main from "@/modules/client/_app/profile/main";
import { getProfile } from "@/libs/frontend/api/auth";

export default async function Page() {
  const authUser = await getProfile();
  return ( 
    <Main user={authUser} />
  );
}
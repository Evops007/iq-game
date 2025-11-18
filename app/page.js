import StartSide from "@/app/component/StartSide";
import { getUsers } from "./actions/db";

export default async function Home() {
  

  const users = await getUsers();
  
  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex flex-col pt-4 pb-4 px-4">
        <StartSide /> 
      </main>
      
    </div>
  );
}

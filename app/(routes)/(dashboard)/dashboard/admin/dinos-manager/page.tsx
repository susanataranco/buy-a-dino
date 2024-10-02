import { auth } from "@clerk/nextjs/server"
import ButtonAddCar from "./components/ButtonAddCar/ButtonAddCar"
import ListDinos from "./components/ListDinos/ListDinos"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function page() {
  const {userId} = auth();

  if (!userId) {
    return redirect("/");
  }

  const dino = await db.dino.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc",
    }
  })

  return (
    <div>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Manage your dinos</h2>
          <ButtonAddCar />
        </div>
        <ListDinos dinos={dino}/>
    </div>
  )
}

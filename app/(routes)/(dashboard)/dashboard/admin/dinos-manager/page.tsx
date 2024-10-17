import { auth } from "@clerk/nextjs/server"
import ButtonAddDino from "./components/ButtonAddDino/ButtonAddDino"
import ListDinos from "./components/ListDinos/ListDinos"
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdministrator } from "@/lib/isAdministrator";

export default async function page() {
  const {userId} = auth();

  if (!userId || !isAdministrator(userId)) {
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
          <h2 className="text-2xl font-bold">Manage dinos</h2>
          <ButtonAddDino />
        </div>
        <ListDinos dinos={dino}/>
    </div>
  )
}

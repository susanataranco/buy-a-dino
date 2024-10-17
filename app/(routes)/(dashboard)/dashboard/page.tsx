import {auth} from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ListDinos from "./components/ListDinos/ListDinos";

export default async function DashboardPage() {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const dinos = await db.dino.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">List of Dinos</h2>
      </div>

      <ListDinos dinos={dinos} />
    </div>
  )
}

import { auth } from "@clerk/nextjs/server";
import { ListLovedDinos } from "./components/ListLovedDinos";
import { redirect } from "next/navigation";

export default function pageLovedDinos() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl">Dinos you love</h1>

      <ListLovedDinos />
    </div>
  );
}
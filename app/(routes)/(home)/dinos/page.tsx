import Navbar from "@/components/Shared/Navbar/Navbar";
import { db } from "@/lib/db";
import { HeaderDinos } from "./components/HeaderDinos/HeaderDinos";
import { FiltersAndListDinos } from "./components/FiltersAndListDinos/FiltersAndListDinos";

export default async function pageDinos() {
  const dinos = await db.dino.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <HeaderDinos />
        <div>
          <FiltersAndListDinos dinos={dinos} />
        </div>
      </div>
    </div>
  );
}
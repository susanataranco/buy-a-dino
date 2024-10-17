"use client";
import { useLovedDinos } from "@/hooks/use-loved-dinos";
import { Dino } from "@prisma/client";
import { CalendarRange, Heart, LandPlot, Origami } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import ModalAddReservation from "@/components/Shared/ModalAddReservation/ModalAddReservation";

export function ListLovedDinos() {
  const { lovedItems, removeLovedItem } = useLovedDinos();

  return (
    <>
      {lovedItems.length === 0 ? (
        <h2>You don&apos;t love dinos... yet</h2>
      ) : (
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {lovedItems.map((dino: Dino) => {
            const {
                name,
                id,
                species,
                photo,
                period,
                price,
                foundIn,
            } = dino;

            return (
              <div
                className="p-1 rounded-lg shadow-md hover:shadow-lg"
                key={id}
              >
                <Image
                  src={photo}
                  alt=""
                  width={400}
                  height={600}
                  className="rounded-lg"
                />
                <div className="p-3">
                  <div className="flex flex-col mb-3 gapx-4">
                    <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                    <p>{formatCurrency(price)}</p>
                  </div>
                  <p className="flex items-center">
                    <Origami className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                    {species}
                  </p>
                  <p className="flex items-center">
                      <CalendarRange className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                      {period}
                  </p>
                  <p className="flex items-center">
                      <LandPlot className="h-4 w-4 mr-2 flex-shrink-0" strokeWidth={1} />
                      {foundIn}
                  </p>

                  <div className="flex items-center justify-center gap-x-3">
                    <ModalAddReservation dino={dino} />
                    <Heart
                      className="mt-2 cursor-pointer fill-black"
                      onClick={() => removeLovedItem(dino.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
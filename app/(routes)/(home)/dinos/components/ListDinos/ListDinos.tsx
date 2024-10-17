"use client";

import { Button } from "@/components/ui/button";
import { CalendarRange, Heart, LandPlot, Origami } from "lucide-react";
import Image from "next/image";
import { useLovedDinos } from "@/hooks/use-loved-dinos";
import { useAuth } from "@clerk/nextjs";
import { Dino } from "@prisma/client";
import Link from "next/link";
import ModalAddReservation from "@/components/Shared/ModalAddReservation/ModalAddReservation";
import { ListDinosProps } from "./ListDinos.types";
import { SkeletonDinos } from "@/components/Shared/SkeletonDinos/SkeletonDinos";
import { formatCurrency } from "@/utils/formatCurrency";

export function ListDinos(props: ListDinosProps) {
  const { dinos } = props;
  const { userId } = useAuth();
  const { addLovedItem, lovedItems, removeLovedItem } = useLovedDinos();

  if (!dinos) {
    return <SkeletonDinos />;
  }

  return (
    <>
      {dinos.length === 0 && (
        <p>There are no dinos matching these filters</p>
      )}
      <div className="grid  md:grid-cols-2 gap-6 lg:grid-cols-4">
        {dinos.map((dino: Dino) => {
          const {
            photo,
            name,
            id,
            price,
            species,
            period,
            foundIn
          } = dino;
          const likedDino = lovedItems.some((item) => item.id === dino.id);

          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
              <Image
                src={photo}
                alt="Dino"
                width={400}
                height={600}
                className="rounded-lg"
              />
              <div className="p-3">
                <div className="flex flex-col mb-3 gap-x-4">
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

                {userId ? (
                  <div className="flex items-center justify-center gap-x-3">
                    <ModalAddReservation dino={dino} />
                    <Heart
                      className={`mt-2 cursor-pointer ${
                        likedDino && "fill-black"
                      }`}
                      onClick={
                        likedDino
                          ? () => removeLovedItem(dino.id)
                          : () => addLovedItem(dino)
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full">
                        Log in to reserve
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}